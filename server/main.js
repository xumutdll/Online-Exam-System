import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Accounts } from "meteor/accounts-base";
import moment from "moment";

import { QuestionsList } from "../imports/api/Collections";
import { ExamsList } from "../imports/api/Collections";

Meteor.startup(() => {});

Meteor.methods({
  "users.insert"(info) {
    check(info, Object);
    // const user = Meteor.users.findOne({ "emails.address": info.email });
    // console.log(info.email);
    // console.log(user);
    if (
      info.firstName === "" ||
      info.lastName === "" ||
      info.email === "" ||
      info.phone === "" ||
      info.password === "" ||
      info.passwordCheck === ""
    )
      return "Please fill the empty areas!";
    else if (info.password !== info.passwordCheck)
      return "Passwords do not match!";
    else if (!!Meteor.users.findOne({ "emails.address": info.email })) {
      return "Email already exists.";
    } else {
      Accounts.createUser(
        {
          email: info.email,
          password: info.password,
          profile: {
            firstName: info.firstName,
            lastName: info.lastName,
            phone: info.phone,
            role: "Student",
          },
        }

        // (error) => {
        //   if (error) {
        //     console.log(error.reason);
        //     return error.reason;
        //   } else {
        //     console.log("Succesfully registered.");
        //     return "Succesfully registered.";
        //   }
        // }
      );
      // return "Succesfully registered."; // doesn't work
    }
  },
  "users.update"(info) {
    check(info, Object);
    // const user = Meteor.users.findOne({ "emails.address": info.email });
    // console.log(info.email);
    // console.log(user);
    if (
      info.firstName === "" ||
      info.lastName === "" ||
      info.email === "" ||
      info.phone === ""
    )
      return "Please fill the empty areas!";
    else {
      Meteor.users.update(
        { _id: info._id },
        {
          $set: {
            "profile.firstName": info.firstName,
            "profile.lastName": info.lastName,
            emails: [{ address: info.email }],
            "profile.phone": info.phone,
            "profile.role": info.role,
            "profile.active": info.active,
          },
        }
      );
    }
  },

  "questions.insert"(question) {
    check(question, Object);

    QuestionsList.insert(question);
    return "Question is successfully inserted!";
  },

  "questions.delete"(questionId) {
    check(questionId, String);
    QuestionsList.remove(questionId);
    return "Succesfully deleted!";
  },

  "questions.update"(question) {
    check(question, Object);

    QuestionsList.update({ _id: question._id }, question);
    return "Question is succesfully updated!";
  },

  "exams.insert"(exam) {
    check(exam, Object);
    exam.startDate = exam.startDate.getTime();
    exam.endDate = exam.endDate.getTime();

    if (exam.startDate < exam.endDate) {
      // exam.startDate = moment(exam.startDate).format("DD MMMM YYYY HH:mm");
      // exam.endDate = moment(exam.endDate).format("DD MMMM YYYY HH:mm");

      ExamsList.insert(exam);
      return "Exam has successfully inserted!";
    }
    return "The start date of the exam cannot be earlier than the end date of the exam!";
  },
  "exams.delete"(examId) {
    check(examId, String);
    ExamsList.remove(examId);
    return "Succesfully deleted!";
  },
  "exams.update"(exam) {
    check(exam, Object);
    exam.startDate = exam.startDate.getTime();
    exam.endDate = exam.endDate.getTime();

    if (exam.startDate < exam.endDate) {
      // exam.startDate = moment(exam.startDate).format("DD MMMM YYYY HH:mm");
      // exam.endDate = moment(exam.endDate).format("DD MMMM YYYY HH:mm");
      ExamsList.update({ _id: exam._id }, exam);
      return "Exam has successfully updated!";
    }
    return "The start date of the exam cannot be earlier than the end date of the exam!";
  },

  "exams.updateStudents"(exam) {
    check(exam, Object);

    let ids = [];
    exam.students.forEach((student) => {
      ids.push(student._id);
    });

    ExamsList.update({ _id: exam._id }, { $set: { students: ids } });
    // return "Exam has successfully updated!";
  },
  "exams.updateQuestions"(exam) {
    check(exam, Object);
    let ids = [];
    exam.questions.forEach((question) => {
      ids.push(question._id);
    });

    ExamsList.update({ _id: exam._id }, { $set: { questions: ids } });
    // return "Exam has successfully updated!";
  },

  "exams.questionRemove"(exam) {
    check(exam, Object);

    ExamsList.update(
      { _id: exam._id },
      { $set: { questions: exam.questions } }
    );
    // return "Exam has successfully updated!";
  },
});

Meteor.publish("Manager", () => {
  return Meteor.users.find({
    "profile.role": { $ne: "Manager" },
  });
});

Meteor.publish("Questions", (teacherId) => {
  if (!!teacherId === false) return;
  return QuestionsList.find({ teacherId: teacherId });
});

Meteor.publish("Exams", (teacherId) => {
  if (!!teacherId === false) return;
  return ExamsList.find({ teacherId: teacherId });
});

// Meteor.publish("Teacher", () => {
//   let q = Meteor.users.find({
//     "profile.role": "Teacher",
//   });

//   console.log(q.count());

//   return q;
// });
