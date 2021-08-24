import { createContext } from "react";

interface Theme {
  theme: string;
  updateTheme: Function;
}

export const ThemeContext = createContext({} as Theme);
