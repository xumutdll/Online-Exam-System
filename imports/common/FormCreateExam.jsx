import React, { useState, useEffect } from "react";
import "./css/FormCreateExam.css";
import moment from "moment";

import DateTimePicker from "react-datetime-picker";

export const FormCreateExam = ({ teacherId, theExam }) => {
  const [exam, setExam] = useState(() => {
    return {
      name: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      duration: "",
      status: "pending",
      questions: [],
      teacherId: teacherId,
      students: [],
      numberOfStudents: 0,
      createdAt: moment()._d,
    };
  });

  const handleSave = () => {
    if (!!theExam) {
      Meteor.call("exams.update", exam, (err, res) => {
        if (res === "Exam has successfully inserted!") {
          setExam({
            name: "",
            description: "",
            startDate: new Date(),
            endDate: new Date(),
            duration: "",
            status: "pending",
            questions: [],
            teacherId: teacherId,
            students: [],
            numberOfStudents: 0,
            createdAt: moment()._d,
          });
        }
        alert(res);
      });
    } else {
      Meteor.call("exams.insert", exam, (err, res) => {
        if (res === "Exam has successfully inserted!") {
          setExam({
            name: "",
            description: "",
            startDate: new Date(),
            endDate: new Date(),
            duration: "",
            status: "pending",
            questions: [],
            teacherId: teacherId,
            students: [],
            numberOfStudents: 0,
            createdAt: moment()._d,
          });
        }
        alert(res);
      });
    }
  };

  useEffect(() => {
    !!theExam && setExam(theExam);
  }, []);

  return (
    <div className="create-exam-form">
      <label htmlFor="examName">Exam Name:</label>
      <input
        type="text"
        name="examName"
        value={exam.name}
        onChange={(e) => setExam({ ...exam, name: e.target.value })}
      />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        name="description"
        value={exam.description}
        onChange={(e) => setExam({ ...exam, description: e.target.value })}
      />
      <label htmlFor="startDate">Start Date:</label>
      <div className="date-time-picker-wrapper">
        <DateTimePicker
          onChange={(e) => setExam({ ...exam, startDate: e })}
          value={exam.startDate}
          minDate={new Date()}
        />
      </div>
      <label htmlFor="endDate">End Date:</label>
      <div className="date-time-picker-wrapper">
        <DateTimePicker
          onChange={(e) => setExam({ ...exam, endDate: e })}
          value={exam.endDate}
          minDate={new Date()}
        />
      </div>
      <div className="duration">
        <label htmlFor="duration">Duration (minutes): </label>
        <input
          type="number"
          value={exam.duration}
          onChange={(e) => setExam({ ...exam, duration: e.target.value })}
        />
      </div>
      <div className="filler"></div>
      {exam.name === "" ||
      exam.description === "" ||
      exam.endDate.getTime() === new Date().getTime() ||
      exam.startDate.getTime() === exam.endDate.getTime() ||
      exam.duration === "" ||
      exam.duration == 0 ? (
        <button disabled> Save </button>
      ) : (
        <button onClick={handleSave}> Save </button>
      )}
    </div>
  );
};
