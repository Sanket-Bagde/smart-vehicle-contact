import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

    if (response.ok) {
    setMessage("Login successful ✅");

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    console.log("Login successful");
    } else {
        setMessage(data.message);
      }

    } catch (error) {
      console.error("Login error:", error);
      setMessage("Unable to connect to server");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <div>
          <label>Email</label>
          <br />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Login
        </button>

      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;