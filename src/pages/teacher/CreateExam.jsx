import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { defaultExams, teacherStore } from "../../services/teacherStore";

function CreateExam() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editIndex = Number(searchParams.get("edit"));
  const exams = teacherStore.read("teacherExams", defaultExams);
  const existing = Number.isInteger(editIndex) && editIndex >= 0 ? exams[editIndex] : null;
  const [form, setForm] = useState(existing || { title: "", subject: "", professorName: "", question: "", date: "", time: "", marks: "" });

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const save = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.subject.trim() || !form.date.trim() || !form.time.trim() || !form.marks.trim()) return;
    const nextExams = [...exams];
    if (existing) nextExams[editIndex] = form;
    else nextExams.push(form);
    teacherStore.write("teacherExams", nextExams);
    navigate("/teacher/exams");
  };

  return (
    <div className="management-page">
      <button className="back-btn" onClick={() => navigate("/teacher/exams")}><ArrowLeft size={17} /> Back to Exams</button>
      <div className="page-heading"><div><h1>{existing ? "Edit Exam" : "Create Exam"}</h1><p>Set the exam details for your students.</p></div></div>
      <form className="management-form" onSubmit={save}>
        <label>Exam Title<input name="title" value={form.title} onChange={update} placeholder="e.g. Data Science Mid Term" required /></label>
        <label>Subject<input name="subject" value={form.subject} onChange={update} placeholder="e.g. Data Science" required /></label>
        <label>Professor Name<input name="professorName" value={form.professorName || ""} onChange={update} placeholder="e.g. Prof. Ahmed" /></label>
        <label className="form-wide">Exam Questions / Instructions<textarea name="question" value={form.question || ""} onChange={update} placeholder="Add exam questions or instructions" rows="5" /></label>
        <div className="form-grid form-wide"><label>Date<input type="date" name="date" value={form.date} onChange={update} required /></label><label>Time<input type="time" name="time" value={form.time} onChange={update} required /></label></div>
        <label>Total Marks<input name="marks" value={form.marks} onChange={update} placeholder="50 Marks" required /></label>
        <div className="form-actions"><button type="button" className="secondary-btn" onClick={() => navigate("/teacher/exams")}>Cancel</button><button className="primary-btn"><Save size={17} /> Save Exam</button></div>
      </form>
    </div>
  );
}

export default CreateExam;
