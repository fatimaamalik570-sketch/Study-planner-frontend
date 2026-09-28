import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, FileText, Trash2, Pencil } from "lucide-react";
import { defaultExams, teacherStore } from "../../services/teacherStore";

function Exams() {
  const navigate = useNavigate();
  const [exams, setExams] = useState(() => teacherStore.read("teacherExams", defaultExams));

  const removeExam = (index) => {
    const nextExams = exams.filter((_, itemIndex) => itemIndex !== index);
    setExams(nextExams);
    teacherStore.write("teacherExams", nextExams);
  };

  return (
    <div>

      <div className="page-heading">

        <div>
          <h1>Exams</h1>
          <p>Create and manage exams.</p>
        </div>

        <button className="primary-btn" onClick={() => navigate("/teacher/exams/create")}>
          <Plus size={18} />
          Create Exam
        </button>

      </div>

      <div className="exam-grid">
        {exams.map((exam, index) => (
          <div className="exam-card" key={`${exam.title}-${index}`}>
            <div className="exam-card-top">
              <div className="exam-icon"><FileText size={22} /></div>
              <span className="exam-badge">Upcoming</span>
            </div>
            <h2>{exam.title}</h2>
            <p>{exam.subject}</p>
            <div className="exam-details">
              <span>{exam.date}</span>
              <span>{exam.time}</span>
              <span>{exam.marks}</span>
            </div>
            <button className="icon-action" onClick={() => navigate(`/teacher/exams/create?edit=${index}`)} aria-label={`Edit ${exam.title}`}>
              <Pencil size={16} />
            </button>
            <button className="icon-action" onClick={() => removeExam(index)} aria-label={`Remove ${exam.title}`}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Exams;