import { createSlice } from '@reduxjs/toolkit';
import { IRecommendationsSection } from '@ramp/utils/types/recommendationsSection';

export class RecommendationsInitialState {
  recommendations: IRecommendationsSection[];

  extendedGrid: boolean;
}

export const recommendationsInitialState: RecommendationsInitialState = {
  recommendations: [],
  extendedGrid: true,
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
  },
});

export const { setRecommendations, switchExtendedGrid } = recommendationsSlice.actions;

export default recommendationsSlice.reducer;
