import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../components/layout/MainLayout";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

import "../styles/auth.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", formData);

      login(data.user, data.token);

      toast.success(data.message);

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="auth-container">

        <div className="auth-card">

          <h1>Create Account</h1>

          <p>Join SocialSphere today 🚀</p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>

          </form>

          <p className="auth-footer">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

        </div>

      </div>
    </MainLayout>
  );
};

export default RegisterPage;