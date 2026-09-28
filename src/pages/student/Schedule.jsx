import { useState } from "react";
import { CalendarDays, Plus } from "lucide-react";
import { defaultStudentSchedule, studentSubjects, studentStore } from "../../services/studentStore";

const emptySchedule = {
  subject: studentSubjects[0]?.name || "Mathematics",
  type: "Class",
  day: "Monday",
  start: "09:00 AM",
  end: "10:00 AM",
  room: "",
  notes: "",
};

function Schedule() {
  const [schedule, setSchedule] = useState(() => studentStore.read("studentSchedule", defaultStudentSchedule));
  const [form, setForm] = useState(emptySchedule);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const updateForm = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const openForm = () => {
    setForm(emptySchedule);
    setIsFormOpen(true);
  };

  const saveSchedule = (event) => {
    event.preventDefault();
    const nextSchedule = [...schedule, form];
    setSchedule(nextSchedule);
    studentStore.write("studentSchedule", nextSchedule);
    setIsFormOpen(false);
  };
  return (
    <div>

      <div className="page-heading">
        <div>
          <h1>My Schedule</h1>
          <p>Plan your classes and study time.</p>
        </div>

        <button className="primary-btn" onClick={() => openForm()}>
          <CalendarDays size={18} />
          Add Schedule
        </button>
      </div>

      {isFormOpen && (
        <form className="schedule-form" onSubmit={saveSchedule}>
          <h2>Add New Schedule</h2>
          <label>Subject<select name="subject" value={form.subject} onChange={updateForm}>{studentSubjects.map((subject) => <option key={subject.id} value={subject.name}>{subject.name}</option>)}</select></label>
          <label>Schedule Type<select name="type" value={form.type} onChange={updateForm}><option>Class</option><option>Study Session</option><option>Assignment</option></select></label>
          <label>Day<select name="day" value={form.day} onChange={updateForm}>{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => <option key={day}>{day}</option>)}</select></label>
          <div className="form-grid"><label>Start Time<input name="start" value={form.start} onChange={updateForm} required /></label><label>End Time<input name="end" value={form.end} onChange={updateForm} required /></label></div>
          <label>Room<input name="room" value={form.room} onChange={updateForm} placeholder="Optional" /></label>
          <label>Notes<textarea name="notes" value={form.notes} onChange={updateForm} placeholder="Add notes..." /></label>
          <div className="form-actions"><button type="button" className="secondary-btn" onClick={() => setIsFormOpen(false)}>Cancel</button><button className="primary-btn"><Plus size={17} /> Add Schedule</button></div>
        </form>
      )}

      <div className="content-card">

        <div className="week-header">
          <span>Monday</span>
          <span>Tuesday</span>
          <span>Wednesday</span>
          <span>Thursday</span>
          <span>Friday</span>
        </div>

        <div className="calendar-placeholder">

          {schedule.map((item, index) => (
            <div className={`calendar-event ${item.type === "Class" ? "blue-event" : item.type === "Assignment" ? "green-event" : "orange-event"}`} key={`${item.subject}-${item.start}-${index}`}>
              <strong>{item.subject}</strong>
              <span>{item.day} · {item.start} - {item.end}</span>
              <small>{item.type}</small>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Schedule;