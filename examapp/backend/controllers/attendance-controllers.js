const attendanceService = require("../services/attendance");
async function updateAttendance(req, res) {
  let image = req.body.url;
  try {
    await attendanceService.updateAttendance(image);
    return res
      .status(200)
      .send("Face match found and data retrieved successfully");
  } catch (error) {
    return res.status(500).send("Error processing the request");
  }
}

module.exports = { updateAttendance };
