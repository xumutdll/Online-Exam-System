import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Accounts } from "meteor/accounts-base";

import { Questions } from "../imports/api/Collections";
import { Exams } from "../imports/api/Collections";

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
    // const user = Meteor.users.findOne({ "emails.address": info.email });
    // console.log(info.email);
    // console.log(user);
    Questions.insert(question);
    return "Question has successfully inserted!";
  },
  "questions.delete"(questionId) {
    check(questionId, String);
    Questions.remove(questionId);
  },

  "exams.insert"(exam) {
    check(exam, Object);
    // const user = Meteor.users.findOne({ "emails.address": info.email });
    // console.log(info.email);
    // console.log(user);
    Exams.insert(exam);
    return "Exam has successfully inserted!";
  },
  "questions.delete"(examId) {
    check(examId, String);
    Exams.remove(examId);
  },
});

Meteor.publish("Manager", () => {
  return Meteor.users.find({
    "profile.role": { $ne: "Manager" },
  });
});

Meteor.publish("Questions", (teacherId) => {
  if (!!teacherId === false) return;
  return Questions.find({ teacherId: teacherId });
});

Meteor.publish("Exams", (teacherId) => {
  if (!!teacherId === false) return;
  return Questions.find({ teacherId: teacherId });
});
// Meteor.publish("Teacher", () => {
//   let q = Meteor.users.find({
//     "profile.role": "Teacher",
//   });

//   console.log(q.count());

//   return q;
// });
