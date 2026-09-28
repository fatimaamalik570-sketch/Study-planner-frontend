import { useEffect, useState } from "react";
import { Timer, Play, Pause, RotateCcw, BookOpen, Save } from "lucide-react";
import { readStudentSubjects, studentStore } from "../../services/studentStore";

function StudySessions() {
  const availableSubjects = readStudentSubjects();
  const [topic, setTopic] = useState(availableSubjects[0]?.name || "Mathematics");
  const [duration, setDuration] = useState(25);
  const [customDuration, setCustomDuration] = useState(30);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [sessions, setSessions] = useState(() => studentStore.read("studentStudySessions", []));

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return undefined;
    const timer = window.setInterval(() => {
      setSecondsLeft((seconds) => {
        if (seconds <= 1) {
          setIsRunning(false);
          setHasCompleted(true);
          return 0;
        }

        return seconds - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isRunning, secondsLeft]);

  const chooseDuration = (minutes) => {
    setDuration(minutes);
    setSecondsLeft(minutes * 60);
    setHasCompleted(false);
    setIsRunning(false);
  };

  const resetTimer = () => chooseDuration(duration);

  const saveSession = () => {
    const nextSessions = [{ topic, minutes: duration, date: new Date().toLocaleDateString() }, ...sessions];
    setSessions(nextSessions);
    studentStore.write("studentStudySessions", nextSessions);
    setHasCompleted(false);
    resetTimer();
  };

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div>

      <div className="page-heading">
        <div>
          <h1>Study Sessions</h1>
          <p>Focus, learn and improve your study habits.</p>
        </div>
      </div>

      <div className="focus-card">

        <div className="focus-icon">
          <Timer size={35} />
        </div>

        <h2>Ready to Focus?</h2>

        <p>
          Start a focused study session and make the most
          of your time.
        </p>

        <div className="session-controls">
          <label>Select Study Topic<select value={topic} onChange={(event) => setTopic(event.target.value)}>{availableSubjects.map((subject) => <option key={subject.id || subject.name} value={subject.name}>{subject.name}</option>)}</select></label>
          <div className="duration-picker"><span>Choose Duration</span><div><button className={duration === 25 ? "selected" : ""} onClick={() => chooseDuration(25)}>25 min</button><button className={duration === 45 ? "selected" : ""} onClick={() => chooseDuration(45)}>45 min</button><button className={duration === 60 ? "selected" : ""} onClick={() => chooseDuration(60)}>60 min</button><input type="number" min="1" value={customDuration} onChange={(event) => setCustomDuration(event.target.value)} /><button onClick={() => chooseDuration(Number(customDuration) || 1)}>Custom</button></div></div>
        </div>

        <div className="timer">
          {minutes}:{seconds}
        </div>

        <button className="primary-btn focus-btn" onClick={() => setIsRunning((running) => !running)} disabled={hasCompleted}>
          {isRunning ? <Pause size={18} /> : <Play size={18} />}
          {isRunning ? "Pause Session" : "Start Session"}
        </button>

        <div className="session-actions"><button type="button" className="secondary-btn restart-btn" onClick={resetTimer}><RotateCcw size={16} /> Restart</button>{hasCompleted && <button className="primary-btn" onClick={saveSession}><Save size={16} /> Save Study Session</button>}</div>

      </div>

      <div className="content-card">

        <h2 className="section-title">
          Recent Sessions
        </h2>

        {sessions.map((session, index) => <div className="recent-session" key={`${session.topic}-${session.date}-${index}`}><BookOpen size={20} /><div><strong>{session.topic}</strong><span>{session.minutes} minutes</span></div><small>{session.date}</small></div>)}

      </div>

    </div>
  );
}

export default StudySessions;