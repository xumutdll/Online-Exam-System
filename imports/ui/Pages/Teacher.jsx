import React from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";

export const Teacher = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Meteor.logout();
    navigate("/start");
  };
  return (
    <>
      <h1>Teacher</h1>
      <button onClick={handleLogout} type="button">
        Logout
      </button>
    </>
  );
};
