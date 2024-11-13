"use client"

import { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie'

export const AdminContext = createContext();


export function AdminProvider({ children }) {

  async function sendPhoto(image) {
    let url = `http://localhost:3001/app/attendance/sendphoto`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      }
      , body: JSON.stringify({
        "url": image,
        "rollno": Cookies.get("rollno")
      })


    });



  }
  async function sendPhoto(image) {
    let url = `http://localhost:3001/app/exam/sendphoto`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      }
      , body: JSON.stringify({
        "url": image,
        "rollno": "1210438058"
      })


    });



  }




  return (
    <AdminContext.Provider value={{ sendPhoto }}>
      {children}
    </AdminContext.Provider>
  );
}
