import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Accounts } from "meteor/accounts-base";

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

  "users.login"(email, password) {
    check(email, String);
    check(password, String);

    Meteor.loginWithPassword({ email: email }, password, (error) => {
      console.log(error);
    });
    // const user = Meteor.users.findOne(
    //   { email: email },
    //   { email: 1, password: 1 }
    // );
    // console.log(user); // ???

    // if (!!user) {
    //   if (user.password === password) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // } else return false;
  },

  "users.checkCollisions"(email) {
    check(email, String);
    const user = Meteor.users.findOne({ email: email });

    if (!user) {
      return false;
    }
    return true;
  },
});
