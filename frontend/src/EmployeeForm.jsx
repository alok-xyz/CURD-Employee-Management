import React, { useState, useEffect } from "react";

const EmployeeForm = ({ onSubmit, editingEmployee }) => {
  const [employee, setEmployee] = useState({
    name: "",
    gender: "",
    age: "",
    mob_no: "",
    salary: "",
    photo: null,
  });

  useEffect(() => {
    if (editingEmployee) {
      setEmployee(editingEmployee);
    } else {
      resetForm();
    }
  }, [editingEmployee]);

  const resetForm = () => {
    setEmployee({
      name: "",
      gender: "",
      age: "",
      mob_no: "",
      salary: "",
      photo: null,
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setEmployee({ ...employee, [name]: files[0] });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employee.photo) {
      alert("Please upload a photo.");
      return;
    }
    onSubmit(employee);
    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 shadow-md rounded-lg px-8 pt-6 pb-8 mb-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {editingEmployee ? "Edit Employee" : "Add New Employee"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={employee.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Gender
          </label>
          <select
            name="gender"
            value={employee.gender}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Gay">Gay</option>
          </select>
        </div>

        {/* Age */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Age
          </label>
          <input
            type="number"
            name="age"
            placeholder="Enter Age"
            value={employee.age}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            required
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mobile Number
          </label>
          <input
            type="text"
            name="mob_no"
            placeholder="Enter Mobile Number"
            value={employee.mob_no}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            required
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Monthly Salary
          </label>
          <input
            type="number"
            name="salary"
            placeholder="Enter Salary"
            value={employee.salary}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            required
          />
        </div>

        {/* Photo */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Photo
          </label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            accept="image/*"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
      >
        {editingEmployee ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
};

export default EmployeeForm;
