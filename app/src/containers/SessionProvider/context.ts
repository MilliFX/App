import { createContext } from "react";
import { initialState, SessionState } from "./state";

export const SessionContext = createContext<SessionState>(initialState);
