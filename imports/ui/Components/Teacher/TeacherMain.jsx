import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import moment from "moment";

import { ModalContainer } from "../../common/ModalContainer";
import { FormCreateQuestion } from "../../common/FormCreateQuestion";
import { FormCreateExam } from "../../common/FormCreateExam";
import { FormAddStudent } from "../../common/FormAddStudent";
import { QuestionsList } from "../../../api/Collections";
import { ExamsList } from "../../../api/Collections";
import { SearchBar } from "../../common/SearchBar";
import { QueryNotFound } from "../../common/QueryNotFound";

export const TeacherMain = () => {
  let teacherId = Meteor.userId();

  const [targetedQuestionId, setTargetedQuestionId] = useState(() => "");
  const [prev, setPrev] = useState(() => {
    return { active: null, examId: "" };
  });
  const [chosenExam, setChosenExam] = useState(() => null);
  const [searchQuestionQuery, setSearchQuestionQuery] = useState(() => "");
  const [searchExamQuery, setSearchExamQuery] = useState(() => "");

  useEffect(() => {
    Meteor.subscribe("Questions", teacherId);
    Meteor.subscribe("Exams", teacherId);
    Meteor.subscribe("Students");
    setPrev({ active: null, examId: "" });
    setChosenExam(null);
  }, []);

  const questionList = useTracker(() => {
    return QuestionsList.find({ teacherId: teacherId }).fetch();
  });
  const examList = useTracker(() => {
    let list = ExamsList.find({ teacherId: teacherId }).fetch();
    list.forEach((exam) => {
      if (moment(exam.endDate).isBefore(moment())) {
        exam.status = "Expired";
      } else if (moment().isBetween(moment(exam.startDate), exam.endDate)) {
        exam.status = "Ongoing";
      }
    });
    return list;
  });

  const handleQuestionDelete = (questionId) => {
    Meteor.call("questions.delete", questionId, (err, res) => {
      alert(res);
    });
  };

  const handleExamDelete = (examId) => {
    Meteor.call("exams.delete", examId, (err, res) => {
      alert(res);
    });
  };

  let searchQuestion = questionList.filter((question) =>
    question.problem.toLowerCase().includes(searchQuestionQuery)
  );
  let searchExam = examList.filter(
    (exam) =>
      exam.name.toLowerCase().includes(searchExamQuery) ||
      exam.description.toLowerCase().includes(searchExamQuery)
  );

  const handleExamClick = (e, exam) => {
    if (!prev.active) {
      setPrev({ active: e.currentTarget, examId: exam._id });
      e.currentTarget.className += " chosen";
    } else {
      // when you cahse the current user
      prev.active.classList.remove("chosen");
      setPrev({ active: e.currentTarget, examId: exam._id });
      e.currentTarget.classList.add("chosen");
    }
    if (typeof exam.questions[0] === "object" || exam.questions.length === 0) {
      setChosenExam(exam);
    } else {
      let q = [];
      exam.questions.forEach((element) => {
        questionList.forEach((question) => {
          if (element === question._id) {
            q.push(question);
          }
        });
      });
      exam.questions = q;
      setChosenExam(exam);
    }
  };

  const handleIn = (question) => {
    let flag = true;

    chosenExam.questions.forEach((element) => {
      if (element._id === question._id) {
        return (flag = false);
      }
    });
    if (flag === true) {
      setChosenExam({
        ...chosenExam,
        questions: [...chosenExam.questions, question],
      });
    }
  };

  const handleRemove = (exam, questionId) => {
    let newlist = exam.questions.filter((question) => question !== questionId);
    exam.questions = newlist;
    Meteor.call("exams.questionRemove", exam);
  };

  useEffect(() => {
    if (!!chosenExam) {
      if (chosenExam.length !== 0) {
        Meteor.call("exams.updateQuestions", chosenExam);
      }
    }
  }, [chosenExam]);

  return (
    <div className="exams">
      {!!teacherId && (
        <>
          <div className="the-exams">
            <ModalContainer
              content={<FormCreateExam teacherId={teacherId} />}
            />
            <SearchBar
              searchQuery={searchExamQuery}
              setSearchQuery={setSearchExamQuery}
            />
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
                        <br />
                        <h4>Status: </h4>
                        {exam.status}
                        {prev.examId === exam._id && (
                          <>
                            {!!chosenExam &&
                              chosenExam.questions.map((question, index) => {
                                return (
                                  <div
                                    key={question._id}
                                    className="added-questions"
                                    onClick={() =>
                                      handleRemove(exam, question._id)
                                    }
                                  >
                                    <h4>Question {index + 1}: </h4>
                                    {question.problem.includes(" ")
                                      ? question.problem.substr(
                                          0,
                                          Math.min(
                                            120,
                                            question.problem.lastIndexOf(" ")
                                          )
                                        )
                                      : question.problem.substr(0, 120)}{" "}
                                    {question.problem.length > 120 && "..."}
                                  </div>
                                );
                              })}
                          </>
                        )}
                      </div>

                      <div className="buttons">
                        <div className="add-student-button">
                          <ModalContainer
                            content={<FormAddStudent exam={exam} />}
                          />
                        </div>
                        <div className="side-buttons">
                          <ModalContainer
                            content={
                              <FormCreateExam
                                teacherId={teacherId}
                                theExam={examList.find(
                                  (obj) => obj._id === exam._id
                                )}
                              />
                            }
                          />
                          <button
                            className="delete"
                            onClick={() => handleExamDelete(exam._id)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="the-questions">
            {!!chosenExam && (
              <>
                <ModalContainer
                  content={<FormCreateQuestion teacherId={teacherId} />}
                />

                <SearchBar
                  searchQuery={searchQuestionQuery}
                  setSearchQuery={setSearchQuestionQuery}
                />

                {searchQuestion.length === 0 ? (
                  <QueryNotFound />
                ) : (
                  searchQuestion.map((question) => {
                    return (
                      <div
                        key={question._id}
                        className="a-question"
                        onMouseEnter={() => setTargetedQuestionId(question._id)}
                        onMouseLeave={() => setTargetedQuestionId("")}
                      >
                        <div className="expression">
                          <div
                            className="problem"
                            onClick={() => handleIn(question)}
                          >
                            {targetedQuestionId === question._id ? (
                              question.problem
                            ) : (
                              <>
                                {question.problem.includes(" ")
                                  ? question.problem.substr(
                                      0,
                                      Math.min(
                                        120,
                                        question.problem.lastIndexOf(" ")
                                      )
                                    )
                                  : question.problem.substr(0, 120)}
                                {question.problem.length > 120 && "..."}
                              </>
                            )}
                          </div>
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
                              onClick={() => handleQuestionDelete(question._id)}
                            >
                              X
                            </button>
                          </div>
                        </div>
                        {targetedQuestionId === question._id && (
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
                                  {option.value.length > 60
                                    ? option.value.substr(0, 60)
                                    : option.value}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
