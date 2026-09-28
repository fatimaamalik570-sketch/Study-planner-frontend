import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ================= HOME =================
import Home from "./pages/Home";

// ================= AUTH PAGES =================
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// ================= STUDENT LAYOUT =================
import StudentLayout from "./layouts/StudentLayout";

// ================= STUDENT PAGES =================
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentSubjects from "./pages/student/Subjects";
import StudentAssignments from "./pages/student/Assignments";
import SubmitAssignment from "./pages/student/SubmitAssignment";
import StudentExams from "./pages/student/Exams";
import SubjectDetails from "./pages/student/SubjectDetails";
import StudentProfile from "./pages/student/Profile";
import Progress from "./pages/student/Progress";
import StudentSchedule from "./pages/student/Schedule";
import StudySessions from "./pages/student/StudySessions";
import ProtectedRoute from "./components/ProtectedRoute";

// ================= TEACHER LAYOUT =================
import TeacherLayout from "./layouts/TeacherLayout";

// ================= TEACHER PAGES =================
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherSubjects from "./pages/teacher/Subjects";
import TeacherAssignments from "./pages/teacher/Assignments";
import TeacherExams from "./pages/teacher/Exams";
import TeacherProfile from "./pages/teacher/Profile";
import TeacherSchedule from "./pages/teacher/Schedule";
import Students from "./pages/teacher/Students";
import CreateAssignment from "./pages/teacher/CreateAssignment";
import CreateExam from "./pages/teacher/CreateExam";
import CreateSchedule from "./pages/teacher/CreateSchedule";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ================= PUBLIC PAGES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* ================= STUDENT ================= */}

        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentLayout />
            </ProtectedRoute>
          }
        >

          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Dashboard */}
          <Route
            path="dashboard"
            element={<StudentDashboard />}
          />

          {/* Subjects */}
          <Route
            path="subjects"
            element={<StudentSubjects />}
          />

          <Route
            path="subjects/:subjectId"
            element={<SubjectDetails />}
          />

          {/* Assignments */}
          <Route
            path="assignments"
            element={<StudentAssignments />}
          />

          <Route
            path="assignments/submit"
            element={<SubmitAssignment />}
          />

          {/* Exams */}
          <Route
            path="exams"
            element={<StudentExams />}
          />

          {/* Profile */}
          <Route
            path="profile"
            element={<StudentProfile />}
          />

          {/* Progress */}
          <Route
            path="progress"
            element={<Progress />}
          />

          {/* Schedule */}
          <Route
            path="schedule"
            element={<StudentSchedule />}
          />

          {/* Study Sessions */}
          <Route
            path="study-sessions"
            element={<StudySessions />}
          />

        </Route>


        {/* ================= TEACHER ================= */}

        <Route
          path="/teacher"
          element={
            <ProtectedRoute role="teacher">
              <TeacherLayout />
            </ProtectedRoute>
          }
        >

          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Dashboard */}
          <Route
            path="dashboard"
            element={<TeacherDashboard />}
          />

          <Route
            path="subjects"
            element={<TeacherSubjects />}
          />

          {/* Assignments */}
          <Route
            path="assignments"
            element={<TeacherAssignments />}
          />

          <Route path="assignments/create" element={<CreateAssignment />} />

          {/* Exams */}
          <Route
            path="exams"
            element={<TeacherExams />}
          />

          <Route path="exams/create" element={<CreateExam />} />

          {/* Profile */}
          <Route
            path="profile"
            element={<TeacherProfile />}
          />

          {/* Schedule */}
          <Route
            path="schedule"
            element={<TeacherSchedule />}
          />

          <Route path="schedule/create" element={<CreateSchedule />} />

          {/* Students */}
          <Route
            path="students"
            element={<Students />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;