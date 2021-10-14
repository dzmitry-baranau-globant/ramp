import store2 from 'store2';
import { recommendationsInitialState } from '../reducers/recommendationsSlice';
import { sessionInitialState } from '../reducers/sessionSlice';

export enum LocalStorageNamespace {
  STORE = 'STORE',
}

export const syncRecommendationsLocalStorageWithReduxState = (store) => {
  store2(LocalStorageNamespace.STORE, store);
};

const getLocalStorageRecommendations = () => {
  const localStorage = store2(LocalStorageNamespace.STORE);
  if (!localStorage) {
    return { recommendations: recommendationsInitialState, session: sessionInitialState };
  }
  return localStorage;
};

export default getLocalStorageRecommendations;
