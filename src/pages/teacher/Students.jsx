import { useState } from "react";
import { BookOpen, MessageSquare, Save, TrendingUp } from "lucide-react";
import { defaultStudents, defaultTeacherSubjects, teacherStore } from "../../services/teacherStore";
import { getStudentTopicProgress } from "../../services/studentStore";

function Students() {
  const loggedInStudents = JSON.parse(localStorage.getItem("studentLoginHistory") || "[]");
  const registeredStudents = teacherStore.read("teacherStudents", []);
  const demoEmails = new Set(defaultStudents.map((student) => student.email));
  const students = [...loggedInStudents, ...registeredStudents.filter((student) => !demoEmails.has(student.email))]
    .filter((student, index, list) => list.findIndex((item) => item.email === student.email) === index);
  const subjects = teacherStore.read("teacherSubjects", defaultTeacherSubjects);
  const savedFeedback = teacherStore.read("studentFeedback", {});
  const [feedback, setFeedback] = useState(savedFeedback);
  const [savedStudent, setSavedStudent] = useState("");

  const getSubjectProgress = (subject, studentTopicProgress) => {
    const subjectKey = String(subject.id || subject.code || subject.name);
    const completedTopics = studentTopicProgress[subjectKey] || [];
    const topicCount = subject.topics?.length || 0;
    return topicCount ? Math.round((completedTopics.length / topicCount) * 100) : 0;
  };

  const saveFeedback = (studentId) => {
    teacherStore.write("studentFeedback", feedback);
    setSavedStudent(studentId);
  };

  return (
    <div>

      <div className="page-heading">
        <div>
          <h1>Students</h1>
          <p>View and monitor your students.</p>
        </div>
      </div>

      <div className="teacher-student-progress-list">
        {!students.length && (
          <div className="content-card">
            <strong>No active student found.</strong>
            <p>Log in with a student account first to view that student's progress.</p>
          </div>
        )}
        {students.map((student, index) => {
          const studentId = student.email || student.id || String(index);
          const studentTopicProgress = getStudentTopicProgress(studentId);
          const subjectProgress = subjects.map((subject) => ({
            subject,
            progress: getSubjectProgress(subject, studentTopicProgress),
          }));
          const overallProgress = subjectProgress.length
            ? Math.round(subjectProgress.reduce((total, item) => total + item.progress, 0) / subjectProgress.length)
            : 0;

          return (
            <section className="teacher-student-progress-card" key={studentId}>
              <div className="teacher-student-header">
                <div className="student-avatar">{student.name.charAt(0)}</div>
                <div className="student-info">
                  <strong>{student.name}</strong>
                  <span>{student.email}</span>
                </div>
                <div className="teacher-overall-progress">
                  <TrendingUp size={17} />
                  <strong>{overallProgress}%</strong>
                  <span>Overall Progress</span>
                </div>
              </div>

              <div className="teacher-subject-progress-list">
                {subjectProgress.map(({ subject, progress }) => {
                  const completedCount = studentTopicProgress[String(subject.id || subject.code || subject.name)]?.length || 0;
                  return (
                    <div className="teacher-student-subject" key={subject.id || subject.name}>
                      <div className="teacher-student-subject-title">
                        <BookOpen size={16} />
                        <strong>{subject.name}</strong>
                        <span>{completedCount}/{subject.topics?.length || 0} topics</span>
                        <b>{progress}%</b>
                      </div>
                      <div className="progress-bar"><span style={{ width: `${progress}%` }} /></div>
                    </div>
                  );
                })}
              </div>

              <div className="student-feedback-box">
                <label htmlFor={`feedback-${studentId}`}><MessageSquare size={16} /> Teacher Feedback</label>
                <textarea
                  id={`feedback-${studentId}`}
                  value={feedback[studentId] || ""}
                  onChange={(event) => setFeedback({ ...feedback, [studentId]: event.target.value })}
                  placeholder="Write feedback about this student's progress"
                />
                <button type="button" className="primary-btn" onClick={() => saveFeedback(studentId)}>
                  <Save size={15} /> {savedStudent === studentId ? "Feedback Saved" : "Save Feedback"}
                </button>
              </div>
            </section>
          );
        })}
      </div>

    </div>
  );
}

export default Students;