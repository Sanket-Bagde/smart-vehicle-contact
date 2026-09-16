const express = require("express");
const { getDB } = require("../db");

const router = express.Router();

// POST - Send anonymous message
router.post("/", async (req, res) => {
  try {
    const { vehicleId, message } = req.body;

    if (!vehicleId || !message) {
      return res.status(400).json({
        message: "Vehicle ID and message are required",
      });
    }

    const newMessage = {
      vehicleId,
      message,
      createdAt: new Date(),
    };

    const db = getDB();

    const result = await db
      .collection("messages")
      .insertOne(newMessage);

    console.log("Message saved:", result.insertedId);

    res.status(201).json({
      message: "Message sent successfully",
      messageId: result.insertedId,
    });

  } catch (error) {
    console.error("Error saving message:", error);

    res.status(500).json({
      message: "Failed to send message",
    });
  }
});
// GET - Get messages for a vehicle
router.get("/:vehicleId", async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const db = getDB();

    const messages = await db
      .collection("messages")
      .find({ vehicleId: vehicleId })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(messages);

  } catch (error) {
    console.error("Error fetching messages:", error);

    res.status(500).json({
      message: "Failed to fetch messages",
    });
  }
});
module.exports = router;