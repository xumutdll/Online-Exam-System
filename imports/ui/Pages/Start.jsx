import React from "react";
import "../../css/Start";
import { NavLink, Outlet } from "react-router-dom";

export const Start = () => {
  return (
    <div className="login">
      <div className="navlinks">
        <NavLink end to="/start">
          Login
        </NavLink>
        <NavLink to="/start/register">Register</NavLink>
      </div>
      <Outlet />
      <button onClick={() => Meteor.logout()} type="button">
        Logout
      </button>
    </div>
  );
};
