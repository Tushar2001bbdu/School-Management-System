const mongoose = require("mongoose");
const { Schema } = mongoose;
const TeachersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  rollno: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  attendance: {
    value: {
      type: Number,
      default: 0,
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  studentslist: {
    type: [Number],
    ref: "students",
  },
});
let teachers = mongoose.model("Teachers", TeachersSchema);
module.exports = teachers;
