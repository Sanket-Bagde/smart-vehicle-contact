require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectDB } = require("./db");
const vehicleRoutes = require("./routes/vehicleRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/messages", messageRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Smart Vehicle Contact API is running");
});


// Start server
const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();