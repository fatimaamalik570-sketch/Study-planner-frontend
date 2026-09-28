import { FileText } from "lucide-react";

function AssignmentCard({
  title,
  subject,
  due,
  status,
}) {
  return (
    <div className="assignment-card">

      <div className="assignment-icon">
        <FileText size={19} />
      </div>

      <div className="assignment-info">
        <strong>{title}</strong>
        <span>{subject}</span>
      </div>

      <div className="assignment-right">
        <span
          className={`assignment-status ${
            status === "Completed"
              ? "completed"
              : status === "Pending"
              ? "pending"
              : "soon"
          }`}
        >
          {status}
        </span>

        <small>{due}</small>
      </div>

    </div>
  );
}

export default AssignmentCard;