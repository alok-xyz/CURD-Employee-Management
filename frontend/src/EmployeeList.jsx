import React from "react";

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-gray-300 px-4 py-2">Photo</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Gender</th>
            <th className="border border-gray-300 px-4 py-2">Age</th>
            <th className="border border-gray-300 px-4 py-2">Mobile</th>
            <th className="border border-gray-300 px-4 py-2">Salary (₹)</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-100">
                {/* Photo */}
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {employee.photo ? (
                    <img
                       src={employee.photo} // Use the full photo URL directly
                        alt="Employee"
                      className="h-20 w-16 rounded object-cover border border-gray-300"
                    />
                  ) : (
                    <span className="text-gray-500">No Photo</span>
                  )}
                </td>

                {/* Name */}
                <td className="border border-gray-300 px-4 py-2">{employee.name}</td>

                {/* Gender */}
                <td className="border border-gray-300 px-4 py-2">{employee.gender}</td>

                {/* Age */}
                <td className="border border-gray-300 px-4 py-2 text-center">{employee.age}</td>

                {/* Mobile */}
                <td className="border border-gray-300 px-4 py-2">{employee.mob_no}</td>

                {/* Salary */}
                <td className="border border-gray-300 px-4 py-2 text-right">
                  ₹{employee.salary.toLocaleString()}
                </td>

                {/* Actions */}
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => onEdit(employee)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-3 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(employee.id)}
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="border border-gray-300 px-4 py-4 text-center text-gray-500"
              >
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
