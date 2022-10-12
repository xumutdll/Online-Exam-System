import { Meteor } from "meteor/meteor";
import { SimpleSchema } from "meteor/aldeed:simple-schema";

const userSchema = new SimpleSchema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  // fullName: {
  //   type: String, // first + last ???
  //   default: userSchema.firstName + " " + userSchema.lastName,
  // },
  // role: {
  //   type: String,
  //   required: true,
  //   default: "student",
  // },
  // email: {
  //   type: String,
  //   required: true,
  // },
  // password: {
  //   type: String,
  //   required: true,
  // },
  // phone: {
  //   type: String,
  //   optional: true,
  // },
  // createdAt: {
  //   type: Date,
  //   immutable: true, // Doesn't allow changes, ignores it; no error.
  //   default: () => Date.now(),
  // },
});

module.exports = model("User", userSchema);
// Mongoose will automatically looks for the plural, lowercased version of
// your model name. The model "User" is is for the "users" collection in database.
