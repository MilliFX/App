import * as React from "react";
import { SessionContext } from "./context";
import { initialState, SessionState } from "./state";
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";

export const SessionProvider: React.FC = ({ children }) => {
  const now = Date();
  const [session, setSession] = useState<SessionState>(initialState);
  // TODO: AP-118
  // TODO: AP-119
  const uuidGenerator = () => {
    // localStorage.removeItem("uuid");
    if (!localStorage.uuid) {
      const uuid = uuidv1();
      localStorage.setItem("uuid", uuid);
      setSession({ uuid: localStorage.uuid });
    }
  };
  uuidGenerator();
  // TODO: AP-120
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
