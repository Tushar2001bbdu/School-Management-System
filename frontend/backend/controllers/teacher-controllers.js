let teacherService = require("../services/teachers");
exports.seeProfile = async (req, res) => {
  try {
    let rollno = req.query.rollno;
    const response = await teacherService.seeDetails(rollno);
    if (!response) {
      res.json({ status: 401, message: "you are not authorized" });
    } else {
      res.json({ status: 200, message: response });
    }
  } catch (error) {
    res.json({ status: 500, message: error });
  }
};
exports.login = async (req, res) => {
  try {
    res.json({
      status: 200,
      message: "You have logged in successfully",
    });
  } catch (error) {
    res.json({ status: 500, message: error });
  }
};
exports.getStudentProfile = async (req, res) => {
  try {
    let rollno = req.query.rollno;
    if (!rollno) {
      res.json({ status: 400, message: "no roll number has been entered" });
    } else {
      const response = await teacherService.getStudentProfile(rollno);
      if (!response) {
        res.json({ status: 401, message: "invalid rollno has been entered" });
      } else {
        res.json({ status: 200, profile: profile });
      }
    }
  } catch (error) {
    res.json({ status: 500, message: error });
  }
};
exports.updateStudentResult = async (req, res) => {
  const { marks, rollno } = req.body;
  try {
    if (!marks || !rollno) {
      res.json({
        status: 400,
        message: "you have not entered invalid rollno or marks",
      });
    } else {
      await teacherService.updateStudentResult(marks, rollno);
      res.json({
        status: 200,
        message: "the result of student has been updated successfully",
      });
    }
  } catch (error) {
    res.json({
      status: 500,
      message: error,
    });
  }
};
exports.getStudentsList = async (req, res) => {
  try {
    let section = req.query.section;

    if (!section) {
      res.json({ status: 400, message: error });
    } else {
      let response = await teacherService.getStudentList(section);

      if (!response) {
        res.json({ status: 401, message: error });
      } else {
        res.json({ status: 200, studentList: response });
      }
    }
  } catch (error) {
    res.json({ status: 500, message: error });
  }
};
