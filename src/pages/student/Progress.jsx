import { useState } from "react";
import { TrendingUp, Award, Target } from "lucide-react";
import { defaultExams, teacherStore } from "../../services/teacherStore";
import { defaultStudentAssignments, readStudentAssignments, readStudentSubjects, studentStore } from "../../services/studentStore";

function Progress() {
  const assignments = readStudentAssignments();
  const subjects = readStudentSubjects();
  const exams = teacherStore.read("teacherExams", defaultExams);
  const examProgress = studentStore.read("studentExamProgress", {});
  const sessions = studentStore.read("studentStudySessions", []);
  const [, refresh] = useState(0);
  const completedAssignments = assignments.filter((assignment) => assignment.status === "Completed").length;
  const taskCompletion = assignments.length ? Math.round((completedAssignments / assignments.length) * 100) : 0;
  const studyMinutes = sessions.reduce((total, session) => total + Number(session.minutes), 0);
  const subjectProgress = subjects.map((subject) => {
    const subjectAssignments = assignments.filter((assignment) => assignment.subject === subject.name);
    const subjectExams = exams.filter((exam) => exam.subject === subject.name);
    const completedTopics = subject.completedTopics.length;
    const topicScore = subject.topics.length ? (completedTopics / subject.topics.length) * 60 : 0;
    const assignmentScore = subjectAssignments.length
      ? (subjectAssignments.filter((assignment) => assignment.status === "Completed").length / subjectAssignments.length) * 20
      : 0;
    const examScore = subjectExams.length
      ? (subjectExams.filter((exam) => examProgress[examKey(exam)] === "Completed").length / subjectExams.length) * 20
      : 0;
    return { subject, progress: Math.round(topicScore + assignmentScore + examScore) };
  });
  const overallProgress = subjectProgress.length
    ? Math.round(subjectProgress.reduce((total, item) => total + item.progress, 0) / subjectProgress.length)
    : 0;

  const markExamComplete = (exam) => {
    examProgress[examKey(exam)] = "Completed";
    studentStore.write("studentExamProgress", examProgress);
    refresh((value) => value + 1);
  };
  return (
    <div>

      <div className="page-heading">
        <div>
          <h1>My Progress</h1>
          <p>Track your academic performance.</p>
        </div>
      </div>

      <div className="stats-grid">

        <div className="progress-stat">
          <TrendingUp />
          <strong>{overallProgress}%</strong>
          <span>Overall Progress</span>
        </div>

        <div className="progress-stat">
          <Award />
          <strong>{subjects.length ? "3.6" : "0.0"}</strong>
          <span>Current GPA</span>
        </div>

        <div className="progress-stat">
          <Target />
          <strong>{taskCompletion}%</strong>
          <span>Task Completion</span>
        </div>

      </div>

      <div className="content-card">

        <h2 className="section-title">
          Subject Performance
        </h2>

        <p className="progress-summary">{sessions.length} saved study sessions · {studyMinutes} focused minutes</p>

        {subjectProgress.map(({ subject, progress }) => (
          <div className="progress-row" key={subject.subjectKey}>
            <div>
              <strong>{subject.name}</strong>
              <span>{progress}%</span>
            </div>
            <div className="progress-bar"><span style={{ width: `${progress}%` }} /></div>
          </div>
        ))}

        {!subjectProgress.length && <p className="progress-summary">Join a subject to start tracking progress.</p>}

        {exams.length > 0 && (
          <div className="progress-exam-list">
            <h3>Exam Completion</h3>
            {exams.map((exam) => (
              <div className="progress-exam-row" key={examKey(exam)}>
                <span>{exam.title} · {exam.subject}</span>
                {examProgress[examKey(exam)] === "Completed" ? (
                  <strong>Completed</strong>
                ) : (
                  <button type="button" className="small-action" onClick={() => markExamComplete(exam)}>Mark Clear</button>
                )}
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

const examKey = (exam) => `${exam.title}-${exam.subject}-${exam.date}`;

export default Progress;