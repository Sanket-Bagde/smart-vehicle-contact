const express = require("express");
const { getDB } = require("../db");
const { ObjectId } = require("mongodb");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ===============================
// POST - Add a new vehicle
// ===============================
router.post("/", authMiddleware, async (req, res) => {

  try {
    const { owner, brand, model, number } = req.body;
    const vehicle = {
      owner,
      brand,
      model,
      number,
      userId: req.user.id,
      createdAt: new Date(),
    };

    const db = getDB();

    const result = await db
      .collection("vehicles")
      .insertOne(vehicle);

    console.log("Vehicle saved:", result.insertedId);

    res.status(201).json({
      message: "Vehicle added successfully",
      vehicleId: result.insertedId,
      vehicle: vehicle,
    });

  } catch (error) {
    console.error("Error saving vehicle:", error);

    res.status(500).json({
      message: "Failed to save vehicle",
    });
  }
});


// ===============================
// GET - Get all vehicles
// ===============================
router.get("/", authMiddleware, async (req, res) => {
  try {

    const db = getDB();

  const vehicles = await db
    .collection("vehicles")
    .find({ userId: req.user.id })
    .toArray();

    res.json(vehicles);

  } catch (error) {
    console.error("Error fetching vehicles:", error);

    res.status(500).json({
      message: "Failed to fetch vehicles",
    });
  }
});


// ===============================
// GET - Get one vehicle by ID
// ===============================
router.get("/:id", async (req, res) => {

  try {
    const db = getDB();

    const vehicle = await db
      .collection("vehicles")
      .findOne({
        _id: new ObjectId(req.params.id),
      });

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    res.json(vehicle);

  } catch (error) {
    console.error("Error fetching vehicle:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


module.exports = router;