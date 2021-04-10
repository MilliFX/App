import * as React from "react";
import { SessionContext } from "./context";
import { initialState, SessionState } from "./state";
import { useState, useEffect } from "react";
import { v1 as uuidv1 } from "uuid";

export const SessionProvider: React.FC = ({ children }) => {
  const now = Date();
  const [session, setSession] = useState<SessionState>(initialState);

  // TODO: AP-118
  useEffect(() => {
    if (!localStorage.getItem("uuid")) {
      const uuid: string = uuidv1();
      localStorage.setItem("uuid", uuid);
    }
    console.log(localStorage.getItem("uuid"));
  }, []);
  // TODO: AP-119
  // TODO: AP-120

  return (
    <SessionContext.Provider
      value={{
        ...session,
        uuid: "mock-uuid",
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
