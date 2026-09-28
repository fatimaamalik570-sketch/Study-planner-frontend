import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Plus, Trash2, Pencil } from "lucide-react";
import { defaultClasses, teacherStore } from "../../services/teacherStore";

function Schedule() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState(() => teacherStore.read("teacherSchedule", defaultClasses));

  const removeClass = (index) => {
    const nextClasses = classes.filter((_, itemIndex) => itemIndex !== index);
    setClasses(nextClasses);
    teacherStore.write("teacherSchedule", nextClasses);
  };

  return (
    <div>

      <div className="page-heading">

        <div>
          <h1>Teaching Schedule</h1>
          <p>Manage your classes and teaching sessions.</p>
        </div>

        <button className="primary-btn" onClick={() => navigate("/teacher/schedule/create")}>
          <Plus size={18} />
          Add Class
        </button>

      </div>

      <div className="content-card">

        <div className="schedule-big">

          {classes.map((item, index) => (
            <div className="schedule-item" key={`${item.subject || item.title}-${index}`}>
              <CalendarDays />
              <div className="schedule-item-main">
                <strong>{item.subject || item.title}</strong>
                <span>{item.group || "Teaching Session"}</span>
                <small>{item.date ? `${item.date} · ${item.startTime} - ${item.endTime}` : item.time}</small>
                {item.location && <small>{item.locationType === "online" ? "Online: " : "Room: "}{item.location}</small>}
                {item.topic && <p>{item.topic}</p>}
                {item.notes && <em>{item.notes}</em>}
              </div>
              <button className="icon-action" onClick={() => navigate(`/teacher/schedule/create?edit=${index}`)} aria-label={`Edit ${item.subject || item.title}`}>
                <Pencil size={16} />
              </button>
              <button className="icon-action" onClick={() => removeClass(index)} aria-label={`Remove ${item.subject || item.title}`}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          {!classes.length && (
            <div className="schedule-empty-state">
              <CalendarDays size={24} />
              <strong>No classes scheduled yet</strong>
              <span>Click Add Class to schedule your first teaching session.</span>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Schedule;