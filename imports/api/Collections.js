import { Mongo } from "meteor/mongo";

export const Questions = new Mongo.Collection("questions");
export const Exams = new Mongo.Collection("exams");
