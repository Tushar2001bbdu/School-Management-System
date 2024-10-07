const students = require("../models/examresult");
const teachers = require("../models/teachers");

async function updateAttendance(rollno) {
    let attendance;
    let validStudent = await students.findOne({ rollno: rollno });
    let validTeacher = await teachers.findOne({ rollno: rollno });

    const time = Date.now();
    let currentDate = new Date(time).toISOString().split('T')[0]; // Current date in YYYY-MM-DD

    // If it's a student
    if (validStudent) {
        // Convert the stored `updatedAt` to YYYY-MM-DD format
        let studentUpdatedDate = new Date(validStudent.attendance.updatedAt).toISOString().split('T')[0];
        studentUpdatedDate=studentUpdatedDate.substring(8,10)
        console.log(studentUpdatedDate)
        if (studentUpdatedDate !== currentDate) {
            attendance = validStudent.attendance.value + 1;
            validStudent.attendance.value = attendance;
            validStudent.attendance.updatedAt = currentDate; // Update with the current date
            await validStudent.save(); // Save the updated student attendance
        }
    }

    // If it's a teacher
    if (validTeacher) {
        // Convert the stored `updatedAt` to YYYY-MM-DD format
        let teacherUpdatedDate = new Date(validTeacher.attendance.updatedAt).toISOString().split('T')[0];

        if (teacherUpdatedDate !== currentDate) {
            attendance = validTeacher.attendance.value + 1;
            validTeacher.attendance.value = attendance;
            validTeacher.attendance.updatedAt = currentDate; // Update with the current date
            await validTeacher.save(); // Save the updated teacher attendance
        }
    }
}

module.exports = { updateAttendance };
