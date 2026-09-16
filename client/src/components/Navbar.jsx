import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div
          className="navbar-logo"
          onClick={() => navigate("/")}
        >
          🚗 Smart Vehicle Contact QR
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">

          {/* Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          {token ? (
            <>
              {/* Add Vehicle */}
              <NavLink
                to="/add-vehicle"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Add Vehicle
              </NavLink>

              {/* Dashboard */}
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Dashboard
              </NavLink>

              {/* Logout */}
              <button
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Login
              </NavLink>

              {/* Register */}
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "register-button active"
                    : "register-button"
                }
              >
                Register
              </NavLink>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;