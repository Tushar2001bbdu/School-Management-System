"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../utils/teacher_auth";
import { useRouter } from "next/navigation";
import { FacultyContext } from "../Context/FacultyProvider";
import Alert from "./Alert";
export default function FacultyLogin() {
  alert("hello guys")
  const [userDetails, setUserDetails] = useState({
    email: "",
    rollNo: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const User_Context = useContext(AuthContext);
  const router = useRouter();
  console.log(User_Context);
  async function handleChange(e) {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    alert("You have entered invalid credentials. Please try again")
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        Auth,
        userDetails.email,
        userDetails.password
      );
      if(userCredential.error!==undefined){
        setError(true)
        return;
      }
      else{
        const token = await userCredential.user.getIdToken();
        localStorage.setItem("teacherFirebaseToken", token);
        await FacultyContext.facultyLogin(userDetails);
        try {
         router.push("/Details");
        } catch (error) {
          console.log(error);
        }
      }
      
    } catch (error) {
     setError(true)
      console.log(error);
    }
  }
  return (
    <div>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="Your Company"
            src="/professor.png"
            height={"64"}
            width={"64"}
            className="mx-auto h-20 w-auto"
          />
          {error===true && <Alert message="invalid credentials entered"/> }
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="rollno"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                University Roll Number
              </label>
              <div className="mt-2">
                <input
                  id="rollno"
                  name="rollNo"
                  type="text"
                  value={userDetails.rollNo}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userDetails.email}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={userDetails.password}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
