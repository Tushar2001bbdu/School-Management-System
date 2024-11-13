const examService = require("../services/exam");
async function sendFrame(req, res) {
  let image = req.body.url;
  let rollno = req.body.rollno;
  try {
    await examService.sendFrame(image, rollno);
    return res.json({
      status: 200,
      message: "A frame has been saved in the S3 Bucket succesfully",
    });
  } catch (error) {
    return res.json({ status: 500, message: "Error processing the request" });
  }
}

module.exports = { sendFrame };