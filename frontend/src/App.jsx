import React, { useState } from "react";
import UserForm from "./components/UserForm";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [view, setView] = useState("user"); // "user", "admin", or "dashboard"
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setView("dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-200 flex flex-col items-center justify-center p-6">
      <div className="mb-6">
        <button
          onClick={() => setView("user")}
          className={`px-6 py-2 font-bold rounded-lg ${
            view === "user"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
          }`}
        >
          User
        </button>
        <button
          onClick={() => setView("admin")}
          className={`ml-4 px-6 py-2 font-bold rounded-lg ${
            view === "admin"
              ? "bg-green-600 text-white"
              : "bg-gray-300 text-gray-800 hover:bg-gray-400"
          }`}
        >
          Admin
        </button>
      </div>

      {view === "user" && <UserForm />}
      {view === "admin" && (
        <AdminLogin onLoginSuccess={handleAdminLoginSuccess} />
      )}
      {view === "dashboard" && isAdminLoggedIn && <AdminDashboard />}
    </div>
  );
}

export default App;
