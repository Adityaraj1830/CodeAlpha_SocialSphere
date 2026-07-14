import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "#2563eb",
        color: "#fff",
      }}
    >
      <Link
        to="/"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        SocialSphere
      </Link>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {user ? (
          <>
            <Link
              to="/"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Home
            </Link>

            <Link
              to="/create-post"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Create Post
            </Link>

            <Link
              to={`/profile/${user._id}`}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              style={{
                padding: "8px 15px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                background: "#fff",
                color: "#2563eb",
                fontWeight: "bold",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;