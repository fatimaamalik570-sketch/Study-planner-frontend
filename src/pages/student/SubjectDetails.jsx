import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, CalendarDays, CheckCircle2, FileText, NotebookTabs, Target } from "lucide-react";
import { readStudentSubjects, requestStudentSubjectCompletion, updateStudentTopicProgress, studentStore } from "../../services/studentStore";

const tabs = ["Overview", "Topics", "Assignments", "Exams"];

function SubjectDetails() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [subjectVersion, setSubjectVersion] = useState(0);
  const studentSubjects = readStudentSubjects();

  const subject = useMemo(
    () => studentSubjects.find((item) => String(item.id) === String(subjectId)),
    [subjectId, subjectVersion]
  );

  const currentStudent = JSON.parse(localStorage.getItem("activeStudentUser") || "null");
  const studentKey = String(currentStudent?.email || currentStudent?.id || "guest-student").toLowerCase();
  const completionRequest = studentStore.read("subjectCompletionRequests", [])
    .find((request) => request.subjectKey === subject?.subjectKey && request.studentKey === studentKey);

  const toggleTopic = (topicIndex) => {
    updateStudentTopicProgress(subject, topicIndex, !subject.completedTopics.includes(topicIndex));
    setSubjectVersion((version) => version + 1);
  };

  const requestCompletion = () => {
    requestStudentSubjectCompletion(subject);
    setSubjectVersion((version) => version + 1);
  };

  if (!subject) {
    return (
      <div className="page-empty-state">
        <h2>Subject not found</h2>
        <button className="primary-btn" onClick={() => navigate("/student/subjects")}>Back to Subjects</button>
      </div>
    );
  }

  return (
    <div className="subject-detail-page">
      <button className="back-btn" onClick={() => navigate("/student/subjects")}>
        <ArrowLeft size={17} /> Back to Subjects
      </button>

      <div className="subject-detail-header">
        <div className="subject-detail-icon">
          <BookOpen size={28} />
        </div>

        <div>
          <p className="subject-detail-code">{subject.code}</p>
          <h1>{subject.name}</h1>
          <span className="subject-detail-teacher">Teacher: {subject.teacher}</span>
        </div>
      </div>

      <div className="subject-detail-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={activeTab === tab ? "subject-tab active" : "subject-tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="subject-detail-card">
        {activeTab === "Overview" && (
          <div className="subject-detail-body">
            <div className="detail-summary-box">
              <Target size={18} />
              <div>
                <small>Progress</small>
                <strong>{subject.progress}%</strong>
              </div>
            </div>

            <p>{subject.overview}</p>

            <div className="detail-grid">
              <div>
                <small>Assignments</small>
                <strong>{subject.assignments}</strong>
              </div>
              <div>
                <small>Exams</small>
                <strong>{subject.exams}</strong>
              </div>
              <div>
                <small>Next Deadline</small>
                <strong>{subject.nextDeadline}</strong>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Topics" && (
          <div className="subject-detail-body">
            <div className="topics-progress-heading">
              <div>
                <h2>{subject.status}</h2>
                <p>{subject.completedTopics.length} of {subject.topics.length} topics completed</p>
              </div>
              <strong>{subject.progress}%</strong>
            </div>
            <div className="subject-progress-bar topics-progress-bar">
              <div className="subject-progress-fill" style={{ width: `${subject.progress}%` }} />
            </div>
            <div className="topic-list">
              {subject.topics.map((topic, index) => (
                <div className={`topic-item ${subject.completedTopics.includes(index) ? "completed" : ""}`} key={`${topic}-${index}`}>
                  <div className="topic-item-name">
                    {subject.completedTopics.includes(index) ? <CheckCircle2 size={17} /> : <NotebookTabs size={16} />}
                    <span>{topic}</span>
                  </div>
                  <button type="button" className="topic-complete-btn" onClick={() => toggleTopic(index)}>
                    {subject.completedTopics.includes(index) ? "Completed" : "Mark as Completed"}
                  </button>
                </div>
              ))}
            </div>
            <div className="completion-request-row">
              {completionRequest?.status === "Pending" ? (
                <span className="request-status">Completion request pending teacher verification</span>
              ) : (
                <button type="button" className="primary-btn" disabled={subject.progress < 100} onClick={requestCompletion}>
                  Request Subject Completion
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === "Assignments" && (
          <div className="subject-detail-body">
            <div className="detail-list">
              {subject.assignmentList.map((item, index) => (
                <div className="detail-row" key={`${item.title}-${index}`}>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.status}</span>
                  </div>
                  <small><CalendarDays size={14} /> {item.due}</small>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Exams" && (
          <div className="subject-detail-body">
            <div className="detail-list">
              {subject.examList.map((item, index) => (
                <div className="detail-row" key={`${item.title}-${index}`}>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.time}</span>
                  </div>
                  <small><FileText size={14} /> {item.date}</small>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubjectDetails;
