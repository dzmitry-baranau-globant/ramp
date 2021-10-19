import store2 from 'store2';
import { IRecommendationsSection } from '@ramp/utils/types/recommendationsSection';
import { RootState } from '@store/store';
import {
  RecommendationsInitialState,
  recommendationsInitialState,
} from '../reducers/recommendationsSlice';
import { sessionInitialState } from '../reducers/sessionSlice';

export enum LocalStorageNamespace {
  STORE = 'STORE',
  DAILY_RECS = 'DAILY_RECS',
}

interface IDailyRecs {
  [date: string]: IRecommendationsSection[];
}

const MAX_RECOMENDATIONS_CACHE_SIZE_IN_DAYS = 10;
export const getCurrentDate = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};

export const cacheCurrentDayRecommendations = (recs: IRecommendationsSection[]) => {
  if (Array.isArray(recs) && recs.length !== 0) {
    const dailyRecs: IDailyRecs = store2(LocalStorageNamespace.DAILY_RECS) ?? {};

    const currentDate = getCurrentDate();

    dailyRecs[currentDate] = recs;

    const dailyRecsKeys = Object.keys(dailyRecs);
    if (dailyRecsKeys.length > MAX_RECOMENDATIONS_CACHE_SIZE_IN_DAYS) {
      delete dailyRecs[dailyRecsKeys[0]];
    }
    store2(LocalStorageNamespace.DAILY_RECS, dailyRecs);
  }
};

export const getCachedEverydayRecommendations = (): IDailyRecs => store2(LocalStorageNamespace.DAILY_RECS) ?? {};

export const syncRecommendationsLocalStorageWithReduxState = (store: RootState) => {
  const updatedStore: RootState = {
    ...store,
    recommendations: { ...store.recommendations, selectedCachedDate: null },
  };
  store2(LocalStorageNamespace.STORE, updatedStore);
};

const getLocalStorageRecommendations = () => {
  const localCache = store2(LocalStorageNamespace.STORE);
  if (!localCache) {
    return { recommendations: recommendationsInitialState, session: sessionInitialState };
  }
  return localCache;
};

export default getLocalStorageRecommendations;
