import React, { useState, useEffect } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/Exam.css";

import { ExamsList } from "../../api/Collections";
import { QuestionsList } from "../../api/Collections";

export const Exam = () => {
  let studentId = Meteor.userId();
  const params = useParams();
  const navigate = useNavigate();

  const [selectedQuestion, setSelectedQuestion] = useState(() => null);
  const [prev, setPrev] = useState(() => {
    return {
      activeQuestion: null,
      indexQuestion: "",
      activeOption: null,
      indexOption: "",
    };
  });
  useEffect(() => {
    Meteor.subscribe("StudentExams", studentId);
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

  useEffect(() => {
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
          [current] = current;
          current.index = index + 1;
          setSelectedQuestion(current);
        }
      }
    }
  }, [questionList]);

  useEffect(() => {
    if (!!exam) {
      if (!!selectedQuestion) {
        navigate(`/exam/:${exam._id}/question/:${selectedQuestion._id}`);
      }
    }
  }, [selectedQuestion]);

  const questionLinkClick = (e, question, index) => {
    if (!prev.activeQuestion) {
      setPrev({ activeQuestion: e.currentTarget, indexQuestion: index });
      e.currentTarget.classList.add("chosen");
    } else {
      prev.activeQuestion.classList.remove("chosen");
      setPrev({ activeQuestion: e.currentTarget, indexQuestion: index });
      e.currentTarget.classList.add("chosen");
    }

    setSelectedQuestion({ ...question, index: index });
  };
  const optionClick = (e, option, index) => {
    if (!prev.activeOption) {
      console.log(e.currentTarget);
      setPrev({ activeOption: e.currentTarget, indexOption: index });
      e.currentTarget.classList.add("chosen-option");
    } else {
      prev.activeOption.classList.remove("chosen-option");
      setPrev({ activeOption: e.currentTarget, indexOption: index });
      e.currentTarget.classList.add("chosen-option");
    }
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
                <div key={option._id} className="option">
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
        <div className="footer"></div>
      </div>
      <div className="side">
        <div className="duration">
          <h2>Remaining Time:</h2>
        </div>
        <div className="questions">
          {!!questionList &&
            questionList.map((question, index) => {
              return (
                <div
                  className="question-link"
                  key={question._id}
                  onClick={(e) => questionLinkClick(e, question, index + 1)}
                >
                  <div className="left">
                    <h3>Question: {index + 1}</h3>
                    <h3>Points: {question.point}</h3>
                  </div>
                  <div className="right">
                    {question.options.map((option, index) => {
                      return (
                        <div key={option._id}>
                          <h3
                            className="an-option"
                            onClick={(e) => optionClick(e, option, index)}
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
// <button
//   onClick={() =>
//     navigate(
//       `/exam/${params.examId}/question/${Math.floor(Math.random() * 10)}`
//     )
//   }
// >
//   next
// </button>
