import React from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";

export const Student = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Meteor.logout((err) => {
      !err ? navigate("/") : {};
    });
  };
  return (
    <>
      <h1>Student</h1>
      <button onClick={handleLogout} type="button">
        Logout
      </button>
    </>
  );
};
