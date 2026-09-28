import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { defaultAssignments, teacherStore } from "../../services/teacherStore";

function CreateAssignment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editIndex = Number(searchParams.get("edit"));
  const assignments = teacherStore.read("teacherAssignments", defaultAssignments);
  const existing = Number.isInteger(editIndex) && editIndex >= 0 ? assignments[editIndex] : null;
  const [form, setForm] = useState(existing || { title: "", subject: "", professorName: "", question: "", due: "", submissions: "0 / 0" });

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const save = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.subject.trim() || !form.due.trim()) return;
    const nextAssignments = [...assignments];
    if (existing) nextAssignments[editIndex] = form;
    else nextAssignments.push(form);
    teacherStore.write("teacherAssignments", nextAssignments);
    navigate("/teacher/assignments");
  };

  return (
    <div className="management-page">
      <button className="back-btn" onClick={() => navigate("/teacher/assignments")}><ArrowLeft size={17} /> Back to Assignments</button>
      <div className="page-heading"><div><h1>{existing ? "Edit Assignment" : "Create Assignment"}</h1><p>Add assignment details for your students.</p></div></div>
      <form className="management-form" onSubmit={save}>
        <label>Assignment Title<input name="title" value={form.title} onChange={update} placeholder="e.g. React Project" required /></label>
        <label>Subject<input name="subject" value={form.subject} onChange={update} placeholder="e.g. Web Development" required /></label>
        <label>Professor Name<input name="professorName" value={form.professorName || ""} onChange={update} placeholder="e.g. Prof. Ahmed" /></label>
        <label>Assignment Question<textarea name="question" value={form.question || ""} onChange={update} placeholder="Write the question or task students must complete" rows="5" required /></label>
        <label>Due Date<input type="date" name="due" value={form.due} onChange={update} required /></label>
        <div className="form-actions"><button type="button" className="secondary-btn" onClick={() => navigate("/teacher/assignments")}>Cancel</button><button className="primary-btn"><Save size={17} /> Save Assignment</button></div>
      </form>
    </div>
  );
}

export default CreateAssignment;
