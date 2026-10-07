import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { defaultClasses, defaultTeacherSubjects, teacherStore } from "../../services/teacherStore";

function CreateSchedule() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editIndex = Number(searchParams.get("edit"));
  const classes = teacherStore.read("teacherSchedule", defaultClasses);
  const subjects = teacherStore.read("teacherSubjects", defaultTeacherSubjects);
  const existing = Number.isInteger(editIndex) && editIndex >= 0 ? classes[editIndex] : null;
  const [error, setError] = useState("");
  const [form, setForm] = useState(existing || {
    subject: "",
    group: "Class A",
    date: "",
    startTime: "",
    endTime: "",
    locationType: "classroom",
    location: "",
    topic: "",
    notes: "",
  });

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const save = (event) => {
    event.preventDefault();
    if (!form.subject || !form.group || !form.date || !form.startTime || !form.endTime || !form.location.trim()) {
      setError("Please complete all required fields before saving the class.");
      return;
    }
    if (form.endTime <= form.startTime) {
      setError("End Time must be later than Start Time. For an 11:00 AM class, choose an end time after 11:00 AM.");
      return;
    }
    setError("");
    const nextClasses = [...classes];
    if (existing) nextClasses[editIndex] = form;
    else nextClasses.push(form);
    teacherStore.write("teacherSchedule", nextClasses);
    navigate("/teacher/schedule");
  };

  return (
    <div className="management-page">
      <button className="back-btn" onClick={() => navigate("/teacher/schedule")}><ArrowLeft size={17} /> Back to Schedule</button>
      <div className="page-heading"><div><h1>{existing ? "Edit Class" : "Add Class"}</h1><p>Schedule a class or teaching session.</p></div></div>
      <form className="management-form" onSubmit={save}>
        <div className="form-grid form-wide">
          <label>Subject
            <select name="subject" value={form.subject} onChange={update} required>
              <option value="">Select subject</option>
              {subjects.map((subject) => <option key={subject.id || subject.code} value={subject.name}>{subject.name} ({subject.code})</option>)}
            </select>
          </label>
          <label>Class or Group
            <select name="group" value={form.group} onChange={update} required>
              <option>Class A</option>
              <option>Class B</option>
              <option>Class C</option>
              <option>All Students</option>
            </select>
          </label>
          <label>Date<input type="date" name="date" value={form.date} onChange={update} required /></label>
          <label>Start Time<input type="time" name="startTime" value={form.startTime} onChange={update} required /></label>
          <label>End Time<input type="time" name="endTime" min={form.startTime || undefined} value={form.endTime} onChange={update} required /></label>
          <label>Session Type
            <select name="locationType" value={form.locationType} onChange={update}>
              <option value="classroom">Classroom</option>
              <option value="online">Online Meeting</option>
            </select>
          </label>
          <label>{form.locationType === "online" ? "Meeting Link" : "Classroom"}<input name="location" value={form.location} onChange={update} placeholder={form.locationType === "online" ? "https://meet.example.com/..." : "e.g. Room 204"} required /></label>
          <label className="form-wide">Topic (Optional)<input name="topic" value={form.topic} onChange={update} placeholder="e.g. Introduction to Algebra" /></label>
          <label className="form-wide">Notes (Optional)<textarea name="notes" value={form.notes} onChange={update} placeholder="Add instructions or preparation notes" /></label>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="form-actions"><button type="button" className="secondary-btn" onClick={() => navigate("/teacher/schedule")}>Cancel</button><button type="submit" className="primary-btn"><Save size={17} /> Save Class</button></div>
      </form>
    </div>
  );
}

export default CreateSchedule;
