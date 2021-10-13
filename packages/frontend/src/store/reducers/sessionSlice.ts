import { createSlice } from '@reduxjs/toolkit';

interface ISessionState {
  jwt: string | null;
}

export const sessionInitialState: ISessionState = {
  jwt: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: sessionInitialState,
  reducers: {
    setJWT: (state, { payload }: { payload: string | null }) => {
      state.jwt = payload;
    },
  },
});

export const { setJWT } = sessionSlice.actions;

export default sessionSlice.reducer;
