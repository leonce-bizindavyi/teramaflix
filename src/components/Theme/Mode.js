"use client"
import React, { useState, useEffect } from "react";
const LightMode = () => {
  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
          setDarkmode(true);
        }
      }, []);
    
      useEffect(() => {
        if (darkmode) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      }, [darkmode]);
    
  return (
    <div className="">
      <button
        type="button"
        className={`hs-dark-mode-active:block ${
          darkmode ? "hidden" : ""
        } hs-dark-mode w-[2.5rem] h-[2.5rem] md:w-[3rem] md:h-[3rem] lg:w-[2.8rem] lg:h-[2.8rem] rounded-full hover:bg-slate-200 group flex items-center font-medium`}
        onClick={() => setDarkmode(!darkmode)}
      >
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-auto hover:text-slate-600 text-slate-500 w-6 h-6 md:w-9 md:h-9 lg:w-8 lg:h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
       </svg>
      </button>
      <button
        type="button"
        className={`hs-dark-mode-active:hidden ${
          darkmode ? "" : "hidden"
        } hs-dark-mode w-[2.5rem] h-[2.5rem] md:w-[3rem] md:h-[3rem] lg:w-[2.8rem] lg:h-[2.8rem] rounded-full bg-slate-700 hover:bg-slate-600 group flex items-center font-medium`}
        onClick={() => setDarkmode(!darkmode)}
      >
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-auto text-white w-7 h-7 md:w-9 md:h-9 lg:w-8 lg:h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
      </button>
    </div>
  );
};
export default LightMode;