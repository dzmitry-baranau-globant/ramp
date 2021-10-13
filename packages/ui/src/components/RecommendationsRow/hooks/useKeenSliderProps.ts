import useWindowSize from '@components/RecommendationsRow/hooks/useWindowSize';

const useKeenSliderProps = ({ maxSliderWidth = 1800, slideWidth = 150, slidesAmount = 0 }) => {
  const { width } = useWindowSize();
  const swiperWidth = width * 0.8 > maxSliderWidth ? maxSliderWidth : Math.floor(width * 0.8);
  const slidesPerView = Math.floor(swiperWidth / slideWidth);
  // @ts-ignore
  const isTouchscreen = Boolean('ontouchstart' in window || navigator.msMaxTouchPoints);
  const loop = slidesPerView * 2 < slidesAmount;
  return {
    slidesPerView,
    isTouchscreen,
    loop,
  };
};

export default useKeenSliderProps;
