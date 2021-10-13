import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRecommendationsSection } from '@ramp/utils/types/recommendationsSection';
import { Routes } from '@ramp/utils/types/routes';
import { setRecommendations } from '../../../store/reducers/recommendationsSlice';
import { RootState } from '../../../store';

const useRecommendationsData = (): IRecommendationsSection[] => {
  const recommendations = useSelector((state: RootState) => state.recommendations.recommendations);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function fetchRecommendations() {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}${Routes.GET_MOVIES}`,
      ).catch((err) => console.log(err));
      if (res) {
        const moviesSection = await res.json();
        if (moviesSection) {
          dispatch(setRecommendations(moviesSection));
        }
      }
    }());
  }, []);
  return recommendations;
};

export default useRecommendationsData;
