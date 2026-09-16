
import { useState } from "react";

function AddVehicle() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [owner, setOwner] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [number, setNumber] = useState("");

  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      setMessage("Please login first.");
      return;
    }

    const vehicle = {
      owner,
      brand,
      model,
      number,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/vehicles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(vehicle),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setMessage("Vehicle added successfully ✅");

        setOwner("");
        setBrand("");
        setModel("");
        setNumber("");
      } else {
        setMessage(data.message || "Failed to add vehicle");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Unable to connect to server");
    }
  }

  return (
    <div>
      <h1>Add Your Vehicle</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Owner Name"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />

        <p></p>

        <input
          type="text"
          placeholder="Vehicle Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <p></p>

        <input
          type="text"
          placeholder="Vehicle Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />

        <p></p>

        <input
          type="text"
          placeholder="Vehicle Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />

        <p></p>

        <button type="submit">
          Add Vehicle
        </button>

        <p>{message}</p>
      </form>
    </div>
  );
}

export default AddVehicle;