import React, { useState } from 'react';
import './Signup.css'; 

export const Signup = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Add logic to send data to the backend
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Phone Field */}
        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Address Field */}
        <div className="form-group">
          <label htmlFor="address" className="form-label">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="form-textarea"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="form-button">
          Signup
        </button>
      </form>
    </div>
  );
};
