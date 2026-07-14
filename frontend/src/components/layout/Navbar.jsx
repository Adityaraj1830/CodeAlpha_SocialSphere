import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 40px",
        background: "#2563eb",
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          textDecoration: "none",
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
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none" }}
        >
          Home
        </Link>

        {user ? (
          <>
            <Link
              to={`/profile/${user._id}`}
              style={{ color: "white", textDecoration: "none" }}
            >
              {user.username}
            </Link>

            <Link
              to="/create-post"
              style={{ color: "white", textDecoration: "none" }}
            >
              Create Post
            </Link>

            <button
              onClick={logout}
              style={{
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{ color: "white", textDecoration: "none" }}
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