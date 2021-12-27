import { createContext } from "react";

interface Theme {
  theme: "system" | "light" | "dark";
  colorTheme: "light" | "dark";
  updateTheme: Function;
}

export const ThemeContext = createContext({} as Theme);
