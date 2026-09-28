import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ClipboardList, Trash2, Pencil } from "lucide-react";
import { defaultAssignments, teacherStore } from "../../services/teacherStore";

function Assignments() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState(() =>
    teacherStore.read("teacherAssignments", defaultAssignments)
  );

  const removeAssignment = (index) => {
    const nextAssignments = assignments.filter((_, itemIndex) => itemIndex !== index);
    setAssignments(nextAssignments);
    teacherStore.write("teacherAssignments", nextAssignments);
  };

  return (
    <div>

      <div className="page-heading">

        <div>
          <h1>Assignments</h1>
          <p>Create and manage student assignments.</p>
        </div>

        <button className="primary-btn" onClick={() => navigate("/teacher/assignments/create")}>
          <Plus size={18} />
          Create Assignment
        </button>

      </div>

      <div className="content-card">

        <div className="table-header">
          <span>Assignment</span>
          <span>Subject</span>
          <span>Due Date</span>
          <span>Submissions</span>
          <span>Status</span>
        </div>

        {assignments.map((assignment, index) => (
          <div className="table-row" key={`${assignment.title}-${index}`}>
            <div>
              <ClipboardList size={18} />
              <strong>{assignment.title}</strong>
            </div>
            <span>{assignment.subject}{assignment.professorName ? ` · ${assignment.professorName}` : ""}</span>
            <span>{assignment.due}</span>
            <span>{assignment.submissions}</span>
            <span className="status active-status">Active</span>
            <button className="icon-action" onClick={() => navigate(`/teacher/assignments/create?edit=${index}`)} aria-label={`Edit ${assignment.title}`}>
              <Pencil size={16} />
            </button>
            <button className="icon-action" onClick={() => removeAssignment(index)} aria-label={`Remove ${assignment.title}`}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Assignments;