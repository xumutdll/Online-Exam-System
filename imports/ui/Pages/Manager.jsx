import React from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";

export const Manager = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Meteor.logout();
    navigate("/start");
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
