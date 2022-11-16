import { Mongo } from "meteor/mongo";

export const QuestionsList = new Mongo.Collection("questions");
export const ExamsList = new Mongo.Collection("exams");
export const ExamResults = new Mongo.Collection("studentExam");
