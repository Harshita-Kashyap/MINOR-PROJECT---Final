import { createContext, useEffect, useMemo, useState } from "react";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.add("theme-changing");

    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    const timer = setTimeout(() => {
      root.classList.remove("theme-changing");
    }, 300);

    return () => clearTimeout(timer);
  }, [dark]);

  const toggleTheme = () => {
    setDark((prev) => !prev);
  };

  const setTheme = (theme) => {
    setDark(theme === "dark");
  };

  const value = useMemo(
    () => ({
      dark,
      theme: dark ? "dark" : "light",
      toggleTheme,
      setTheme,
    }),
    [dark]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}