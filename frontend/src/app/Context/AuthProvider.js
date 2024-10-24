"use client";
import { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";
import { RoleContext } from "./RoleProvider";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [studentData, setStudentData] = useState(null);
  let userRole = "student";
  const Role = useContext(RoleContext);
  const [studentResult, setStudentResult] = useState(null);
  const [studentFeesPaymentDetails, setStudentFeesPaymentDetails] =
    useState(null);
  async function StudentDetails() {
    let rollno = 1210437010;
    let url = new URL(`http://localhost:3001/app/users/seeDetails`);
    url.searchParams.set("rollno", rollno);
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
    let url = new URL("http://localhost:3001/app/users/login");
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
    let url = new URL(`http://localhost:3001/app/users/seeResult`);
    url.searchParams.set("rollno", rollno);
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
  async function getStudentDetails() {
    let rollno = 1210437010;
    let url = new URL(`http://localhost:3001/app/users/getDetails`);
    url.searchParams.set("rollno", rollno);
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
    let url = new URL(`http://localhost:3001/app/users/getResult`);
    url.searchParams.set("rollno", rollno);
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
  async function logout() {
    localStorage.removeItem("teacherFirebaseToken");
    Role.changeRole("guest");
    router.push("/Faculty_Services");
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
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
