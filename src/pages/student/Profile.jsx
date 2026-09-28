import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user } = useAuth();
  const name = user?.name || "User";
  const email = user?.email || "Not available";
  const role = user?.role === "teacher" ? "Teacher" : "Student";

  return (
    <div>

      <div className="page-heading">
        <div>
          <h1>My Profile</h1>
          <p>Manage your personal information.</p>
        </div>
      </div>

      <div className="profile-card">

        <div className="large-avatar">
          {name.charAt(0).toUpperCase()}
        </div>

        <h2>{name}</h2>
        <p>{role}</p>

        <div className="profile-info">
          <div>
            <span>Name</span>
            <strong>{name}</strong>
          </div>

          <div>
            <span>Email</span>
            <strong>{email}</strong>
          </div>

          <div>
            <span>Role</span>
            <strong>{role}</strong>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Profile;