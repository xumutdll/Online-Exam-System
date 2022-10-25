import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { UserList } from "../../../common/UserList";
import { ModalContainer } from "../../../common/ModalContainer";
import { FormCreateQuestion } from "../../../common/FormCreateQuestion";
import { FormCreateExam } from "../../../common/FormCreateExam";

export const Exams = () => {
  const [teacherId, setTeacherId] = useState(() => null);
  const food = document.createElement("div");

  useEffect(() => {
    Meteor.subscribe("Manager");
  }, []);

  const userList = useTracker(() => {
    return Meteor.users.find({ "profile.role": "Teacher" }).fetch();
  });

  const createQuestion = () => {};

  const handleChange = (id) => {};

  return (
    <div className="exams">
      <UserList userList={userList} handleChange={(id) => handleChange(id)} />
      <div className="the-exams">
        <ModalContainer content={<FormCreateExam />} />
      </div>
      <div className="the-questions">
        <ModalContainer content={<FormCreateQuestion />} />
        <div className="a-question">
          <div className="expression"></div>
          <div className="pool"></div>
        </div>
      </div>
    </div>
  );
};
