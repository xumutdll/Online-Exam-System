import React, { useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";

export const Manager = () => {
  Meteor.subscribe("Manager");
  const navigate = useNavigate();

  const handleLogout = () => {
    Meteor.logout((err) => {
      !err ? navigate("/") : {};
    });
  };

  deneme = () => {
    console.log(Meteor.users.find().fetch());
  };

  return (
    <>
      <h1>Manager</h1>
      <button onClick={handleLogout} type="button">
        Logout
      </button>
      <button onClick={deneme}>deneme</button>
    </>
  );
};
