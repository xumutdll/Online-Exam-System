import React, { useState } from "react";
import "./css/FormCreateExam.css";
import moment from "moment";

import DurationPicker from "react-duration-picker";
import DateTimePicker from "react-datetime-picker";

export const FormCreateExam = ({ teacherId }) => {
  const [exam, setExam] = useState(() => {
    return {
      examName: "",
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

  const handleSave = () => {};
  const handleChange = () => {
    console.log("object");
  };

  return (
    <div className="create-exam-form">
      <label htmlFor="examName">Exam Name:</label>
      <input
        type="text"
        name="examName"
        value={exam.examName}
        onChange={(e) => setExam({ ...exam, examName: e.target.value })}
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
        {/* <DateTimePicker
          onChange={setExam}
          value={exam.startDate}
          minDate={new Date()}
        /> */}
      </div>
      <label htmlFor="endDate">End Date:</label>
      <div className="date-time-picker-wrapper">
        {/* <DateTimePicker
          onChange={setExam}
          value={exam.endDate}
          minDate={new Date()}
        /> */}
      </div>
      <label htmlFor="duration">Duration:</label>
      {/* <DurationPicker
        onChange={onChange}
        initialDuration={{ hours: 1, minutes: 2, seconds: 3 }}
      /> */}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};
