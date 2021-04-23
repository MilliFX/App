import * as React from "react";
import { SessionContext } from "./context";
import { initialState, SessionState } from "./state";
import { useState } from "react";
import { useUUID } from "./useUUID";

export const SessionProvider: React.FC = ({ children }) => {
  const uuid = useUUID();

  const [session] = useState<SessionState>({
    ...initialState,
    uuid: uuid,
  });

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
