from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import mysql.connector
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# MySQL connection details
db_config = {
    'host': 'localhost',
    'user': 'root',  # Change as per your MySQL credentials
    'password': '',
    'database': 'python_curd_db'
}

# Folder to store uploaded photos
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure folder exists

# Check if a file is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Establish database connection
def get_db_connection():
    return mysql.connector.connect(**db_config)

# Serve uploaded files
@app.route('/uploads/<filename>')
def serve_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Get all employees
@app.route('/employees', methods=['GET'])
def get_employees():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM employees")
    employees = cursor.fetchall()
    conn.close()
    # Include photo URLs for frontend display
    for emp in employees:
        if emp['photo']:
            emp['photo'] = f"http://localhost:5000/uploads/{emp['photo']}"
    return jsonify(employees)

# Add a new employee
@app.route('/employees', methods=['POST'])
def add_employee():
    try:
        # Get form data
        name = request.form['name']
        gender = request.form['gender']
        age = request.form['age']
        mob_no = request.form['mob_no']
        salary = request.form['salary']
        photo = request.files.get('photo')

        # Handle photo upload
        photo_filename = None
        if photo and allowed_file(photo.filename):
            photo_filename = secure_filename(photo.filename)
            photo.save(os.path.join(app.config['UPLOAD_FOLDER'], photo_filename))

        # Insert data into database
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO employees (name, gender, age, mob_no, salary, photo) VALUES (%s, %s, %s, %s, %s, %s)",
            (name, gender, age, mob_no, salary, photo_filename)
        )
        conn.commit()
        conn.close()
        return jsonify({'message': 'Employee added successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Update employee details
@app.route('/employees/<int:id>', methods=['PUT'])
def update_employee(id):
    try:
        # Get form data
        name = request.form['name']
        gender = request.form['gender']
        age = request.form['age']
        mob_no = request.form['mob_no']
        salary = request.form['salary']
        photo = request.files.get('photo')

        # Handle photo upload
        conn = get_db_connection()
        cursor = conn.cursor()
        photo_filename = None

        if photo and allowed_file(photo.filename):
            # Get the old photo name
            cursor.execute("SELECT photo FROM employees WHERE id = %s", (id,))
            old_photo = cursor.fetchone()[0]
            if old_photo:
                os.remove(os.path.join(app.config['UPLOAD_FOLDER'], old_photo))  # Delete old photo

            # Save new photo
            photo_filename = secure_filename(photo.filename)
            photo.save(os.path.join(app.config['UPLOAD_FOLDER'], photo_filename))

        # Update database
        cursor.execute("""
            UPDATE employees
            SET name = %s, gender = %s, age = %s, mob_no = %s, salary = %s, photo = %s
            WHERE id = %s
        """, (name, gender, age, mob_no, salary, photo_filename, id))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Employee updated successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Delete employee
@app.route('/employees/<int:id>', methods=['DELETE'])
def delete_employee(id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Get photo filename
        cursor.execute("SELECT photo FROM employees WHERE id = %s", (id,))
        photo = cursor.fetchone()[0]

        # Delete employee record
        cursor.execute("DELETE FROM employees WHERE id = %s", (id,))
        conn.commit()

        # Delete photo file if it exists
        if photo:
            photo_path = os.path.join(app.config['UPLOAD_FOLDER'], photo)
            if os.path.exists(photo_path):
                os.remove(photo_path)

        conn.close()
        return jsonify({'message': 'Employee deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
