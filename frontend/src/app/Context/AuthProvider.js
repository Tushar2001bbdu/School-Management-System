'use client'
import { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";
import { RoleContext } from "./RoleProvider";
import { useRouter } from "next/navigation"
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [studentData, setStudentData] = useState(null);
  let userRole = "student";
  const Role = useContext(RoleContext);
  const router = useRouter();
  const [studentResult, setStudentResult] = useState(null);
  const [studentFeesPaymentDetails, setStudentFeesPaymentDetails] =
    useState(null);

  async function StudentDetails() {

    let url = new URL(`http://localhost:3001/app/users/seeDetails`);

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
  function setRollNumber(rollno){
    localStorage.setItem("rollno", rollno);
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
        "rollno":localStorage.getItem("rollno")
      
      }),
    });
  
    if (response.status == 200) {
      Role.changeRole("student");
      router.push("/Details");
      Cookies.set("rollno", userDetails.rollno, {
        expires: 7,
        path: "",
        sameSite: "Strict",
      });
    }
  }
  
  async function getStudentResult() {
    let url = new URL(`http://localhost:3001/app/users/seeResult`);

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
    let url = new URL(`http://localhost:3001/app/users/getDetails`);


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
    let url = new URL(`http://localhost:3001/app/users/getResult`);

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
    localStorage.removeItem("firebaseToken");
    Role.changeRole(null);
    router.push("/Student_Services");
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
        setRollNumber
      }}
    >
      {children}
    </AuthContext.Provider>
  );
  
}
