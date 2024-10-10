let studentService=require("../services/students")
exports.seeProfile=async(req,res)=>{
try{
let rollno = req.query.rollno;
if (!rollno) {
  return res.status(400).send({ status: 400, message: "rollno is required" });
}
const response=await studentService.seeDetails(rollno);
if(!response){
    res.status(401).send({ status: 401,message:"you are not authorized" });
}
else{
    res.status(200).send({ status: 200,message:response });
}
}
catch(error){
    res.status(500).send({ status: 500,message:"internal server error" });
}
}
exports.login=async (req, res) => {
  try {
   
   
    
    res.status(200).send({
      status: true,
      message: "You have logged in successfully",
    });
  } catch (error) {
    
    res.status(500).send({ status: false, message: "Some error has occurred" });
  }
}
exports.getStudentResult=async (req, res) => {
  try {
    let rollno = req.query.rollno;
    if (!rollno) {
      return res.status(400).send({ status: 400, message: "rollno is required" });
    }
    
    
        let response = await studentService.getStudentResult( rollno);

        if (!response) {
          return res.status(404).send({ status: 404, message: "No result found" });
        }
        else{
          return res.status(200).send({ status: 200, message: response });
        }
      
    }
  catch(error) {
    res.status(500).send({ status: 500, message: "Some error has occurred" });
  }
}


exports.getStudentFeesDetails=async (req, res) => {
  try {
  
   
    

    let rollno = req.query.rollno;
    if (!rollno) {
      return res.status(400).send({ status: 400, message: "rollno is required" });
    }
    
    
        let response = await studentService.getStudentFeesDetails( rollno);

        if (!response) {
          return res.status(404).send({ status: 404, message: "No fees details found" });
        }
        else{
          return res.status(200).send({ status: 200, message: response });
        }
      } 
    
   catch (error) {
    res.status(500).send({ status: 500, message: "Some error has occurred" });
  }}

