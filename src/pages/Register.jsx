import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    role: "user",
  });

  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.fullName ||
      !formData.role
    ) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);

    try {
      await register({
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Email atau Password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="col-md-4 text-center mb-4">
        <main className="form-signin w-100 m-auto">
          <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            {error && (
              <div className="alert alert-danger alert-dismissible fade show">
                <strong>{error}</strong>
                <button className="btn-close" data-bs-dismiss="alert"></button>
              </div>
            )}

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingName"
                placeholder="Input Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <label htmlFor="floatingName">User name</label>
            </div>

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingFullName"
                placeholder="Input Your Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <label htmlFor="floatingFullName">Full Name</label>
            </div>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button
              className="py-2 btn btn-primary w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <div className="container-sm mt-5">
            <Link to="/" className="back-link">
              ← Back to Home
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Register;
