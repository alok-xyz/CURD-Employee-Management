import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch all employees
  const fetchEmployees = () => {
    fetch("http://localhost:5000/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch(() => toast.error("Error fetching employees!"));
  };

  // Add a new employee
  const handleAddEmployee = (employee) => {
    const formData = new FormData();
    Object.keys(employee).forEach((key) => {
      formData.append(key, employee[key]);
    });

    fetch("http://localhost:5000/employees", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        fetchEmployees();
        toast.success("Employee added successfully!");
      })
      .catch(() => toast.error("Error adding employee!"));
  };

  // Delete an employee
  const handleDeleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      fetch(`http://localhost:5000/employees/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          fetchEmployees();
          toast.success("Employee deleted successfully!");
        })
        .catch(() => toast.error("Error deleting employee!"));
    }
  };

  // Edit an employee
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
  };

  // Update an employee
  const handleUpdateEmployee = (employee) => {
    const formData = new FormData();
    Object.keys(employee).forEach((key) => {
      formData.append(key, employee[key]);
    });

    fetch(`http://localhost:5000/employees/${employee.id}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        fetchEmployees();
        setEditingEmployee(null);
        toast.success("Employee updated successfully!");
      })
      .catch(() => toast.error("Error updating employee!"));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Employee Management</h1>

      {/* Employee Form */}
      <EmployeeForm
        onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
        editingEmployee={editingEmployee}
      />

      {/* Employee List */}
      <EmployeeList
        employees={employees}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
      />

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default App;
