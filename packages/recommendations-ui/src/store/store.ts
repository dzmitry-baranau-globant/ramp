import { configureStore } from '@reduxjs/toolkit';
import getLocalStorageRecommendations, {
  syncRecommendationsLocalStorageWithReduxState,
} from './localStorage/recommendationsStorage';
import recommendationsReducer from './reducers/recommendationsSlice';

const cacheSync = (store: any) => (next: any) => (action: any) => {
  const res = next(action);
  syncRecommendationsLocalStorageWithReduxState(store.getState());
  return res;
};

const store = configureStore({
  reducer: {
    recommendations: recommendationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cacheSync),
  preloadedState: getLocalStorageRecommendations(),
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
