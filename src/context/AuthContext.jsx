import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("studyPlannerUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password, role, name) => {
    // Temporary frontend login
    // Backend connect karte waqt yahan API call hogi.

    const loggedInUser = {
      id: "demo-user",
      name: name || email.split("@")[0] || (role === "teacher" ? "Teacher User" : "Student"),
      email,
      role,
    };

    localStorage.setItem(
      "studyPlannerUser",
      JSON.stringify(loggedInUser)
    );

    if (role === "student") {
      localStorage.setItem("activeStudentUser", JSON.stringify(loggedInUser));

      const students = JSON.parse(localStorage.getItem("teacherStudents") || "[]");
      const alreadyListed = students.some((student) => student.email === loggedInUser.email);
      if (!alreadyListed) {
        localStorage.setItem("teacherStudents", JSON.stringify([
          ...students,
          { id: loggedInUser.id, name: loggedInUser.name, email: loggedInUser.email },
        ]));
      }

      const loggedInStudents = JSON.parse(localStorage.getItem("studentLoginHistory") || "[]");
      const alreadyLoggedIn = loggedInStudents.some((student) => student.email === loggedInUser.email);
      if (!alreadyLoggedIn) {
        localStorage.setItem("studentLoginHistory", JSON.stringify([
          ...loggedInStudents,
          { id: loggedInUser.id, name: loggedInUser.name, email: loggedInUser.email },
        ]));
      }
    }

    localStorage.setItem("token", "demo-token");

    setUser(loggedInUser);

    return loggedInUser;
  };

  const logout = () => {
    localStorage.removeItem("studyPlannerUser");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}