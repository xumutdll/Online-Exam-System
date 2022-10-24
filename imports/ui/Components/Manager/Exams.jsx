import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

export const Exams = () => {
  const [prevActive, setPrevActive] = useState(() => null);
  const [teacherId, setTeacherId] = useState(() => null);
  const food = document.createElement("div");

  useEffect(() => {
    Meteor.subscribe("Teacher");
    //subscribe on deployment
    console.log("first");
  }, []);

  const userList = useTracker(() => {
    return Meteor.users.find().fetch();
  });

  const handleClick = (e, id) => {
    if (!prevActive) {
      setPrevActive(e.currentTarget);
      e.currentTarget.className += "chosen";
      handleChange(id);
    } else {
      // when you cahse the current user
      setPrevActive(prevActive.classList.remove("chosen"));
      setPrevActive(e.currentTarget);
      e.currentTarget.classList.add("chosen");
      handleChange(id);
    }
  };

  const createQuestion = () => {};

  const handleChange = (id) => {};

  return (
    <div className="exams">
      <ul>
        {userList.map((user) => {
          return (
            <li onClick={(e) => handleClick(e, user._id)} key={user._id}>
              {user.profile.firstName} {user.profile.lastName}
              {" : "}
              {user.profile.role}
            </li>
          );
        })}
      </ul>
      <div className="the-exams"></div>
      <div className="the-questions">
        <div className="a-question">
          <div className="expression"></div>
          <div className="pool">
            <button onClick={createQuestion}>Create a new question.</button>
          </div>
        </div>
      </div>
    </div>
  );
};
