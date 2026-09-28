import { CalendarDays, Clock, MapPin, FileText } from "lucide-react";
import { defaultExams, teacherStore } from "../../services/teacherStore";

const formatExamDate = (dateValue) => {
  if (!dateValue) return "Date not set";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

function Exams() {
  const exams = teacherStore.read("teacherExams", defaultExams);

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Exams</h1>
          <p>Keep track of your upcoming exams.</p>
        </div>
      </div>

      <div className="exam-grid">
        {exams.map((exam, index) => (
          <div className="exam-card" key={`${exam.title}-${index}`}>
            <div className="exam-card-top">
              <div className="exam-icon">
                <CalendarDays size={22} />
              </div>

              <span className="exam-badge">Upcoming</span>
            </div>

            <h2>{exam.title}</h2>
            <p>{exam.subject}</p>
            {exam.professorName && <small>Professor: {exam.professorName}</small>}
            {exam.question && <div className="exam-question">{exam.question}</div>}

            <div className="exam-details">
              <div>
                <CalendarDays size={16} />
                {formatExamDate(exam.date)}
              </div>

              <div>
                <Clock size={16} />
                {exam.time}
              </div>

              {exam.room ? (
                <div>
                  <MapPin size={16} />
                  {exam.room}
                </div>
              ) : (
                <div>
                  <FileText size={16} />
                  {exam.marks || "Marks not set"}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Exams;