const students = require("../models/students");
const Teachers = require("../models/teachers");
const studentresult = require("../models/examresult");

class TeacherService {
  static async seeDetails(rollno) {
    try {
      let teacher = await Teachers.findOne({ rollno: rollno });

      let profile = {
        name: teacher.name,
        course: teacher.course,
        age: teacher.age,
        gender: teacher.gender,
        rollno: teacher.rollno,
        attendance: teacher.attendance,
        email: teacher.email,
      };

      return profile;
    } catch (error) {
      throw error;
    }
  }
  static async getStudentProfile(rollno) {
    try {
      let profile = await students.findOne({ rollno: rollno });
      return profile;
    } catch (error) {
      throw error;
    }
  }
  static async updateStudentResult(marks, rollno) {
    try {
      let grade = "F";

      if (marks > 0 && marks < 40) {
        grade = "F";
      } else if (marks > 40 && marks <= 60) {
        grade = "E";
      } else if (marks > 60 && marks <= 65) {
        grade = "D";
      } else if (marks > 65 && marks <= 80) {
        grade = "C";
      } else if (marks > 80 && marks <= 90) {
        grade = "B";
      } else if (marks > 80 && marks <= 90) {
        grade = "B";
      } else if (marks > 90 && marks < 90) {
        grade = "A";
      } else {
        grade = "O";
      }
      let response = await studentresult.findOne({ rollno: rollno });
      response = await studentresult.findOneAndUpdate(
        { rollno: rollno },
        { $set: { marks: marks, grade: grade } }
      );
      response = await studentresult.findOne({
        rollno: rollno,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  static async getStudentList(section) {
    try {
      let student = await students.find({ section: section });
      return student;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = TeacherService;
