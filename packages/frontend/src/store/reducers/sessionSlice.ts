import { createSlice } from '@reduxjs/toolkit';

type ISnackbarSeverity = 'success' | 'info' | 'warning' | 'error';
interface ISessionState {
  jwt: string | null;
  snackbar: {
    message: string;
    isOpen: boolean;
    snackbarSeverity: ISnackbarSeverity;
  };
}

export const sessionInitialState: ISessionState = {
  jwt: null,
  snackbar: {
    snackbarSeverity: 'info',
    message: '',
    isOpen: false,
  },
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: sessionInitialState,
  reducers: {
    setJWT: (state, { payload }: { payload: string | null }) => {
      state.jwt = payload;
    },
    setSnackbarMessage: (
      state,
      {
        payload: { message, severity = 'info' },
      }: { payload: { message: string; severity?: ISnackbarSeverity } },
    ) => {
      state.snackbar.message = message;
      state.snackbar.snackbarSeverity = severity;
      state.snackbar.isOpen = true;
    },
    closeSnackBarMessage: (state) => {
      state.snackbar.message = '';
      state.snackbar.isOpen = false;
    },
  },
});

export const { setJWT, closeSnackBarMessage, setSnackbarMessage } = sessionSlice.actions;

export default sessionSlice.reducer;
