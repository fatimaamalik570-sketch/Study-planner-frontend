import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";
import { Check, GraduationCap, UsersRound } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Backend API yahan connect hogi
      console.log("Login Data:", formData);

      await login(formData.email, formData.password, formData.role);

      if (formData.role === "student") {
        navigate("/student");
      } else {
        navigate("/teacher");
      }
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Left Side */}
      <div className="login-left">
        <div className="brand">
          <img src={logo} alt="Learnly Logo" />
          <span>Learnly</span>
        </div>

        <div className="login-content">
          <h1>
            Plan Your Study.
            <br />
            <span>Achieve Your Goals.</span>
          </h1>

          <p>
            Organize your studies, assignments, exams and daily tasks
            all in one place.
          </p>

          <div className="login-features">
            <div>
              <span><Check size={15} /></span>
              <p>Manage your study schedule</p>
            </div>

            <div>
              <span><Check size={15} /></span>
              <p>Track assignments & exams</p>
            </div>

            <div>
              <span><Check size={15} /></span>
              <p>Monitor your progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="login-right">
        <div className="login-card">

          <div className="mobile-logo">
            <img src={logo} alt="Learnly Logo" />
          </div>

          <h2>Welcome Back!</h2>

          <p className="login-subtitle">
            Login to continue to your Learnly account
          </p>

          <form onSubmit={handleSubmit}>

            {/* Role */}
            <div className="form-group">
              <label>I am a</label>

              <div className="role-buttons">

                <button
                  type="button"
                  className={
                    formData.role === "student"
                      ? "role-btn active"
                      : "role-btn"
                  }
                  onClick={() =>
                    setFormData({
                      ...formData,
                      role: "student",
                    })
                  }
                >
                  <GraduationCap size={17} /> Student
                </button>

                <button
                  type="button"
                  className={
                    formData.role === "teacher"
                      ? "role-btn active"
                      : "role-btn"
                  }
                  onClick={() =>
                    setFormData({
                      ...formData,
                      role: "teacher",
                    })
                  }
                >
                  <UsersRound size={17} /> Teacher
                </button>

              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <div className="password-label">
                <label htmlFor="password">Password</label>

                <Link to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Remember */}
            <div className="remember-me">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="register-text">
            Don't have an account?{" "}
            <Link to="/register">Create Account</Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;