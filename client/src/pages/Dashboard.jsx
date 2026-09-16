import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./Dashboard.css";

function Dashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    fetch("http://localhost:5000/api/vehicles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setVehicles(data);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
      });
  }, []);

  const loadMessages = async (vehicleId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/${vehicleId}`
      );

      const data = await response.json();

      setMessages((previous) => ({
        ...previous,
        [vehicleId]: data,
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="dashboard-header">
        <h1>My Vehicles</h1>

        <p>
          Manage your vehicles and QR contact codes
        </p>
      </div>

      {/* Empty State */}
      {vehicles.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🚗</div>

          <h2>No vehicles found</h2>

          <p>
            Add your first vehicle to generate
            a unique QR code.
          </p>
        </div>
      ) : (
        <div className="vehicles-container">

          {vehicles.map((vehicle) => (
            <div
              className="vehicle-card"
              key={vehicle._id}
            >

              {/* Vehicle Information */}
              <div className="vehicle-info">

                <h2>
                  {vehicle.brand} {vehicle.model}
                </h2>

                <p>
                  <strong>Owner:</strong>{" "}
                  {vehicle.owner}
                </p>

                <p>
                  <strong>Vehicle Number:</strong>{" "}
                  {vehicle.number}
                </p>

                <button
                  className="view-button"
                  onClick={() =>
                    window.location.href =
                      `/vehicle/${vehicle._id}`
                  }
                >
                  View Vehicle
                </button>

              </div>

              {/* QR Section */}
              <div className="qr-section">

                <h3>Your Vehicle QR</h3>

                <div className="qr-box">
                  <QRCodeCanvas
                    value={`http://localhost:5173/vehicle/${vehicle._id}`}
                    size={200}
                  />
                </div>

                <p className="qr-help">
                  Scan this QR code to view vehicle
                  information.
                </p>

              </div>

              {/* Messages */}
              <div className="messages-section">

                <button
                  className="messages-button"
                  onClick={() =>
                    loadMessages(vehicle._id)
                  }
                >
                  💬 View Messages
                </button>

                {messages[vehicle._id] && (
                  <div className="messages-container">

                    <h3>
                      Anonymous Messages
                    </h3>

                    {messages[vehicle._id].length ===
                    0 ? (
                      <p className="no-messages">
                        No messages yet.
                      </p>
                    ) : (
                      messages[vehicle._id].map(
                        (msg) => (
                          <div
                            className="dashboard-message"
                            key={msg._id}
                          >
                            <p>
                              {msg.message}
                            </p>

                            <small>
                              {new Date(
                                msg.createdAt
                              ).toLocaleString()}
                            </small>
                          </div>
                        )
                      )
                    )}

                  </div>
                )}

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Dashboard;