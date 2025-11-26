import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserForm({ mode, initialData, onSubmit }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    role: "",
    isActive: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="login-box">
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            name="username"
            className="form-control"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="fullname"
            id="fullname"
            name="fullname"
            className="form-control"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="role"
            id="role"
            name="role"
            className="form-control"
            value={form.role}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-submit">
          Login
        </button>
      </form>
      <div className="login-hint">
        <p>Isi Data Diri Anda, Lengkap!</p>
      </div>
    </div>
  );
}

export default UserForm;
