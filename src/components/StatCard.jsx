function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  type = "blue",
}) {
  return (
    <div className="stat-card">

      <div className={`stat-icon ${type}`}>
        <Icon size={23} />
      </div>

      <div className="stat-content">
        <span>{title}</span>
        <h3>{value}</h3>
        <small>{subtitle}</small>
      </div>

    </div>
  );
}

export default StatCard;