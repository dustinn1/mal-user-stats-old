import { createContext, useState, FunctionComponent } from "react";

interface Settings {
  language: string;
  updateLanguage: Function;
}

export const SettingsContext = createContext<Settings>({} as Settings);

export const SettingsContextProvider: FunctionComponent = ({ children }) => {
  const [language, setLanguage] = useState<string>(
    localStorage.getItem("language") as string
  );

  function updateLanguage(language: "romaji" | "english" | "japanese") {
    setLanguage(language);
    localStorage.setItem("language", language);
  }

  return (
    <SettingsContext.Provider
      value={{ language: language, updateLanguage: updateLanguage }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
