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
  const [prevActive, setPrevActive] = useState(() => null);
  const [isParticipated, setIsParticipated] = useState(() => null);

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
    let list = ExamResults.find().fetch();
    let filtered = [];
    list.forEach((result) => {
      if (result.studentId === studentId) {
        filtered.push(result);
      }
    });
    return filtered;
  });

  let searchExam = examList.filter(
    (exam) =>
      exam.name.toLowerCase().includes(searchExamQuery) ||
      exam.description.toLowerCase().includes(searchExamQuery)
  );

  let completedExams = resultsList.filter((exam) => exam.completed === true);

  const handleExamClick = (e, id) => {
    let participatedExam = false;
    completedExams.forEach((exam) => {
      if (exam.examId === id) {
        participatedExam = exam;
      }
    });
    if (!!participatedExam) {
      setIsParticipated(participatedExam);
    } else {
      setIsParticipated(false);
    }

    if (!prevActive) {
      setPrevActive(e.currentTarget);
      e.currentTarget.className += " chosen";
    } else {
      // when you cahse the current user
      prevActive.classList.remove("chosen");
      setPrevActive(e.currentTarget);
      e.currentTarget.classList.add("chosen");
    }
  };

  const takeTheExam = (exam) => {
    navigate(`/exam/:${exam._id}/question/:${exam.questions[0]}`);
  };

  const isExamAvailable = (exam) => {
    let ids = [];
    completedExams.forEach((e) => {
      ids.push(e.examId);
    });
    if (ids.filter((id) => exam._id === id).length > 0) {
      return false;
    }
    if (exam.status === "Ongoing") return true;
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
                        onClick={(e) => handleExamClick(e, exam._id)}
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
                          {isExamAvailable(exam) ? (
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
          <div className="summary">
            <h2>Results</h2>
            {isParticipated === null ? (
              <></>
            ) : (
              <>
                {!!isParticipated ? (
                  <div className="participated">
                    <h4>Your Score: </h4>
                    {isParticipated.result.point}
                    <br />
                    <h4>Total Exam Score: </h4>
                    {isParticipated.result.examPoint}
                    <br />
                    {/* <div className="space">
                      <h4>Total: </h4>
                      {isParticipated.result.point}/
                      {isParticipated.result.examPoint}
                    </div> */}
                    <br />
                    <h4>Number of Questions: </h4>
                    {isParticipated.result.examQuestion}
                    <br />
                    <div className="space">
                      <h4>True: </h4>
                      {isParticipated.result.true}
                      <br />
                      <h4>False: </h4>
                      {isParticipated.result.false}
                      <br />
                      <h4>Empty: </h4>
                      {isParticipated.result.empty}
                    </div>
                    <br />
                    <h4>Time Spent: </h4>
                    {isParticipated.timeSpent}
                    <br />
                    <h4>Exam Entry Date: </h4>
                    {moment(isParticipated.examEntryDate).format(
                      "DD MMMM YYYY HH:mm"
                    )}
                  </div>
                ) : (
                  <div className="did-not-participated">
                    You haven't participated to this exam.
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
