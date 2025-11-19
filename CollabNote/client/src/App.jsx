import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./page/Register";
import Login from "./page/Login";

function App() {
  return (
    <Router>
      <nav>
        {/* Navigation Links */}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link>
      </nav>

      {/* Route Setup */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;


