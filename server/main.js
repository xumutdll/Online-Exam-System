import { Meteor } from "meteor/meteor";
import "../imports/api/usersMethods";

Meteor.startup(() => {});

Meteor.publish(
  "Manager",
  (publishUsers = () => {
    return Meteor.users.find({
      userId: this.userId,
    });
  })
);

Meteor.publish(
  "Teacher",
  (publishUsers = () => {
    return Meteor.users.find({
      userId: this.userId,
      "profile.role": { $ne: "Manager" },
    });
  })
);
