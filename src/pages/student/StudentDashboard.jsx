import {
  ClipboardList,
  FileText,
  TrendingUp,
  ArrowRight,
  Dumbbell,
  Sparkles,
} from "lucide-react";

import StatCard from "../../components/StatCard";
import ScheduleCard from "../../components/ScheduleCard";
import AssignmentCard from "../../components/AssignmentCard";
import { useAuth } from "../../context/AuthContext";
import { defaultExams, teacherStore } from "../../services/teacherStore";
import { readStudentAssignments } from "../../services/studentStore";

function StudentDashboard() {
  const { user } = useAuth();
  const assignments = readStudentAssignments();
  const exams = teacherStore.read("teacherExams", []);
  const pendingAssignments = assignments.filter((assignment) => assignment.status !== "Completed").length;

  return (
    <div>

      <div className="welcome-section">
        <div>
          <h1>Good Morning, {user?.name || "Student"}! 👋</h1>
          <p>Stay focused and keep learning.</p>
        </div>

        <div className="date-box">
          <strong>Wednesday</strong>
          <span>September 02, 2026</span>
        </div>
      </div>

      {/* Stats */}

      <div className="stats-grid">

        <StatCard
          title="Tasks"
          value={assignments.length}
          subtitle={`${pendingAssignments} Pending`}
          icon={ClipboardList}
          type="blue"
        />

        <StatCard
          title="Exams"
          value={exams.length}
          subtitle={`${exams.length} Created`}
          icon={FileText}
          type="green"
        />

        <StatCard
          title="Assignments"
          value={assignments.length}
          subtitle={`${pendingAssignments} Pending`}
          icon={ClipboardList}
          type="purple"
        />

        <StatCard
          title="Progress"
          value="72%"
          subtitle="Keep it up!"
          icon={TrendingUp}
          type="orange"
        />

      </div>

      <div className="dashboard-grid">

        {/* Schedule */}

        <section className="dashboard-card schedule-card">

          <div className="card-header">
            <div>
              <h2>Today's Schedule</h2>
              <p>Your classes and study sessions</p>
            </div>

            <button className="text-btn">
              View Full Schedule
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="schedule-list">

            <ScheduleCard
              time="09:00 AM"
              title="Data Science"
              type="Lecture"
              color="#2563EB"
            />

            <ScheduleCard
              time="11:00 AM"
              title="Web Development"
              type="Lecture"
              color="#7C3AED"
            />

            <ScheduleCard
              time="02:00 PM"
              title="Database Systems"
              type="Lecture"
              color="#10B981"
            />

            <ScheduleCard
              time="04:00 PM"
              title="Study Session"
              type="Focus Time"
              color="#F59E0B"
            />

          </div>

        </section>

        {/* Assignments */}

        <section className="dashboard-card">

          <div className="card-header">
            <div>
              <h2>Upcoming Assignments</h2>
              <p>Don't miss your deadlines</p>
            </div>

            <button className="text-btn">
              View All
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="assignment-list">

            {assignments.slice(0, 4).map((assignment) => (
              <AssignmentCard
                key={assignment.title}
                title={assignment.title}
                subject={assignment.subject}
                due={assignment.due}
                status={assignment.status}
              />
            ))}

          </div>

        </section>

      </div>

      {/* Bottom Tip */}

      <div className="study-tip">

        <div>
          <strong>Study Tip of the Day <Sparkles size={15} /></strong>
          <p>
            Consistency is more important than intensity.
          </p>
        </div>

        <span>
          Keep going, you're doing great! <Dumbbell size={15} />
        </span>

      </div>

    </div>
  );
}

export default StudentDashboard;