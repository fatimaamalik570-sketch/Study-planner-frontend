import { useMemo, useState } from "react";
import { BookOpen, GraduationCap, Search, CheckCircle2, Clock3, Filter, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { defaultTeacherSubjects, teacherStore } from "../../services/teacherStore";
import { readStudentSubjects, studentStore } from "../../services/studentStore";

const filters = ["All", "In Progress", "Completed"];

function Subjects() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");

  const studentSubjectList = readStudentSubjects();

  const filteredSubjects = useMemo(() => {
    return studentSubjectList.filter((subject) => {
      const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) || subject.teacher.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === "All" || subject.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter, studentSubjectList]);

  const totalSubjects = studentSubjectList.length;
  const inProgress = studentSubjectList.filter((subject) => subject.status === "In Progress").length;
  const completed = studentSubjectList.filter((subject) => subject.status === "Completed").length;

  const officialSubjects = teacherStore.read("teacherSubjects", defaultTeacherSubjects);

  const joinSubject = () => {
    const subject = officialSubjects.find((item) => String(item.id) === selectedSubjectId);
    if (!subject) return;

    const saved = studentStore.read("studentJoinedSubjects", []);
    const alreadyJoined = saved.some((item) => item.name === subject.name);
    if (alreadyJoined) {
      setIsJoinOpen(false);
      setSelectedSubjectId("");
      return;
    }

    const next = [...saved, { ...subject, nextDeadline: "TBA", status: "In Progress" }];
    studentStore.write("studentJoinedSubjects", next);
    setIsJoinOpen(false);
    setSelectedSubjectId("");
    window.location.reload();
  };

  return (
    <div className="subjects-page">
      <div className="subjects-header">
        <div>
          <h1>My Subjects</h1>
        </div>

        <div className="subjects-search-wrap">
          <Search size={16} />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search subjects"
            aria-label="Search subjects"
          />
        </div>

        <button className="add-subject-btn" onClick={() => setIsJoinOpen(true)}>
          <Plus size={16} /> Add Subject
        </button>

        <div className="subjects-count">
          <span>{totalSubjects}</span>
          <small>Total</small>
        </div>
      </div>

      <div className="subjects-summary-grid">
        <div className="summary-card">
          <span className="summary-label">Total Subjects</span>
          <strong>{totalSubjects}</strong>
        </div>
        <div className="summary-card">
          <span className="summary-label">In Progress</span>
          <strong>{inProgress}</strong>
        </div>
        <div className="summary-card">
          <span className="summary-label">Completed</span>
          <strong>{completed}</strong>
        </div>
      </div>

      <div className="subjects-toolbar">
        <div className="filter-row">
          <Filter size={16} />
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={activeFilter === filter ? "filter-btn active" : "filter-btn"}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {isJoinOpen && (
        <div className="join-subject-modal">
          <div className="join-subject-card">
            <h3>Join a Subject</h3>
            <label>
              Select Subject
              <select value={selectedSubjectId} onChange={(event) => setSelectedSubjectId(event.target.value)}>
                <option value="">Choose a subject</option>
                {officialSubjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>{subject.name} ({subject.code})</option>
                ))}
              </select>
            </label>

            <div className="join-subject-actions">
              <button type="button" className="secondary-btn" onClick={() => setIsJoinOpen(false)}>Cancel</button>
              <button type="button" className="primary-btn" onClick={joinSubject} disabled={!selectedSubjectId}>Join Subject</button>
            </div>
          </div>
        </div>
      )}

      <div className="subjects-grid">
        {filteredSubjects.map((subject) => (
          <div className="subject-card" key={subject.id || subject.name}>
            <div className="subject-card-top">
              <div className="subject-icon">
                <BookOpen size={23} />
              </div>

              <span className="subject-code">{subject.code}</span>
            </div>

            <h2>{subject.name}</h2>

            <p className="subject-teacher">
              <GraduationCap size={16} /> {subject.teacher}
            </p>

            <div className="subject-progress">
              <div className="progress-info">
                <span>Course Progress</span>
                <strong>{subject.progress}%</strong>
              </div>

              <div className="subject-progress-bar">
                <div className="subject-progress-fill" style={{ width: `${subject.progress}%` }}></div>
              </div>
            </div>

            <div className="subject-stats">
              <div>
                <strong>{subject.assignments}</strong>
                <span>Assignments</span>
              </div>
              <div>
                <strong>{subject.exams}</strong>
                <span>Exams</span>
              </div>
            </div>

            <div className="subject-meta-row">
              <div className="subject-meta-item">
                <Clock3 size={14} />
                <span>{subject.nextDeadline}</span>
              </div>

              <div className={`subject-status ${subject.status === "Completed" ? "done" : "progress"}`}>
                {subject.status === "Completed" ? <CheckCircle2 size={14} /> : <Clock3 size={14} />}
                <span>{subject.status}</span>
              </div>
            </div>

            <button className="subject-view-btn" onClick={() => navigate(`/student/subjects/${subject.id || subject.name}`)}>
              View Subject
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subjects;