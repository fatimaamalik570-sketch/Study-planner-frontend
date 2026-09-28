import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user } = useAuth();
  const name = user?.name || "Teacher User";
  const email = user?.email || "Not available";

  return (
    <div>

      <div className="page-heading">
        <div>
          <h1>Teacher Profile</h1>
          <p>Manage your profile information.</p>
        </div>
      </div>

      <div className="profile-card">

        <div className="large-avatar teacher-avatar">
          {name.charAt(0).toUpperCase()}
        </div>

        <h2>{name}</h2>
        <p>Teacher</p>

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
            <strong>Teacher</strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;