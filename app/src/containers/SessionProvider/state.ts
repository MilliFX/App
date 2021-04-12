export interface SessionState {
  uuid?: string;
}

export const initialState: SessionState = {
  uuid: localStorage.uuid,
};
