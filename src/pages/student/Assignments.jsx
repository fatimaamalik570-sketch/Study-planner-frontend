import { useState } from "react";
import { ClipboardList, CheckCircle, Clock, Pencil, Trash2 } from "lucide-react";
import { readStudentAssignments, studentStore } from "../../services/studentStore";
import { useNavigate } from "react-router-dom";

function Assignments() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState(() =>
    readStudentAssignments()
  );

  const updateAssignments = (nextAssignments) => {
    setAssignments(nextAssignments);
    studentStore.write("studentAssignments", nextAssignments);
  };

  const deleteAssignment = (index) => {
    updateAssignments(assignments.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div>

      <div className="page-heading">
        <div>
          <h1>Assignments</h1>
          <p>Manage and track your assignments.</p>
        </div>

        <button className="primary-btn" onClick={() => assignments[0] && navigate("/student/assignments/submit?edit=0")}>
          <ClipboardList size={18} />
          My Assignments
        </button>
      </div>

      <div className="content-card">

        {assignments.map((assignment, index) => (
          <div className="full-assignment" key={index}>

            <div className="full-assignment-icon">
              <ClipboardList size={21} />
            </div>

            <div className="full-assignment-info">
              <h3>{assignment.title}</h3>
              <p>{assignment.subject}</p>
              {assignment.professorName && <small>Professor: {assignment.professorName}</small>}
              {assignment.question && <div className="assignment-question">{assignment.question}</div>}
            </div>

            <div className="due-info">
              <Clock size={16} />
              Due {assignment.due}
            </div>

            <span className={`status ${assignment.status.toLowerCase()}`}>
              {assignment.status === "Completed" && (
                <CheckCircle size={15} />
              )}
              {assignment.status}
            </span>

            {assignment.status !== "Completed" && (
              <button className="small-action" onClick={() => navigate(`/student/assignments/submit?edit=${index}`)}>
                Submit
              </button>
            )}

            <button className="icon-action" onClick={() => deleteAssignment(index)} aria-label={`Delete ${assignment.title}`}>
              <Trash2 size={16} />
            </button>

            <button className="icon-action" onClick={() => navigate(`/student/assignments/submit?edit=${index}`)} aria-label={`Edit ${assignment.title}`}>
              <Pencil size={16} />
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Assignments;