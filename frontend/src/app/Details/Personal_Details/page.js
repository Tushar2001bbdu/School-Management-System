"use client";
import React, { useContext } from "react";
import Student_Personal_Data from "../../Components/StudentDetails";

import { AuthContext } from "@/app/Context/AuthProvider";
import FacultyProfile from "@/app/Components/FacultyProfile";
import StudentDetails from "../../Components/StudentDetails";
export default function page() {
  
  return (
    <>
      <FacultyProfile />
    </>
  );
}
