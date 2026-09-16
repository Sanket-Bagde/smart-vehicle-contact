import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddVehicle from "./pages/AddVehicle";
import Dashboard from "./pages/Dashboard";
import Vehicle from "./pages/Vehicle";
import ContactOwner from "./pages/ContactOwner";
import Chat from "./pages/ChatTemp";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/vehicle/:id" element={<Vehicle />} />
        <Route path="/vehicle/:id/contact" element={<ContactOwner />} />
        <Route path="/vehicle/:id/chat" element={<Chat />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;