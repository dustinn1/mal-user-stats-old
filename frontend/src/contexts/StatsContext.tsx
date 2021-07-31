import { createContext, useState, FunctionComponent } from "react";
import statsJSON from "../interfaces/StatsJson";

interface Stats {
  data: statsJSON;
  updateData: Function;
}

export const StatsContext = createContext<Stats>({} as Stats);

export const StatsContextProvider: FunctionComponent = ({ children }) => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data") as string) as statsJSON
  );

  function updateData(data: statsJSON) {
    setData(data);
    localStorage.setItem("data", JSON.stringify(data));
  }

  return (
    <StatsContext.Provider value={{ data: data, updateData: updateData }}>
      {children}
    </StatsContext.Provider>
  );
};
