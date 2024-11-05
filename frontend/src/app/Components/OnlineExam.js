"use client";
import React from "react";
import questions from "../questions";
export default function OnlineExam() {
  return (
    <div>
      <div className="heading text-center">
        <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Online Test
        </h2>
      </div>
      <div className="questions-container ">
        {questions.map((element, index) => {
          return (
            <div
              className="question-card my-7 mx-4 box bg-white px-7 py-7"
              key={index}
            >
              <h3 className="question-text my-3 text-center">
                {element.question}
              </h3>
              <div className="grid grid-rows-2 grid-cols-2 gap-4 question-options">
                <div>
                  {" "}
                  <a
                    href="#_"
                    class="block items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
                  >
                    <svg
                      class="w-5 h-5 mr-2 rounded-full"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                    <span class="relative">{element.option1}</span>
                  </a>
                </div>
                <div>
                  {" "}
                  <a
                    href="#_"
                    class="block items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
                  >
                    <svg
                      class="w-5 h-5 mr-2 rounded-full"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                    <span class="relative">{element.option2}</span>
                  </a>
                </div>
                <div>
                  {" "}
                  <a
                    href="#_"
                    class="block items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
                  >
                    <svg
                      class="w-5 h-5 mr-2 rounded-full"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                    <span class="relative">{element.option3}</span>
                  </a>
                </div>
                <div>
                  {" "}
                  <a
                    href="#_"
                    class="block items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500"
                  >
                    <svg
                      class="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                    <span class="relative">{element.option4}</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="submit text-center">
        <a
          href="#_"
          class="relative inline-flex items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
        >
          <span class="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
          <span class="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
            <span class="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
            <span class="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
          </span>
          <span class="relative text-white">Submit Answer</span>
        </a>
      </div>
    </div>
  );
}
