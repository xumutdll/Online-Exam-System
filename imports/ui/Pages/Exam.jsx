import React, { useState, useEffect } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/Exam.css";
import moment from "moment";

import { TimerComp } from "./TimerComp";
import { ExamResults, ExamsList } from "../../api/Collections";
import { QuestionsList } from "../../api/Collections";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export const Exam = () => {
  let studentId = Meteor.userId();
  const params = useParams();
  const navigate = useNavigate();
  const questionLinks = document.getElementsByClassName("question-link");
  const optionLinks = document.querySelectorAll(".an-option");
  const leftOptionLinks = document.querySelectorAll(".option");

  const [selectedQuestion, setSelectedQuestion] = useState(() => null);

  const [results, setResults] = useState(() => {
    return {
      studentId: studentId,
      examId: params.examId.substring(1),
      selections: [],
      result: { true: null, false: null, empty: null, point: null },
      timeSpent: null,
      completed: false,
      examEntryDate: moment()._d,
    };
  });

  const [prevQuestion, setPrevQuestion] = useState(() => {
    return {
      active: null,
      index: "",
    };
  });
  const [stopTheClock, setStopTheClock] = useState(() => false);

  useEffect(() => {
    Meteor.subscribe("StudentExams", studentId);
    Meteor.call("examResult.insert", results);
    Meteor.subscribe("ExamResults", studentId, params.examId.substring(1));
  }, []);

  const exam = useTracker(() => {
    return ExamsList.findOne({ _id: params.examId.substring(1) });
  });

  useEffect(() => {
    !!exam && Meteor.subscribe("Questions", exam.teacherId);
  }, [exam]);

  const questionList = useTracker(() => {
    if (!!exam) {
      let questions = [];
      let list = QuestionsList.find({ teacherId: exam.teacherId }).fetch();

      exam.questions.forEach((questionId) => {
        list.forEach((question) => {
          if (question._id === questionId) {
            questions.push(question);
          }
        });
      });
      return questions;
    }
  });

  const resultList = useTracker(() => {
    return ExamResults.findOne({
      studentId: studentId,
      examId: params.examId.substring(1),
    });
  });

  useEffect(() => {
    if (!resultList) return;
    if (!!questionList) {
      if (!selectedQuestion) {
        let current = [];
        let index = 0;

        current = questionList.filter(
          (question) => question._id === params.questionId.substring(1)
        );
        index = questionList
          .map((e) => e._id)
          .indexOf(params.questionId.substring(1));

        if (current.length !== 0) {
          // Works once after the load up
          [current] = current;
          current.index = index + 1;
          setSelectedQuestion(current);

          questionLinks[index].classList.add("chosen");
          setPrevQuestion({ active: questionLinks[index], index: index + 1 });

          setResults(resultList);
        }
      }
    }
  }, [questionList]);

  useEffect(() => {
    if (!!exam) {
      if (!!selectedQuestion) {
        if (!!results) {
          navigate(`/exam/:${exam._id}/question/:${selectedQuestion._id}`);

          for (link of leftOptionLinks) {
            link.classList.remove("chosen-option");
          }
          results.selections.forEach((selection) => {
            if (selection.questionId === selectedQuestion._id) {
              document
                .getElementById(selection.optionId + "0")
                .classList.add("chosen-option");
            }
          });
        }
      }
    }
  }, [selectedQuestion]);

  const questionLinkClick = (e, question, index) => {
    prevQuestion.active.classList.remove("chosen");
    setPrevQuestion({ active: e.currentTarget, index: index });
    e.currentTarget.classList.add("chosen");

    setSelectedQuestion({ ...question, index: index });
  };

  const optionClick = (option, question) => {
    let isPrevResult = false;
    let sameOptionClicked = false;
    let qIndex = null;

    results.selections.forEach((selection, index) => {
      if (selection.questionId === question._id) {
        if (option._id === selection.optionId) {
          sameOptionClicked = true;
        }
        qIndex = index;
        return (isPrevResult = true);
      }
    });

    let point = option.isTrue ? Number(question.point) : 0;
    let selection = {
      questionId: question._id,
      optionId: option._id,
      isTrue: option.isTrue,
      point: point,
    };

    if (isPrevResult === false) {
      // Works once for every question
      setResults({
        ...results,
        selections: [...results.selections, selection],
      });
    } else if (sameOptionClicked === true) {
      results.selections.splice(qIndex, 1);
      setResults({ ...results });
    } else {
      results.selections.splice(qIndex, 1);
      setResults({
        ...results,
        selections: [...results.selections, selection],
      });
    }
  };

  useEffect(() => {
    if (!!resultList) {
      // Database update for a new selection

      if (
        results.selections.length !== resultList.selections &&
        results.selections.length !== 0
      ) {
        Meteor.call("examResult.updateNewSelection", results);

        for (link of optionLinks) {
          link.classList.remove("chosen-option");
        }
        for (link of leftOptionLinks) {
          link.classList.remove("chosen-option");
        }

        results.selections.forEach((selection) => {
          if (selection.questionId === selectedQuestion._id) {
            document
              .getElementById(selection.optionId + "0")
              .classList.add("chosen-option");
          }
        });

        results.selections.forEach((selection) => {
          document
            .getElementById(selection.optionId)
            .classList.add("chosen-option");
        });
      }
      if (results.completed === true) {
        navigate(`/student`);
        Meteor.call("examResult.examSubmitted", results);
      }
    }
  }, [results]);

  const next = () => {
    questionList.forEach((question, index) => {
      if (
        question._id === selectedQuestion._id &&
        questionList.length - 2 >= index
      ) {
        questionLinks[index].classList.remove("chosen");
        setPrevQuestion({ active: questionLinks[index + 1], index: index + 1 });
        questionLinks[index + 1].classList.add("chosen");
        setSelectedQuestion({ ...questionList[index + 1], index: index + 2 });
      }
    });
  };

  const previous = () => {
    questionList.forEach((question, index) => {
      if (question._id === selectedQuestion._id && index >= 1) {
        questionLinks[index].classList.remove("chosen");
        setPrevQuestion({ active: questionLinks[index - 1], index: index - 1 });
        questionLinks[index - 1].classList.add("chosen");
        setSelectedQuestion({ ...questionList[index - 1], index: index });
      }
    });
  };

  const handleSubmit = () => {
    // navigate(`/student`);
    setResults({ ...results, completed: true });
    setStopTheClock(true);
  };

  return (
    <div className="exam">
      <div className="main">
        <div className="header">
          {!!selectedQuestion && (
            <h2>
              Question {!selectedQuestion.index ? "1" : selectedQuestion.index}
            </h2>
          )}
          <div className="question">
            {!!selectedQuestion && selectedQuestion.problem}
          </div>
        </div>
        <div className="body">
          {!!selectedQuestion &&
            selectedQuestion.options.map((option, index) => {
              return (
                <div
                  key={option._id}
                  className="option"
                  id={option._id + "0"}
                  onClick={() => optionClick(option, selectedQuestion)}
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
        </div>
        <div className="footer">
          <div className="left" onClick={previous}>
            Previous
          </div>
          <div className="right" onClick={next}>
            Next
          </div>
        </div>
      </div>
      <div className="side">
        <div className="duration">
          <div className="clock">
            <h2>
              Remaining Time:
              {!!resultList && (
                <TimerComp
                  examDuration={!!exam && exam.duration}
                  startTime={
                    !!resultList.examEntryDate &&
                    resultList.examEntryDate.getTime()
                  }
                  stop={stopTheClock}
                  timeOut={handleSubmit}
                />
              )}
            </h2>
          </div>
          <div className="leave" onClick={handleSubmit}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <h4>Submit</h4>
          </div>
        </div>
        <div className="questions">
          {!!questionList &&
            questionList.map((question, questionIndex) => {
              return (
                <div
                  className="question-link"
                  key={question._id}
                  onClick={(e) =>
                    questionLinkClick(e, question, questionIndex + 1)
                  }
                >
                  <div className="left">
                    <h3>Question: {questionIndex + 1}</h3>
                    <h3>Points: {question.point}</h3>
                  </div>
                  <div className="right">
                    {question.options.map((option, optionIndex) => {
                      return (
                        <div key={option._id}>
                          <h3
                            id={option._id}
                            className="an-option"
                            onClick={() => optionClick(option, question)}
                          >
                            {optionIndex === 0
                              ? "A"
                              : optionIndex === 1
                              ? "B"
                              : optionIndex === 2
                              ? "C"
                              : optionIndex === 3
                              ? "D"
                              : "E"}
                          </h3>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
