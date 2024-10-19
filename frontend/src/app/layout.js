"use client"; // This makes the layout a client component

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider, AuthContext } from "./Context/AuthProvider"; // Correctly importing AuthContext



import Navbar from "./Components/Navbar";
import { AdminProvider } from "./Context/AdminProvider";
import { FacultyProvider } from "./Context/FacultyProvider";

import { OnlineClassProvider } from "./Context/OnlineClassProvider";
import { RoleProvider } from "./Context/RoleProvider";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body className={inter.className}>
        <RoleProvider>
          <OnlineClassProvider>
            <AdminProvider>
              <FacultyProvider>
                <AuthProvider>
                  <Navbar />

                  {children}
                </AuthProvider>
              </FacultyProvider>
            </AdminProvider>
          </OnlineClassProvider>
        </RoleProvider>
      </body>
    </html>
  );
}
