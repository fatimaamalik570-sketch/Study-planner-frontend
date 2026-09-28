import {
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import { defaultAssignments, defaultClasses, defaultExams, teacherStore } from "../services/teacherStore";

function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const role = user?.role === "teacher" ? "teacher" : "student";
  const assignments = teacherStore.read("teacherAssignments", defaultAssignments);
  const exams = teacherStore.read("teacherExams", defaultExams);
  const classes = teacherStore.read("teacherSchedule", defaultClasses);
  const notifications = [
    ...assignments.slice(-3).map((assignment) => ({
      title: `${assignment.title} assignment created`,
      detail: `${assignment.subject} · Due ${assignment.due}`,
    })),
    ...exams.slice(-3).map((exam) => ({
      title: `${exam.title} exam created`,
      detail: `${exam.subject} · ${exam.date} at ${exam.time}`,
    })),
    ...classes.slice(-3).map((item) => ({
      title: `${item.subject || item.title} class scheduled`,
      detail: item.date ? `${item.date} · ${item.startTime} - ${item.endTime}` : item.time,
    })),
  ].slice(-5);

  const toggleNotifications = () => {
    setIsNotificationsOpen((isOpen) => !isOpen);
  };

  return (
    <header className="navbar">

      {onMenuClick && (
        <button
          type="button"
          className="mobile-menu"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>
      )}

      <Link to="/" className="navbar-brand" aria-label="Learnly home">
        <img src={logo} alt="Learnly" />
        <span>Learnly</span>
      </Link>

      <div className="navbar-right">

        <div className="notification-wrapper">
          <button
            type="button"
            className="notification-btn"
            onClick={toggleNotifications}
            aria-label="View notifications"
            aria-expanded={isNotificationsOpen}
          >
          <Bell size={20} />
            {notifications.length > 0 && <span className="notification-dot">{notifications.length}</span>}
          </button>

          {isNotificationsOpen && (
            <div
              className="notification-dropdown"
              onClick={() => setIsNotificationsOpen(false)}
            >
              <div className="notification-heading">
                <strong>Notifications</strong>
                <span>{notifications.length} new</span>
              </div>
              {notifications.length ? notifications.map((notification, index) => (
                <div className="notification-item" key={`${notification.title}-${index}`}>
                  <strong>{notification.title}</strong>
                  <small>{notification.detail}</small>
                </div>
              )) : (
                <div className="notification-item"><small>No new notifications.</small></div>
              )}
            </div>
          )}
        </div>

        <div className="user-menu-wrapper">

          <div className="user-menu">

          <div className="user-avatar" aria-label="User profile initial">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="user-info">
            <strong>{user?.name || "User"}</strong>
            <small>
              {user?.role === "teacher" ? "Teacher" : "Student"}
            </small>
          </div>

            <button
              className="user-menu-trigger"
              onClick={() => setIsUserMenuOpen((isOpen) => !isOpen)}
              aria-label="Open account menu"
              aria-expanded={isUserMenuOpen}
            >
              <ChevronDown size={17} />
            </button>
          </div>

          {isUserMenuOpen && (
            <div className="user-dropdown">
              <Link to={`/${role}/profile`} onClick={() => setIsUserMenuOpen(false)}>Profile</Link>
              <button onClick={logout}>Logout</button>
            </div>
          )}

        </div>

      </div>
    </header>
  );
}

export default Navbar;