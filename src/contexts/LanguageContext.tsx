import { createContext, useState, FunctionComponent } from "react";

interface Language {
  language: string;
  updateLanguage: Function;
}

function getSavedLanguage(): "romaji" | "english" | "japanese" {
  const local: string = localStorage.getItem("language")!;
  if (local === "romaji" || local === "english" || local === "japanese") {
    return local;
  } else {
    localStorage.setItem("language", "romaji");
    return "romaji";
  }
}

export const LanguageContext = createContext({} as Language);

export const LanguageContextProvider: FunctionComponent = ({ children }) => {
  const [language, setLanguage] = useState<"romaji" | "english" | "japanese">(
    getSavedLanguage()
  );

  function updateLanguage(language: "romaji" | "english" | "japanese") {
    setLanguage(language);
    localStorage.setItem("language", language);
  }

  return (
    <LanguageContext.Provider
      value={{
        language: language,
        updateLanguage: updateLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
