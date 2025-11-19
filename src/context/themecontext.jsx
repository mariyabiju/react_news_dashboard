// context/ThemeContext.js
import { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [category, setCategory] = useState("general");

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, category, setCategory }}>
      {children}
    </ThemeContext.Provider>
  );
}
