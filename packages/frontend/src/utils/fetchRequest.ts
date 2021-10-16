import getLocalStorageToken from '@store/localStorage/sessionStorage';
import { useDispatch } from 'react-redux';
import { setJWT, setSnackbarMessage } from '@store/reducers/sessionSlice';
import { Dispatch } from '@reduxjs/toolkit';

export const onUnauthorizedFetchRequest = (dispatch: Dispatch) => dispatch(setJWT(null));

const fetchRequest = async <T = undefined[]>(
  input: RequestInfo,
  onUnauthorized: any,
  dispatch: Dispatch,
  init?: RequestInit,
): Promise<T> => {
  const jwtToken = getLocalStorageToken();
  const modifiedInit: RequestInit = { ...init, headers: { Authorization: `Bearer ${jwtToken}` } };
  const res = await fetch(input, modifiedInit).catch((err) => {
    console.error(err);
    dispatch(
      setSnackbarMessage({ message: 'Recommendations server not available', severity: 'error' }),
    );
  });
  if (res) {
    if (res.status === 401) {
      onUnauthorized(dispatch);
    }
    const body = await res.json();
    return body;
  }
  return null;
};

export default fetchRequest;
