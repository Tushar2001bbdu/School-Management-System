"use client";
import { Inter } from "next/font/google";
import { useContext } from "react";
import { RoleContext } from "../Context/RoleProvider";
import StudentSidebar from "../Components/StudentSideBar";
import FacultySidebar from "../Components/FacultySideBar";
const inter = Inter({ subsets: ["latin"] });
const Layout = ({ children }) => {
  const { role } = useContext(RoleContext);

  return (
    <div className=" grid grid-cols-12">
      <div className="col-span-4">
        <StudentSidebar />
        
      </div>
      <div className="col-span-8">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
