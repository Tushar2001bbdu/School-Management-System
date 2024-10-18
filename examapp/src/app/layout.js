"use client"; // This makes the layout a client component

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider, AuthContext } from "./Context/AuthProvider"; // Correctly importing AuthContext

import { usePathname } from "next/navigation";

import Navbar from "./Components/Navbar";
import { AdminProvider } from "./Context/AdminProvider";
import { FacultyProvider } from "./Context/FacultyProvider";
import FacultySidebar from "./Components/FacultySideBar";
import { OnlineClassProvider } from "./Context/OnlineClassProvider";
import { RoleProvider } from "./Context/RoleProvider";

const inter = Inter({ subsets: ["latin"] });

// The main RootLayout function
export default function RootLayout({ children }) {
  const path = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <RoleProvider>
          <OnlineClassProvider>
            <AdminProvider>
              <FacultyProvider>
                <AuthProvider>
                  <Navbar />

                  <div className=" grid grid-cols-12">
                    <div className="col-span-4">
                      {path.includes("Details") && <FacultySidebar />}
                    </div>
                    <div className="col-span-8">{children}</div>
                  </div>
                </AuthProvider>
              </FacultyProvider>
            </AdminProvider>
          </OnlineClassProvider>
        </RoleProvider>
      </body>
    </html>
  );
}
