import { createContext, useState, FunctionComponent } from "react";
import statsJSON from "../interfaces/StatsJson";

export const StatsContext = createContext<statsJSON>({} as statsJSON);

export const StatsContextProvider: FunctionComponent = ({ children }) => {
  const [data] = useState(
    JSON.parse(localStorage.getItem("data") as string) as statsJSON
  );

  return <StatsContext.Provider value={data}>{children}</StatsContext.Provider>;
};
