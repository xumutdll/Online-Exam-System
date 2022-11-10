import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import moment from "moment";

import { ExamsList } from "../../../api/Collections";
import { SearchBar } from "../../common/SearchBar";
import { QueryNotFound } from "../../common/QueryNotFound";

export const StudentMain = () => {
  let studentId = Meteor.userId();
  const [searchExamQuery, setSearchExamQuery] = useState(() => "");

  useEffect(() => {
    Meteor.subscribe("StudentExams", studentId);
  }, []);

  let examList = useTracker(() => {
    return ExamsList.find().fetch();
  });

  useEffect(() => {
    let myExams = [];
    examList.forEach((exam) => {
      exam.students.forEach((id) => {
        if (id === studentId) {
          myExams.push(exam);
        }
      });
    });
    examList = myExams;
  }, [examList]);

  let searchExam = examList.filter(
    (exam) =>
      exam.name.toLowerCase().includes(searchExamQuery) ||
      exam.description.toLowerCase().includes(searchExamQuery)
  );

  const handleExamClick = () => {};

  return (
    <div className="exams">
      {!!studentId && (
        <>
          <div className="the-exams">
            <SearchBar
              searchQuery={searchExamQuery}
              setSearchQuery={setSearchExamQuery}
            />
            <div className="a-exam">
              {searchExam.length === 0 ? (
                <QueryNotFound />
              ) : (
                searchExam.map((exam) => {
                  return (
                    <div
                      key={exam._id}
                      onClick={(e) => handleExamClick(e, exam)}
                      className="a-exam"
                    >
                      <div className="name-description">
                        <div>
                          <h4>Name: </h4>
                          {exam.name}
                          <br />
                          <h4>Description: </h4>
                          {exam.description}
                          <br />
                          <h4>Start Date: </h4>
                          {moment(exam.startDate).format("DD MMMM YYYY HH:mm")}
                          <br />
                          <h4>End Date: </h4>
                          {moment(exam.endDate).format("DD MMMM YYYY HH:mm")}
                          <br />
                          <h4>Duration: </h4>
                          {exam.duration}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="summary"></div>
        </>
      )}
    </div>
  );
};
