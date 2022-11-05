import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { UserList } from "/imports/common/UserList";
import { ModalContainer } from "../../../common/ModalContainer";
import { FormCreateQuestion } from "../../../common/FormCreateQuestion";
import { FormCreateExam } from "../../../common/FormCreateExam";
import { QuestionsList } from "../../../api/Collections";
import { ExamsList } from "../../../api/Collections";

// import "react-responsive-modal/styles.css";
// import { Modal } from "react-responsive-modal";

export const Exams = () => {
  const [teacherId, setTeacherId] = useState(() => null);
  const [targetId, setTargetId] = useState(() => "");

  // const [open, setOpen] = useState(false);

  useEffect(() => {
    Meteor.subscribe("Questions", teacherId);
    Meteor.subscribe("Exams", teacherId);
  }, [teacherId]);

  useEffect(() => {
    Meteor.subscribe("Manager");
  }, []);

  const userList = useTracker(() => {
    return Meteor.users.find({ "profile.role": "Teacher" }).fetch();
  });
  const questionList = useTracker(() => {
    return QuestionsList.find({ teacherId: teacherId }).fetch();
  });
  const examList = useTracker(() => {
    return ExamsList.find({ teacherId: teacherId }).fetch();
  });

  const handleDelete = (QuestionId) => {
    Meteor.call("questions.delete", QuestionId, (err, res) => {
      alert(res);
    });
  };

  return (
    <div className="exams">
      <UserList userList={userList} handleChange={(id) => setTeacherId(id)} />
      {!!teacherId && (
        <>
          <div className="the-exams">
            <ModalContainer
              content={<FormCreateExam teacherId={teacherId} />}
            />
            {examList.map((exam) => {
              return exam.name;
            })}
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
                    {targetId === question._id ? (
                      question.problem
                    ) : (
                      <>
                        {question.problem.substr(
                          0,
                          Math.min(120, question.problem.lastIndexOf(" "))
                        )}
                        {question.problem.length > 120 && "..."}
                      </>
                    )}
                    <div className="buttons">
                      <ModalContainer
                        content={
                          <FormCreateQuestion
                            teacherId={teacherId}
                            theQuestion={questionList.find(
                              (obj) => obj._id === question._id
                            )}
                          />
                        }
                      />
                      <button
                        className="delete"
                        onClick={() => handleDelete(question._id)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                  {targetId === question._id && (
                    <div className="pool">
                      {question.options.map((option, index) => {
                        return (
                          <div key={option._id} className="an-option">
                            <h3
                              style={
                                option.isTrue
                                  ? { color: "red" }
                                  : { color: "black" }
                              }
                            >
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
