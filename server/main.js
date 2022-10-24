import { Meteor } from "meteor/meteor";
import "../imports/api/usersMethods";

Meteor.startup(() => {});

Meteor.publish("Manager", () => {
  return Meteor.users.find({
    "profile.role": { $ne: "Manager" },
  });
});

Meteor.publish("Teacher", () => {
  return Meteor.users.find({
    "profile.role": "Teacher",
  });
});
