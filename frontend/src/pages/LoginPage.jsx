import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../components/layout/MainLayout";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

import "../styles/auth.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
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

      const { data } = await api.post("/auth/login", formData);

      login(data.user, data.token);

      toast.success(data.message);

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="auth-container">
        <div className="auth-card">

          <h1>Welcome Back</h1>

          <p>Login to SocialSphere 🚀</p>

          <form onSubmit={handleSubmit}>

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
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="auth-footer">
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>

        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;