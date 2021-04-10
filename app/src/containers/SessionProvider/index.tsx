import * as React from "react";
import { SessionContext } from "./context";
import { initialState, SessionState } from "./state";
import { useState } from "react";

export const SessionProvider: React.FC = ({ children }) => {
  const now = Date();
  const [session, setSession] = useState<SessionState>(initialState);
  // TODO: AP-118
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
