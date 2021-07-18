import { createContext } from "react";
import statsJSON from "../interfaces/StatsJson";

export const StatsContext = createContext<statsJSON>({} as statsJSON);
