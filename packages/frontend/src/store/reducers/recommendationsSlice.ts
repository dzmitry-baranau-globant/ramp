import { createSlice } from '@reduxjs/toolkit';
import { IRecommendationsSection } from '@ramp/utils/types/recommendationsSection';

export class RecommendationsInitialState {
  recommendations: IRecommendationsSection[];

  extendedGrid: boolean;

  selectedCachedDate?: string;
}

export const recommendationsInitialState: RecommendationsInitialState = {
  recommendations: [],
  extendedGrid: true,
  selectedCachedDate: null,
};

export const recommendationsSlice = createSlice({
  name: 'root',
  initialState: recommendationsInitialState,
  reducers: {
    setRecommendations: (
      state,
      { payload }: { payload: { sections: IRecommendationsSection[]; date?: string } },
    ) => {
      state.recommendations = payload.sections;
    },
    switchExtendedGrid: (state) => {
      state.extendedGrid = !state.extendedGrid;
    },
    selectCachedRecommendationsDay: (
      state,
      { payload: { date } }: { payload: { date: string } },
    ) => {
      console.log({ date });
      state.selectedCachedDate = date;
    },
  },
});

export const { setRecommendations, switchExtendedGrid, selectCachedRecommendationsDay } = recommendationsSlice.actions;

export default recommendationsSlice.reducer;
