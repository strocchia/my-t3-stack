import React, { useState, useEffect } from "react";

export function useDarkMode_og() {
  // const [theme, setTheme] = useState(
  //   typeof window !== "undefined" ? localStorage.getItem("color-theme") : "dark"
  // );
  // // let colorTheme = "";
  // // if (theme === "dark") {
  // //   colorTheme = "light";
  // // } else {
  // //   colorTheme = "dark";
  // // }
  // const colorTheme = theme === "dark" ? "light" : "dark";
  // useEffect(() => {
  //   if (
  //     localStorage.getItem("color-theme") === "light" ||
  //     !("color-theme" in localStorage)
  //   ) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("color-theme", theme);
  //   }
  // }, [theme]);
  // // useEffect(() => {
  // //   window.document.documentElement.classList.remove(colorTheme);
  // //   window.document.documentElement.classList.add(theme);
  // //   if (typeof window !== "undefined") {
  // //     localStorage.setItem("theme", theme);
  // //   }
  // // }, [theme]);
  // return [colorTheme, setTheme];

  const [theme, setTheme] = useState(
    "dark"
    // typeof window !== "undefined" ? localStorage.getItem("color-theme") : "dark"
  );

  function changeTheme() {
    if (theme === "light") {
      window.document.querySelector("html")?.classList?.add?.("dark");
      // localStorage.setItem("color-theme", "dark");
      setTheme("dark");
    } else {
      window.document.querySelector("html")?.classList?.remove?.("dark");
      // localStorage.setItem("color-theme", "light");
      setTheme("light");
    }
  }

  useEffect(() => {
    window.document.querySelector("html")?.classList?.add?.("dark");
  }, []);

  useEffect(() => {
    // if (theme === "light") {
    //   window.document.querySelector("html")?.classList?.remove("dark");
    // } else {
    //   window.document.querySelector("html")?.classList?.add("dark");
    // }
  }, [theme]);

  return { theme, changeTheme };
}

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(
    typeof window !== "undefined" ? localStorage.getItem("color-mode") : "light"
  );

  useEffect(() => {
    if (darkMode == "light") {
      document.documentElement.classList.add("dark");
      // localStorage.setItem("color-mode", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      // localStorage.setItem("color-mode", "light");
    }

    if (typeof window !== "undefined") {
      // console.log(darkMode);
      localStorage.setItem("color-mode", darkMode as string);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    if (darkMode === "dark") {
      setDarkMode("light");
    } else {
      setDarkMode("dark");
    }
  };

  return { darkMode, toggleDarkMode };
};
