import { useContext } from "react";
import { SessionContext } from "./context";
import { SessionState } from "./state";

export const useSession = (): SessionState => useContext(SessionContext);
