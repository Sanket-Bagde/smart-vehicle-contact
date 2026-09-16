import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Vehicle.css";

function Vehicle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/vehicles/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Vehicle not found");
        }

        return response.json();
      })
      .then((data) => {
        setVehicle(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vehicle:", error);
        setError("Vehicle not found");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="vehicle-page">
        <div className="vehicle-loading">
          <h2>Loading vehicle...</h2>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="vehicle-page">
        <div className="vehicle-error">
          <div className="vehicle-error-icon">🚗</div>

          <h2>Vehicle Not Found</h2>

          <p>
            The vehicle information could not be found.
          </p>

          <button
            className="back-button"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="vehicle-page">

      <div className="vehicle-card">

        {/* Vehicle Icon */}
        <div className="vehicle-icon">
          🚗
        </div>

        <p className="vehicle-label">
          VEHICLE INFORMATION
        </p>

        {/* Vehicle Name */}
        <h1>
          {vehicle.brand} {vehicle.model}
        </h1>

        {/* Vehicle Details */}
        <div className="vehicle-details">

          <div className="detail-item">
            <span className="detail-label">
              Owner
            </span>

            <span className="detail-value">
              {vehicle.owner}
            </span>
          </div>

          <div className="detail-item">
            <span className="detail-label">
              Vehicle Number
            </span>

            <span className="detail-value">
              {vehicle.number}
            </span>
          </div>

        </div>

        {/* Contact Information */}
        <div className="contact-info">
          <h3>Need to contact the owner?</h3>

          <p>
            Send an anonymous message without
            revealing your identity.
          </p>
        </div>

        {/* Contact Button */}
        <button
          className="contact-button"
          onClick={() =>
            navigate(`/vehicle/${id}/contact`)
          }
        >
          💬 Contact Owner
        </button>

      </div>

    </div>
  );
}

export default Vehicle;