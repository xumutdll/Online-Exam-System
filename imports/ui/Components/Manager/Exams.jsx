import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { UserList } from "../../../Common/UserList";
import { ModalContainer } from "../../../Common/ModalContainer";
import { FormCreateQuestion } from "../../../Common/FormCreateQuestion";
import { FormCreateExam } from "../../../Common/FormCreateExam";
import { Questions } from "../../../api/Collections";

export const Exams = () => {
  const [teacherId, setTeacherId] = useState(() => null);
  const [targetId, setTargetId] = useState(() => "");

  useEffect(() => {
    Meteor.subscribe("Questions", teacherId);
  }, [teacherId]);

  useEffect(() => {
    Meteor.subscribe("Manager");
    Meteor.subscribe("Questions");
  }, []);

  const userList = useTracker(() => {
    return Meteor.users.find({ "profile.role": "Teacher" }).fetch();
  });
  const questionList = useTracker(() => {
    return Questions.find({ teacherId: teacherId }).fetch();
  });

  // const handleChange = (id) => {
  //   setTeacherId(id);
  // };
  const handleDelete = (id) => {
    Meteor.call("questions.delete", id);
  };

  return (
    <div className="exams">
      <UserList userList={userList} handleChange={(id) => setTeacherId(id)} />
      {!!teacherId && (
        <>
          <div className="the-exams">
            <ModalContainer content={<FormCreateExam />} />
          </div>

          <div className="the-questions">
            <ModalContainer
              content={<FormCreateQuestion teacherId={teacherId} />}
            />
            {questionList.map((question) => {
              return (
                <div
                  key={question._id}
                  className="a-question"
                  onMouseEnter={() => setTargetId(question._id)}
                  onMouseLeave={() => setTargetId("")}
                >
                  <div className="expression">
                    {question.problem.substr(
                      0,
                      Math.min(120, question.problem.lastIndexOf(" "))
                    )}
                    {question.problem.length > 120 && "..."}
                    <button onClick={() => handleDelete(question._id)}>
                      X
                    </button>
                  </div>
                  {targetId === question._id && (
                    <div className="pool">
                      {question.options.map((option, index) => {
                        return (
                          <div className="an-option">
                            <h3>
                              {index === 0
                                ? "A"
                                : index === 1
                                ? "B"
                                : index === 2
                                ? "C"
                                : index === 3
                                ? "D"
                                : "E"}
                            </h3>
                            {option.value.substr(0, 60)}
                            {option.value.length > 60 && "..."}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
