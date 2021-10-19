import React, { useState } from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import MovieSlide from '@components/RecommendationsRow/components/MovieSlide';

import { useKeenSlider } from 'keen-slider/react';
import useKeenSliderProps from '@components/RecommendationsRow/hooks/useKeenSliderProps';

import { IRecommendationsSection } from '@ramp/utils/types/recommendationsSection';
import styles from './RecommendationsRow.module.scss';
// Import css files
import 'keen-slider/keen-slider.min.css';

export interface IRecommendationsRowProps extends IRecommendationsSection {}

const StyledArowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${({ slideHeight }: { slideHeight: number }) => slideHeight / 2}px;
  transform: translateY(-50%);
  background: transparent;
  border: none;

  width: 20px;
  height: 20px;

  color: #fff;
  z-index: 2;
  cursor: pointer;

  svg {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 520px) {
    display: none;
  }
`;
/**
 * Row with various recommendations
 */
function RecommendationsRow(props: IRecommendationsRowProps) {
  const {
    items, title, slideWidth, slideHeight,
  } = props;
  const { slidesPerView, loop, slidesWidth } = useKeenSliderProps({
    slideWidth,
    slidesAmount: items.length,
  });
  const [relativeSlide, setRelativeSlide] = useState(0);
  const handleChangeRelativeSlide = (relativeSlideIndex: number) => {
    if (relativeSlide !== relativeSlideIndex) {
      setRelativeSlide(relativeSlideIndex);
    }
  };

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView,
    loop,
    mode: 'snap',
    duration: 600,
    slideChanged: (slider) => handleChangeRelativeSlide(slider.details().relativeSlide),
  });

  const isNextDisabled = !loop && relativeSlide + slidesPerView >= items.length;
  const isPrevButtonDisabled = !loop && relativeSlide === 0;

  const handleGoNext = () => {
    const nextSlide = relativeSlide + Number(slidesPerView);
    slider.moveToSlideRelative(nextSlide, true);
    return handleChangeRelativeSlide(nextSlide);
  };
  const handleGoPrev = () => {
    const nextSlide = relativeSlide - Number(slidesPerView);
    slider.moveToSlideRelative(nextSlide, true);
  };

  if (Number.isNaN(slidesPerView)) {
    return null;
  }

  return (
    <div className={styles.root}>
      <Typography
        marginBottom="8px"
        className={styles.title}
        variant="h4"
        fontWeight={700}
      >
        {title.text}
      </Typography>
      <div className={styles.sliderWrapper}>
        <div ref={sliderRef} className={`${styles.slider} keen-slider`}>
          {items.map((movie, index) => (
            <div
              className={`keen-slider__slide number-slide${index}`}
              style={{ minWidth: slidesWidth || slideWidth, height: slideHeight }}
              key={movie.imageHref + movie.title + index}
            >
              {Number.isNaN(slidesPerView) ? null : (
                <MovieSlide
                  key={movie.imageHref}
                  index={index}
                  {...movie}
                  slideHeight={slideHeight}
                  isLast={index + 1 === items.length}
                />
              )}
            </div>
          ))}
        </div>
        {!isPrevButtonDisabled && (
          <StyledArowButton
            type="button"
            className={styles.arrowLeft}
            onClick={handleGoPrev}
            slideHeight={slideHeight}
          >
            <KeyboardArrowLeft color="inherit" />
          </StyledArowButton>
        )}
        {!isNextDisabled && (
          <StyledArowButton
            type="button"
            className={styles.arrowRight}
            onClick={handleGoNext}
            slideHeight={slideHeight}
          >
            <KeyboardArrowRight color="inherit" />
          </StyledArowButton>
        )}
      </div>
    </div>
  );
}

export default RecommendationsRow;
