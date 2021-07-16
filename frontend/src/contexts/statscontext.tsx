import { createContext } from "react";
import statsJSON from "../interfaces/statsjson";

export const StatsContext = createContext<statsJSON>({} as statsJSON);
