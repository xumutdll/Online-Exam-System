import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import { Login } from "./Login.jsx";
5;
import { Register } from "./Register.jsx";

export const App = () => (
  <div className="main">
    <div className="login">
      <div className="buttons">
        <Link to="/">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  </div>
);
