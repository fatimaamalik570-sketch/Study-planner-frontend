function ScheduleCard({ time, title, type, color }) {
  return (
    <div className="schedule-item">

      <div className="schedule-time">
        {time}
      </div>

      <div
        className="schedule-dot"
        style={{ background: color }}
      />

      <div className="schedule-info">
        <strong>{title}</strong>
        <span>{type}</span>
      </div>

    </div>
  );
}

export default ScheduleCard;