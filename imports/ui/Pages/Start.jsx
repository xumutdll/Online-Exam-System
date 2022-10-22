import React from "react";
import "../../css/Start";
import { NavLink, Outlet } from "react-router-dom";

export const Start = () => {
  return (
    <div className="login">
      <div className="navlinks">
        <NavLink end to="/">
          Login
        </NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
      <Outlet />
    </div>
  );
};
