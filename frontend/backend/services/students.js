const students = require("../models/students");
const Teachers = require("../models/teachers");
const studentresult = require("../models/examresult");
const feesdetails = require("../models/feespaymentdetails");

class StudentService {
  static async seeDetails(rollno) {
    try {
      let profile = await students.findOne({ rollno: rollno });
      return profile;
    } catch (error) {
      throw error;
    }
  }
  static async getStudentResult(rollno) {
    try {
      let result = await studentresult.findOne({ rollno: rollno });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getStudentFeesDetails(rollno) {
    try {
      let fees = await feesdetails.findOne({ rollno: rollno });
      return fees;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = StudentService;
