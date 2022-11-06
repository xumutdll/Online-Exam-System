import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import "./css/FormCreateQuestion.css";
import { nanoid } from "nanoid";
import moment from "moment";

export const FormCreateQuestion = ({ teacherId, theQuestion }) => {
  const [prev, setPrev] = useState(() => {
    return { active: null, index: "" };
  });
  const [question, setQuestion] = useState({
    problem: "",
    options: [],
    point: "",
    teacherId: teacherId,
    creator: {
      name: `${Meteor.user() && Meteor.user().profile.firstName} ${
        Meteor.user() && Meteor.user().profile.lastName
      }`,
      _id: Meteor.user() && Meteor.userId(),
    },
    createdAt: moment()._d,
  });

  const [anOption, setAnOption] = useState(() => {
    return {
      _id: nanoid(),
      value: "",
      isTrue: false,
    };
  });

  const [optionFormFlag, setOptionFormFlag] = useState(() => false);

  useEffect(() => {
    !!theQuestion && setQuestion(theQuestion);
  }, []);

  const saveTheOption = () => {
    setQuestion({ ...question, options: [...question.options, anOption] });
    setAnOption({ _id: nanoid(), value: "", isTrue: false });
    setOptionFormFlag(false);
  };

  const handleOption = (e, index) => {
    if (!prev.active) {
      !!theQuestion && question.options.forEach((e) => (e.isTrue = false));

      setPrev({ active: e.currentTarget, index: index });
      e.currentTarget.classList.add("chosen");
      question.options[index].isTrue = true;
    } else {
      question.options[prev.index].isTrue = false;
      question.options[index].isTrue = true;
      prev.active.classList.remove("chosen");
      setPrev({ active: e.currentTarget, index: index });
      e.currentTarget.classList.add("chosen");
    }
  };

  const handleSubmit = () => {
    if (!!theQuestion) {
      if (prev.index === "") {
        alert("Please mark an option as correct.");
      } else {
        Meteor.call("questions.update", question, (err, res) => {
          if (res === "Question is succesfully updated!") {
            // setPrev({ active: null, index: "" });
            // setQuestion({
            //   problem: "",
            //   options: [],
            //   point: "",
            //   teacherId: teacherId,
            //   creator: {
            //     name: `${Meteor.user() && Meteor.user().profile.firstName} ${
            //       Meteor.user() && Meteor.user().profile.lastName
            //     }`,
            //     _id: Meteor.user() && Meteor.userId(),
            //   },
            // });
            alert(res);
          }
        });
      }
    } else {
      if (prev.index === "") {
        alert("Please mark an option as correct.");
      } else {
        Meteor.call("questions.insert", question, (err, res) => {
          if (res === "Question is successfully inserted!") {
            setPrev({ active: null, index: "" });
            setQuestion({
              problem: "",
              options: [],
              point: "",
              teacherId: teacherId,
              creator: {
                name: `${Meteor.user() && Meteor.user().profile.firstName} ${
                  Meteor.user() && Meteor.user().profile.lastName
                }`,
                _id: Meteor.user() && Meteor.userId(),
              },
            });
            alert(res);
          }
        });
      }
    }
  };

  return (
    <div className="create-question-form">
      <h3>Question Text:</h3>
      <div className="question-head">
        {console.log("test")}
        <textarea
          type="text"
          className="problem"
          value={question.problem}
          onChange={(e) =>
            setQuestion({ ...question, problem: e.target.value })
          }
        ></textarea>
        <div>
          <div className="add-picture">Add a picture</div>
        </div>
      </div>
      <div className="options">
        {question.options.map((option, index) => {
          return (
            <div
              key={option._id}
              className="option"
              onClick={(e) => handleOption(e, index)}
            >
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
              <p>{option.value}</p>
            </div>
          );
        })}

        {optionFormFlag && (
          <div className="mini-option-form">
            <input
              type="text"
              value={anOption.value}
              onChange={(e) =>
                setAnOption({ ...anOption, value: e.target.value })
              }
            ></input>
            <button onClick={saveTheOption}>Save</button>
          </div>
        )}
        {question.options.length === 5 ? (
          <button disabled>Maximum number of options!</button>
        ) : (
          <button onClick={() => setOptionFormFlag(true)}>
            Add an option!
          </button>
        )}
      </div>
      <div className="filler"></div>
      <div className="end">
        <div className="save">
          <div className="point">
            <h4>Points:</h4>
            <input
              type="text"
              value={question.point}
              onChange={(e) =>
                setQuestion({ ...question, point: e.target.value })
              }
            ></input>
          </div>
          {question.options < 3 ||
          question.problem === "" ||
          question.point === "" ||
          isNaN(question.point) ? (
            <button disabled> Save </button>
          ) : (
            <button onClick={handleSubmit}> Save </button>
          )}
        </div>
      </div>
    </div>
  );
};
