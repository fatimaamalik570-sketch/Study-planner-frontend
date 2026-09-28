import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Globe, Mail, MapPin, MessageCircle, Smartphone } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* ================= BRAND ================= */}

        <div className="footer-brand">

          <div className="footer-logo">

            <img
              src={logo}
              alt="Learnly Logo"
            />

            <span>Learnly</span>

          </div>

          <p>
            A simple and smart platform to organize your studies,
            manage your tasks and achieve your academic goals.
          </p>

        </div>


        {/* ================= QUICK LINKS ================= */}

        <div className="footer-column">

          <h3>Quick Links</h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>

        </div>


        {/* ================= FEATURES ================= */}

        <div className="footer-column">

          <h3>Features</h3>

          <Link to="/student/schedule">
            Study Schedule
          </Link>

          <Link to="/student/assignments">
            Assignments
          </Link>

          <Link to="/student/exams">
            Exams
          </Link>

          <Link to="/student/progress">
            Progress
          </Link>

        </div>


        {/* ================= CONTACT ================= */}

        <div className="footer-column">

          <h3>Contact</h3>

          <p>
            <Mail size={15} /> support@studyplanner.com
          </p>

          <p>
            <MapPin size={15} /> Learnly
          </p>

          <div className="footer-socials">

            <span><Globe size={18} /></span>
            <span><Smartphone size={18} /></span>
            <span><MessageCircle size={18} /></span>

          </div>

        </div>

      </div>


      {/* ================= COPYRIGHT ================= */}

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Learnly. All rights reserved.
        </p>

        <div>

          <Link to="/">
            Privacy Policy
          </Link>

          <Link to="/">
            Terms & Conditions
          </Link>

        </div>

      </div>

    </footer>
  );
}

export default Footer;