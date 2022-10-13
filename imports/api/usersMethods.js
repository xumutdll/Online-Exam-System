import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { UsersCollection } from "../db/Collections";

Meteor.methods({
  "users.insert"(info) {
    check(info, Object);

    console.log(info);

    UsersCollection.insert({
      firstName: info.firstName,
      lastName: info.lastName,
      email: info.regEmail,
      phone: info.phone,
      password: info.regPassword,
      role: "Student",
      createdAt: new Date(),
    });
  },
});
