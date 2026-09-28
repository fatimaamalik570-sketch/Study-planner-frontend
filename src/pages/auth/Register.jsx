import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
import { defaultStudents, teacherStore } from "../../services/teacherStore";
import { GraduationCap, UsersRound } from "lucide-react";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password, role, name);

    if (role === "student") {
      const students = teacherStore.read("teacherStudents", defaultStudents);
      const alreadyRegistered = students.some((student) => student.email === email);
      if (!alreadyRegistered) {
        teacherStore.write("teacherStudents", [
          ...students,
          { name, email, progress: "0%" },
        ]);
      }
    }

    navigate(role === "teacher" ? "/teacher" : "/student");
  };

  return (
    <div className="auth-page">

      <div className="auth-left">

        <img
          src={logo}
          alt="Learnly"
          className="auth-logo"
        />

        <h1>Start Your Journey</h1>

        <p>
          Plan your studies smarter and stay on top
          of your academic goals.
        </p>

      </div>

      <div className="auth-card">

        <div className="auth-heading">

          <h2>Create Account</h2>

          <p>
            Join Learnly today.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>

          <div className="input-wrapper">
            <User size={18} />

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <label>Email Address</label>

          <div className="input-wrapper">
            <Mail size={18} />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label>Password</label>

          <div className="input-wrapper">
            <Lock size={18} />

            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <label>Select Role</label>

          <div className="role-selector">

            <button
              type="button"
              className={role === "student" ? "selected" : ""}
              onClick={() => setRole("student")}
            >
              <GraduationCap size={17} /> Student
            </button>

            <button
              type="button"
              className={role === "teacher" ? "selected" : ""}
              onClick={() => setRole("teacher")}
            >
              <UsersRound size={17} /> Teacher
            </button>

          </div>

          <button className="login-btn">
            Create Account
          </button>

        </form>

        <p className="auth-footer">
          Already have an account?
          <Link to="/login"> Sign In</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;