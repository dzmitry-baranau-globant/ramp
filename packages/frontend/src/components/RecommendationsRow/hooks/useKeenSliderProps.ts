import useWindowSize from '@components/RecommendationsRow/hooks/useWindowSize';

const useKeenSliderProps = ({
  maxSliderWidth = 1800,
  slideWidth = 150,
  slidesAmount = 0,
  slideSpace,
}) => {
  const { width } = useWindowSize();
  const sliderWidth = width * 0.8 > maxSliderWidth
    ? maxSliderWidth
    : Number((width * 0.8 - 12).toFixed(1));
  const slidesPerView = Math.floor(sliderWidth / slideWidth);
  const slidesWidth = (sliderWidth - (slidesPerView - 1) * slideSpace) / slidesPerView;
  // @ts-ignore
  const isTouchscreen = Boolean('ontouchstart' in window || navigator.msMaxTouchPoints);
  const loop = slidesPerView * 2 < slidesAmount;
  return {
    slidesPerView,
    isTouchscreen,
    loop,
    slidesWidth,
  };
};

export default useKeenSliderProps;
