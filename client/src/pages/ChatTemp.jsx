import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Chat.css";

function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const loadMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/${id}`
      );

      const data = await response.json();

      if (response.ok) {
        setMessages(data);
      } else {
        setError(data.message || "Failed to load messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError("Unable to connect to server");
    }
  };

  useEffect(() => {
    loadMessages();
  }, [id]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    setError("");
    setSent(false);

    try {
      const response = await fetch(
        "http://localhost:5000/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vehicleId: id,
            message: message.trim(),
          }),
        }
      );

      const data = await response.json();

      console.log("Send message response:", data);

      if (response.ok) {
        setMessage("");
        setSent(true);
        await loadMessages();
      } else {
        setError(
          data.message || "Failed to send message"
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Unable to connect to server");
    }
  };

  return (
    <div className="chat-page">

      <div className="chat-container">

        {/* Header */}
        <div className="chat-header">

          <div className="chat-icon">
            💬
          </div>

          <h1>Anonymous Chat</h1>

          <p>
            Contact the vehicle owner without
            revealing your identity.
          </p>

        </div>

        {/* Privacy Notice */}
        <div className="chat-privacy">
          🔒 Your identity remains private
        </div>

        {/* Messages */}
        <div className="messages-container">

          {messages.length === 0 ? (
            <div className="no-messages">

              <div className="no-messages-icon">
                💬
              </div>

              <p>No messages yet.</p>

              <span>
                Send a message to contact the owner.
              </span>

            </div>
          ) : (
            messages.map((msg) => (
              <div
                className="message-bubble"
                key={msg._id}
              >
                <p>{msg.message}</p>

                <small>
                  {new Date(
                    msg.createdAt
                  ).toLocaleString()}
                </small>
              </div>
            ))
          )}

        </div>

        {/* Message Form */}
        <form
          onSubmit={sendMessage}
          className="message-form"
        >

          <textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            rows="4"
          />

          <button type="submit">
            Send Message
          </button>

        </form>

        {/* Status */}
        {sent && (
          <p className="success-message">
            Message sent successfully ✅
          </p>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {/* Back */}
        <button
          className="chat-back-button"
          onClick={() =>
            navigate(`/vehicle/${id}/contact`)
          }
        >
          ← Back to Contact Page
        </button>

      </div>

    </div>
  );
}

export default Chat;