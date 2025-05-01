import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminpanel.css"; // Optional: for styling

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleAddPackage = () => {
    navigate("/home"); // Navigate to package creation page
  };

  return (
    <div className="admin-background">
      <div className="overlay">
        <h1>Welcome to Your Admin Panel</h1>
        <button className="create-package-button" onClick={handleAddPackage}>
           Create Package
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
