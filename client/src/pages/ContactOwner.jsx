import { useNavigate, useParams } from "react-router-dom";
import "./ContactOwner.css";

function ContactOwner() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="contact-page">

      <div className="contact-card">

        <div className="contact-icon">
          💬
        </div>

        <p className="contact-label">
          CONTACT VEHICLE OWNER
        </p>

        <h1>Need to contact the owner?</h1>

        <p className="contact-description">
          You can send an anonymous message to the
          vehicle owner without revealing your identity.
        </p>

        <div className="privacy-box">
          <span className="privacy-icon">🔒</span>

          <div>
            <strong>Your identity stays private</strong>

            <p>
              No phone number or personal information
              is shared with the vehicle owner.
            </p>
          </div>
        </div>

        <button
          className="chat-button"
          onClick={() => navigate(`/vehicle/${id}/chat`)}
        >
          💬 Send Anonymous Message
        </button>

        <button
          className="back-button"
          onClick={() => navigate(`/vehicle/${id}`)}
        >
          ← Back to Vehicle
        </button>

      </div>

    </div>
  );
}

export default ContactOwner;