import { configureStore } from '@reduxjs/toolkit';
import getLocalStorageRecommendations, {
  syncRecommendationsLocalStorageWithReduxState,
} from './localStorage/recommendationsStorage';
import recommendationsReducer from './reducers/recommendationsSlice';
import sessionSlice from './reducers/sessionSlice';

const cacheSync = (store: any) => (next: any) => (action: any) => {
  const res = next(action);
  syncRecommendationsLocalStorageWithReduxState(store.getState());
  return res;
};

export const test = 'test';

const store = configureStore({
  reducer: {
    recommendations: recommendationsReducer,
    session: sessionSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cacheSync),
  preloadedState: getLocalStorageRecommendations(),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
