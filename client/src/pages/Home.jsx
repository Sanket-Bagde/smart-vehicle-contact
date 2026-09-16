import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero-section">

        <h1>Smart Vehicle Contact QR</h1>

        <h2>Connect with a vehicle owner safely</h2>

        <p>
          Scan the QR code on a vehicle to contact the owner
          without exposing their personal phone number.
        </p>

        <div className="hero-buttons">

          {/* Add Vehicle */}
          <button
            className="primary-button"
            onClick={() => navigate("/add-vehicle")}
          >
            Add Your Vehicle
          </button>

          {/* Dashboard - shown only after login */}
          {token && (
            <button
              className="secondary-button"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </button>
          )}

        </div>

      </section>

      {/* How It Works */}
      <section className="how-section">

        <h2>How It Works</h2>

        <div className="steps-container">

          {/* Step 1 */}
          <div className="step-card">
            <div className="step-number">1</div>

            <h3>Register Your Vehicle</h3>

            <p>
              Create an account and add your vehicle
              details to the system.
            </p>
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <div className="step-number">2</div>

            <h3>Get Your QR Code</h3>

            <p>
              A unique QR code is generated for
              your vehicle.
            </p>
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <div className="step-number">3</div>

            <h3>Place the QR Code</h3>

            <p>
              Put the QR tag somewhere visible
              on your vehicle.
            </p>
          </div>

          {/* Step 4 */}
          <div className="step-card">
            <div className="step-number">4</div>

            <h3>Get Contacted</h3>

            <p>
              Someone can scan the QR code and
              contact you anonymously.
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2026 Smart Vehicle Contact QR</p>
        <p>Made in India 🇮🇳</p>
      </footer>

    </div>
  );
}

export default Home;