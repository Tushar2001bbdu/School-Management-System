"use client";

import { createContext, useState, useContext } from "react";
import { RoleContext } from "./RoleProvider";
import Cookies from "js-cookie";

export const FacultyContext = createContext();

export function FacultyProvider({ children }) {
  const [facultyData, setFacultyData] = useState(null);
  const [listOfStudents] = useState(null);
  const [studentProfile] = useState(null);
  const Role = useContext(RoleContext);

  async function facultyLogin(facultyDetails) {
    let url = new URL("http://localhost:3001/app/teachers/login");
    url.searchParams.set("rollno", facultyDetails.rollno);
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("teacherFirebaseToken"),
      },
      body: JSON.stringify({
        email: facultyDetails.email,
        password: facultyDetails.password,
      }),
    });
    localStorage.setItem("user", "teacher");
    console.log("rollno" + facultyDetails.rollNo);
    Cookies.set("rollno", facultyDetails.rollNo, { expires: 1 });
    response = await response.json();
    console.log(response);
    if (response.status == 200) {
      Role.changeRole("teacher");
    }
    localStorage.setItem("user", "teacher");
    console.log("role changed to " + Role.role);
  }
  async function getFacultyProfile() {
    let rollno = 121078897;
    let url = new URL(`http://localhost:3001/app/teachers/seeDetails`);
    
  url.searchParams.set("rollno", rollno);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem("teacherFirebaseToken"),
      },
      
    });

    response = await response.json();
    setFacultyData(response.message);
  }
  async function getListOfStudents(section) {
    let url = new URL(`http://localhost:3001/app/teachers/listOfStudents`);
    url.searchParams.set("section", section);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem("teacherFirebaseToken"),
      }
     
    });

    response = await response.json();
    return response.studentList;
  }
  async function getStudentProfile(rollno) {
    let url = new URL(`http://localhost:3001/app/teachers/getStudentProfile`);
    url.searchParams.set("rollno", rollno);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem("teacherFirebaseToken"),
      }
    });

    response = await response.json();
    return response.profile;
  }
  async function updateResult(rollno, marks) {
    let url = new URL(`http://localhost:3001/app/teachers/updateResult`);
    url.searchParams.set("rollno", rollno);
    url.searchParams.set("marks", marks);
    await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.getItem("teacherFirebaseToken"),
      },
      body: JSON.stringify({
        rollno: rollno,
        marks: marks,
      })
    });
  }

  return (
    <FacultyContext.Provider
      value={{
        facultyData,
        facultyLogin,
        getFacultyProfile,
        getListOfStudents,
        listOfStudents,
        studentProfile,
        getStudentProfile,
        updateResult,
      }}
    >
      {children}
    </FacultyContext.Provider>
  );
}
