import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { readStudentAssignments, studentStore } from "../../services/studentStore";

function SubmitAssignment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const assignmentIndex = Number(searchParams.get("edit"));
  const assignments = readStudentAssignments();
  const assignment = assignments[assignmentIndex];
  const [submission, setSubmission] = useState("");

  if (!assignment) {
    return (
      <div className="management-page">
        <button className="back-btn" onClick={() => navigate("/student/assignments")}>
          <ArrowLeft size={17} /> Back to Assignments
        </button>
        <div className="page-heading"><h1>Assignment not found</h1></div>
      </div>
    );
  }

  const submit = (event) => {
    event.preventDefault();
    const nextAssignments = assignments.map((item, index) => (
      index === assignmentIndex
        ? { ...item, status: "Completed", submission }
        : item
    ));
    studentStore.write("studentAssignments", nextAssignments);
    navigate("/student/assignments");
  };

  return (
    <div className="management-page">
      <button className="back-btn" onClick={() => navigate("/student/assignments")}>
        <ArrowLeft size={17} /> Back to Assignments
      </button>
      <div className="page-heading">
        <div>
          <h1>Submit Assignment</h1>
          <p>{assignment.title} · {assignment.subject}</p>
        </div>
      </div>
      {assignment.question && (
        <div className="assignment-prompt-card">
          <strong>Assignment Question</strong>
          <p>{assignment.question}</p>
          {assignment.professorName && <small>Professor: {assignment.professorName}</small>}
        </div>
      )}
      <form className="management-form" onSubmit={submit}>
        <label>
          Your submission
          <textarea
            value={submission}
            onChange={(event) => setSubmission(event.target.value)}
            placeholder="Write your answer or add submission details..."
            rows="8"
            required
          />
        </label>
        <div className="form-actions">
          <button type="button" className="secondary-btn" onClick={() => navigate("/student/assignments")}>Cancel</button>
          <button className="primary-btn"><Send size={17} /> Submit Assignment</button>
        </div>
      </form>
    </div>
  );
}

export default SubmitAssignment;