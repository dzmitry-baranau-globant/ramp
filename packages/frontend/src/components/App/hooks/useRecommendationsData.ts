import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRecommendationsSection } from '@ramp/utils/types/recommendationsSection';
import { Routes } from '@ramp/utils/types/routes';
import { setRecommendations } from '@store/reducers/recommendationsSlice';
import { RootState } from '@store/store';
import { Dispatch } from '@reduxjs/toolkit';
import fetchRequest, { onUnauthorizedFetchRequest } from '../../../utils/fetchRequest';

export async function fetchRecommendations(dispatch: Dispatch) {
  const moviesSection = (await fetchRequest<IRecommendationsSection[]>(
    `${process.env.REACT_APP_BACKEND_ENDPOINT}${Routes.GET_MOVIES}`,
    onUnauthorizedFetchRequest,
    dispatch,
  )) ?? [];
  dispatch(setRecommendations(moviesSection));
}

const useRecommendationsData = (): IRecommendationsSection[] => {
  const recommendations = useSelector((state: RootState) => state.recommendations.recommendations);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchRecommendations(dispatch);
  }, []);
  return recommendations;
};

export default useRecommendationsData;
