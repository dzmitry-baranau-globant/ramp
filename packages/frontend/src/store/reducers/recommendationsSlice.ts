import { createSlice } from '@reduxjs/toolkit';
import { fakeData } from '@components/App/hooks/useRecommendationsData';
import {IRecommendationsSection} from "@ramp/utils/types/recommendationsSection";

export const recommendationsInitialState: { recommendations: IRecommendationsSection[], extendedGrid: boolean } = { recommendations: [], extendedGrid: true };

export const recommendationsSlice = createSlice({
  name: 'root',
  initialState: recommendationsInitialState,
  reducers: {
    setRecommendations: (state, { payload }: { payload: typeof fakeData }) => {
      state.recommendations = payload;
    },
    switchExtendedGrid: (state, { payload }) => {
      state.extendedGrid = !state.extendedGrid;
    },
  },
});

export const { setRecommendations, switchExtendedGrid } = recommendationsSlice.actions;

export default recommendationsSlice.reducer;
