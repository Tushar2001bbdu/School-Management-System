"use client";
import { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";
import { RoleContext } from "./RoleProvider";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [studentData, setStudentData] = useState(null);
  let userRole="student"
  const Role = useContext(RoleContext);
  const [studentResult, setStudentResult] = useState(null);
  const [studentFeesPaymentDetails, setStudentFeesPaymentDetails] =
    useState(null);
  async function StudentDetails() {
    let rollno = 1210437010;
    let url = `http://localhost:3001/app/users/seeDetails?rollno=${rollno}`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("firebaseToken"),
      },
    });
    response = await response.json();
    setStudentData(response.message);
  }
  async function StudentLogin(userDetails) {
    let url = "http://localhost:3001/app/users/login";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("firebaseToken"),
      },
      body: JSON.stringify({
        email: userDetails.email,
        password: userDetails.password,
      }),
    });
    response = await response.json();
    if (response.status == 200) {
      Role.changeRole("student");
    }
    localStorage.setItem("user", "student");

    setUserRole("student");
    Cookies.set("rollno", userDetails.rollNo, { expires: 1 });
  }

  async function getStudentResult() {
    let rollno = 1210437010;
    let url = `http://localhost:3001/app/users/seeResult?rollno=${rollno}`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // If sending JSON data
        authorization: localStorage.getItem("firebaseToken"),
      },
    });
    response = await response.json();
    setStudentResult(response.message);
  }
  async function getStudentDetails() {
    let rollno = 1210437010;
    let url = `http://localhost:3001/app/users/getDetails?rollno=${rollno}`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("firebaseToken"),
      },
    });
    response = await response.json();
    setStudentFeesPaymentDetails(response.message);
  }

  async function getStudentResult() {
    let rollno = 1210437010;
    let url = `http://localhost:3001/app/users/getResult?rollno=${rollno}`;
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("firebaseToken"),
      },
    });
    response = await response.json();
    setStudentResult(response.message);
  }
  return (
    <AuthContext.Provider
      value={{
        StudentLogin,
        studentData,
        StudentDetails,
        userRole,
        studentResult,
        getStudentDetails,
        studentFeesPaymentDetails,
        getStudentResult,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
