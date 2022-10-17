import React, { useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";

export const Manager = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Meteor.logout((err) => {
      !err ? navigate("/") : {};
    });
  };

  return (
    <>
      <h1>Manager</h1>
      <button onClick={handleLogout} type="button">
        Logout
      </button>
    </>
  );
};
