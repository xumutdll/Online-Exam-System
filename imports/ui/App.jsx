import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import { Login } from "./Login.jsx";
import { Register } from "./Register.jsx";
import { NotFound } from "./NotFound.jsx";

export const App = () => (
  <div className="main">
    <div className="login">
      <div className="navlinks">
        <NavLink end to="/">
          Login
        </NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  </div>
);
