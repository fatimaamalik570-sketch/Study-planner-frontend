import { useState } from "react";
import { CheckCircle2, ClipboardCheck, BookOpen, Plus } from "lucide-react";
import { defaultTeacherSubjects, teacherStore } from "../../services/teacherStore";
import { getStudentTopicProgress } from "../../services/studentStore";

function Subjects() {
  const [version, setVersion] = useState(0);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [form, setForm] = useState({ name: "", code: "", professor: "", overview: "", topics: "" });
  const subjects = teacherStore.read("teacherSubjects", defaultTeacherSubjects);
  const requests = teacherStore.read("subjectCompletionRequests", []);

  const verifyCompletion = (subjectKey, studentKey, status) => {
    const subjectStatuses = JSON.parse(localStorage.getItem("studentSubjectStatuses") || "{}");
    subjectStatuses[studentKey] = { ...(subjectStatuses[studentKey] || {}), [subjectKey]: status };
    localStorage.setItem("studentSubjectStatuses", JSON.stringify(subjectStatuses));
    const nextRequests = requests.map((request) => (
      request.subjectKey === subjectKey && request.studentKey === studentKey
        ? { ...request, status: status === "Completed" ? "Approved" : "Rejected", verifiedAt: new Date().toISOString() }
        : request
    ));

    teacherStore.write("subjectCompletionRequests", nextRequests);
    setVersion((current) => current + 1);
  };

  const createSubject = (event) => {
    event.preventDefault();
    const topics = form.topics.split(",").map((topic) => topic.trim()).filter(Boolean);
    if (!form.name.trim() || !form.code.trim() || !topics.length) return;

    const nextSubject = {
      id: Date.now(),
      name: form.name.trim(),
      code: form.code.trim().toUpperCase(),
      teacher: form.professor.trim() || "Teacher",
      progress: 0,
      status: "In Progress",
      assignments: 0,
      exams: 0,
      topics,
      overview: form.overview.trim() || "Course overview not yet set.",
    };

    teacherStore.write("teacherSubjects", [...subjects, nextSubject]);
    setForm({ name: "", code: "", professor: "", overview: "", topics: "" });
    setIsCreateOpen(false);
    setVersion((current) => current + 1);
  };

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Subjects</h1>
          <p>Manage course topics and verify student completion requests.</p>
        </div>
        <button type="button" className="primary-btn" onClick={() => setIsCreateOpen(true)}>
          <Plus size={16} /> Create Subject
        </button>
      </div>

      {isCreateOpen && (
        <form className="create-subject-form" onSubmit={createSubject}>
          <div className="create-subject-form-heading">
            <div>
              <h2>Create Official Subject</h2>
              <p>Students will see this course after they join it.</p>
            </div>
            <button type="button" className="secondary-btn" onClick={() => setIsCreateOpen(false)}>Cancel</button>
          </div>
          <div className="create-subject-fields">
            <label>Subject Name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Mathematics" /></label>
            <label>Professor Name<input value={form.professor} onChange={(event) => setForm({ ...form, professor: event.target.value })} placeholder="Mr. Ahmed" /></label>
            <label>Subject Code<input value={form.code} onChange={(event) => setForm({ ...form, code: event.target.value })} placeholder="MATH-101" /></label>
            <label className="create-subject-wide">Course Overview<textarea value={form.overview} onChange={(event) => setForm({ ...form, overview: event.target.value })} placeholder="Describe the course content" /></label>
            <label className="create-subject-wide">Topics <span className="field-hint">Separate topics with commas</span><input value={form.topics} onChange={(event) => setForm({ ...form, topics: event.target.value })} placeholder="Introduction to Algebra, Linear Equations, Trigonometry" /></label>
          </div>
          <button type="submit" className="primary-btn">Create Subject</button>
        </form>
      )}

      <div className="teacher-subjects-grid">
        {subjects.map((subject) => {
          const subjectKey = String(subject.id || subject.code || subject.name);
          const subjectRequests = requests.filter((item) => item.subjectKey === subjectKey);
          const topicCount = subject.topics?.length || 0;

          return (
            <section className="teacher-subject-card" key={`${subjectKey}-${version}`}>
              <div className="teacher-subject-card-header">
                <div className="subject-icon"><BookOpen size={21} /></div>
                <div>
                  <h2>{subject.name}</h2>
                  <span>{subject.code} · {subject.teacher}</span>
                </div>
                <strong className="status-progress">Official Course</strong>
              </div>

              <p>{subject.overview}</p>
              <div className="teacher-completion-requests">
                {subjectRequests.length ? subjectRequests.map((request) => {
                  const studentProgress = getStudentTopicProgress(request.studentKey)[subjectKey] || [];
                  const progress = topicCount ? Math.round((studentProgress.length / topicCount) * 100) : 0;
                  return (
                    <div className="completion-request-card" key={`${request.studentKey}-${request.status}`}>
                      <div>
                        <ClipboardCheck size={18} />
                        <span>{request.studentName} · {progress}% · {request.status}</span>
                      </div>
                      {request.status === "Pending" && (
                        <div className="completion-request-actions">
                          <button type="button" className="primary-btn" onClick={() => verifyCompletion(subjectKey, request.studentKey, "Completed")}>
                            <CheckCircle2 size={16} /> Approve
                          </button>
                          <button type="button" className="secondary-btn" onClick={() => verifyCompletion(subjectKey, request.studentKey, "In Progress")}>Reject</button>
                        </div>
                      )}
                    </div>
                  );
                }) : <span className="teacher-subject-hint">Students can request verification after completing every topic.</span>}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Subjects;
