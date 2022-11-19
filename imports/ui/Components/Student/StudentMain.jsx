import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import moment from "moment";

import { ExamResults } from "../../../api/Collections";
import { ExamsList } from "../../../api/Collections";
import { SearchBar } from "../../common/SearchBar";
import { QueryNotFound } from "../../common/QueryNotFound";

export const StudentMain = () => {
  let studentId = Meteor.userId();
  const navigate = useNavigate();
  const [searchExamQuery, setSearchExamQuery] = useState(() => "");

  useEffect(() => {
    Meteor.subscribe("StudentExams", studentId);
    Meteor.subscribe("ResultsSummary", studentId);
  }, []);

  const examList = useTracker(() => {
    let list = ExamsList.find().fetch();
    let filtered = [];
    list.forEach((exam) => {
      if (moment(exam.endDate).isBefore(moment())) {
        exam.status = "Expired";
      } else if (moment().isBetween(moment(exam.startDate), exam.endDate)) {
        exam.status = "Ongoing";
      }
      exam.students.forEach((id) => {
        if (id === studentId) {
          filtered.push(exam);
        }
      });
    });
    return filtered;
  });

  const resultsList = useTracker(() => {
    return ExamResults.find().fetch();
  });

  let searchExam = examList.filter(
    (exam) =>
      exam.name.toLowerCase().includes(searchExamQuery) ||
      exam.description.toLowerCase().includes(searchExamQuery)
  );

  const handleExamClick = () => {
    console.log("object");
  };

  const takeTheExam = (exam) => {
    navigate(`/exam/:${exam._id}/question/:${exam.questions[0]}`);
  };

  return (
    <div className="exams">
      {!!studentId && (
        <>
          <div className="the-exams">
            <SearchBar
              searchQuery={searchExamQuery}
              setSearchQuery={setSearchExamQuery}
            />
            {searchExam.length === 0 ? (
              <QueryNotFound />
            ) : (
              searchExam.map((exam) => {
                return (
                  <div key={exam._id}>
                    {exam.questions.length !== 0 && (
                      <div
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
                            <h4>Number of Questions: </h4>
                            {exam.questions.length}
                            <br />
                            <h4>Duration: </h4>
                            {exam.duration}
                            <br />
                            <h4>Start Date: </h4>
                            {moment(exam.startDate).format(
                              "DD MMMM YYYY HH:mm"
                            )}
                            <br />
                            <h4>End Date: </h4>
                            {moment(exam.endDate).format("DD MMMM YYYY HH:mm")}
                            <br />
                            <h4>Status: </h4>
                            {exam.status}
                          </div>
                        </div>
                        <div className="side-buttons">
                          {exam.status === "Ongoing" ? (
                            <button onClick={() => takeTheExam(exam)}>
                              Take the exam
                            </button>
                          ) : (
                            <button disabled>Take the exam</button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
          <div className="summary"></div>
        </>
      )}
    </div>
  );
};
