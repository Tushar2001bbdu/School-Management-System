"use client"
import { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import { RoleContext } from './RoleProvider';
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [studentData, setStudentData] = useState(null);
   
    const [userRole, setUserRole] = useState("student");
    const Role=useContext(RoleContext)
    const [studentResult, setStudentResult] = useState(null);
    const [studentFeesPaymentDetails, setStudentFeesPaymentDetails] = useState(null);
    async function StudentDetails(){
      let rollno = Cookies.get("rollno");
        let url=`http://localhost:3001/app/users/seeDetails?rollno=${rollno}`;
        let response=await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', 
              'authorization':  localStorage.getItem('firebaseToken')
              
            },
           
               
          })
          response =await response.json()
          setStudentData(response)

           
        
    }
    async function StudentLogin(userDetails){
      
        let url="http://localhost:3001/app/users/login";
        let response=await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'authorization':  localStorage.getItem('firebaseToken')
              
            },
            body:JSON.stringify({
                email: userDetails.email,
                password: userDetails.password
              })
               
          })
          Role.changeRole(response.role)
          setUserRole("student")
          Cookies.set("rollno", userDetails.rollNo, { expires: 1 });
          response =await response.json()
          
}
   
async function getStudentResult(){
  let rollno = Cookies.get("rollno");
    let url=`http://localhost:3001/app/users/seeResult?rollno=${rollno}`;
    let response=await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // If sending JSON data
          'authorization':  localStorage.getItem('firebaseToken')
          
        },
       
           
      })
      response =await response.json()
      setStudentResult(response)

        
}
async function getStudentDetails(){
    let rollno = Cookies.get("rollno");
    let url=`http://localhost:3001/app/users/getDetails?rollno=${rollno}`;
    let response=await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
          'authorization':  localStorage.getItem('firebaseToken')
        },
       
           
      })
      response =await response.json()
      setStudentFeesPaymentDetails(response)        
}

async function getStudentResult(){
    let rollno = Cookies.get("rollno");
    let url=`http://localhost:3001/app/users/getResult?rollno=${rollno}`;
    let response=await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization':  localStorage.getItem('firebaseToken')
          
        },
       
          
      })
      response =await response.json()
      setStudentResult(response)        
}
   return (
        <AuthContext.Provider value={{ StudentLogin,studentData ,StudentDetails,userRole,studentResult,getStudentDetails,studentFeesPaymentDetails,getStudentResult}}>
            {children}
        </AuthContext.Provider>
    );
}
