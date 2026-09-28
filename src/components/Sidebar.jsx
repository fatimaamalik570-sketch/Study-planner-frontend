import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  FileText,
  CalendarDays,
  Timer,
  TrendingUp,
  Users,
  UserCircle,
  Settings,
  LogOut,
  GraduationCap,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

function Sidebar({ role, isOpen, onClose }) {
  const { logout } = useAuth();

  const studentLinks = [
    {
      name: "Dashboard",
      path: "/student",
      icon: LayoutDashboard,
    },
    {
      name: "Subjects",
      path: "/student/subjects",
      icon: BookOpen,
    },
    {
      name: "Assignments",
      path: "/student/assignments",
      icon: ClipboardList,
    },
    {
      name: "Exams",
      path: "/student/exams",
      icon: FileText,
    },
    {
      name: "Schedule",
      path: "/student/schedule",
      icon: CalendarDays,
    },
    {
      name: "Study Sessions",
      path: "/student/study-sessions",
      icon: Timer,
    },
    {
      name: "Progress",
      path: "/student/progress",
      icon: TrendingUp,
    },
  ];

  const teacherLinks = [
    {
      name: "Dashboard",
      path: "/teacher",
      icon: LayoutDashboard,
    },
    {
      name: "Subjects",
      path: "/teacher/subjects",
      icon: BookOpen,
    },
    {
      name: "Assignments",
      path: "/teacher/assignments",
      icon: ClipboardList,
    },
    {
      name: "Exams",
      path: "/teacher/exams",
      icon: FileText,
    },
    {
      name: "Schedule",
      path: "/teacher/schedule",
      icon: CalendarDays,
    },
    {
      name: "Students",
      path: "/teacher/students",
      icon: Users,
    },
  ];

  const links = role === "teacher" ? teacherLinks : studentLinks;

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>

      {onClose && <button className="sidebar-close" onClick={onClose} aria-label="Close menu">×</button>}

      <div className="sidebar-logo">
        <img src={logo} alt="Learnly" />
      </div>

      <div className="role-badge">
        <GraduationCap size={18} />
        <span>
          {role === "teacher" ? "Teacher Portal" : "Student Portal"}
        </span>
      </div>

      <nav className="sidebar-nav">

        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === `/${role}`}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={onClose}
            >
              <Icon size={19} />
              <span>{link.name}</span>
            </NavLink>
          );
        })}

        <div className="sidebar-divider" />

        <NavLink
          to={`/${role}/profile`}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <UserCircle size={19} />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to={`/${role}/settings`}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Settings size={19} />
          <span>Settings</span>
        </NavLink>

      </nav>

      <button className="logout-btn" onClick={logout}>
        <LogOut size={19} />
        <span>Logout</span>
      </button>

    </aside>
  );
}

export default Sidebar;