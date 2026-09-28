import {
  Users,
  ClipboardList,
  FileText,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

import StatCard from "../../components/StatCard";
import { defaultAssignments, defaultExams, defaultStudents, teacherStore } from "../../services/teacherStore";

function TeacherDashboard() {
  const students = teacherStore.read("teacherStudents", defaultStudents);
  const assignments = teacherStore.read("teacherAssignments", defaultAssignments);
  const exams = teacherStore.read("teacherExams", defaultExams);

  return (
    <div>

      <div className="welcome-section">
        <div>
          <h1>Good Morning, Teacher! 👋</h1>
          <p>Manage your classes and help students succeed.</p>
        </div>

        <div className="date-box">
          <strong>Wednesday</strong>
          <span>September 02, 2026</span>
        </div>
      </div>

      <div className="stats-grid">

        <StatCard
          title="Students"
          value={students.length}
          subtitle="Currently enrolled"
          icon={Users}
          type="blue"
        />

        <StatCard
          title="Assignments"
          value={assignments.length}
          subtitle={`${assignments.length} Created`}
          icon={ClipboardList}
          type="purple"
        />

        <StatCard
          title="Exams"
          value={exams.length}
          subtitle={`${exams.length} Created`}
          icon={FileText}
          type="green"
        />

        <StatCard
          title="Class Progress"
          value="82%"
          subtitle="Overall Average"
          icon={TrendingUp}
          type="orange"
        />

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <div className="card-header">
            <div>
              <h2>Recent Assignments</h2>
              <p>Student submissions</p>
            </div>

            <button className="text-btn">
              View All
              <ArrowRight size={15} />
            </button>
          </div>

          {assignments.slice(0, 4).map((assignment) => (
            <div className="teacher-assignment" key={assignment.title}>
              <strong>{assignment.title}</strong>
              <span>{assignment.submissions || "0 / 0"} Submissions</span>
              <b>{assignment.submissions ? "Pending Review" : "Awaiting Submissions"}</b>
            </div>
          ))}

        </div>

        <div className="dashboard-card">

          <div className="card-header">
            <div>
              <h2>Class Performance</h2>
              <p>Average performance</p>
            </div>
          </div>

          <div className="class-progress">

            <div>
              <span>Data Science</span>
              <strong>88%</strong>
            </div>

            <div className="progress-bar">
              <span style={{ width: "88%" }} />
            </div>

          </div>

          <div className="class-progress">

            <div>
              <span>Web Development</span>
              <strong>82%</strong>
            </div>

            <div className="progress-bar">
              <span style={{ width: "82%" }} />
            </div>

          </div>

          <div className="class-progress">

            <div>
              <span>Database Systems</span>
              <strong>76%</strong>
            </div>

            <div className="progress-bar">
              <span style={{ width: "76%" }} />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TeacherDashboard;