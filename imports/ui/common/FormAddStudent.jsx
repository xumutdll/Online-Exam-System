import React, { useState, useEffect } from "react";
import "./css/FormAddStudent.css";

import { SearchBar } from "./SearchBar";
import { QueryNotFound } from "./QueryNotFound";
import { useTracker } from "meteor/react-meteor-data";

export const FormAddStudent = ({ exam }) => {
  const userList = useTracker(() => {
    return Meteor.users.find({ "profile.role": "Student" }).fetch();
  });
  const list = userList.filter((user) => user.profile.role === "Student");
  const [searchQuery, setSearchQuery] = useState(() => "");
  const [theExam, setTheExam] = useState(() => exam);
  const [studentList, setStudentList] = useState(() => list);

  useEffect(() => {
    let added = [];
    theExam.students.forEach((id) => {
      list.forEach((student, index) => {
        if (student._id === id) {
          added.push(student);
          studentList.splice(index, 1);
        }
      });
    });

    // theExam.students = added;
    setTheExam({ ...theExam, students: added });
  }, []);

  const handleIn = (id) => {
    setStudentList(studentList.filter((student) => student._id !== id));

    let chosen = studentList.filter((student) => {
      return student._id === id;
    });
    console.log(chosen);
    // theExam.students.push(...chosen);
    setTheExam({ ...theExam, students: [...theExam.students, ...chosen] });
  };

  const handleOut = (id) => {
    let chosen = theExam.students.filter((student) => student._id === id);
    studentList.push(...chosen);

    let removed = theExam.students.filter((student) => student._id !== id);
    setTheExam({ ...theExam, students: removed });
  };
  useEffect(() => {
    Meteor.call("exams.updateStudents", theExam);
  }, [theExam]);

  return (
    <div className="add-student-form">
      <ul className="all-students">
        <h3>All Students</h3>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {studentList.length === 0 ? (
          <QueryNotFound />
        ) : (
          studentList.map((student) => {
            return (
              <li onClick={() => handleIn(student._id)} key={student._id}>
                {student.profile.firstName} {student.profile.lastName}
              </li>
            );
          })
        )}
      </ul>
      <ul className="added-students">
        <h3>Added Students</h3>
        {theExam.students.length > 0 &&
          typeof theExam.students[0] === "object" &&
          theExam.students.map((student) => {
            return (
              <li onClick={() => handleOut(student._id)} key={student._id}>
                {student.profile.firstName} {student.profile.lastName}
              </li>
            );
          })}
      </ul>
    </div>
  );
};
