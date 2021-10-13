import styled from 'styled-components';
import React from 'react';
import { Typography } from '@mui/material';
import { generateMovie } from '@components/App/hooks/useRecommendationsData';
import styles from './MovieSlide.module.scss';

export interface IMovieSlideProps extends ReturnType<typeof generateMovie> {
  index: number;
  slideHeight: number
}

const StyledSlide = styled.div`
  background: ${({ index }) => `rgba(255,255,255, 0.${index + 1})`};
`;

/**
 * Slide with movie info
 */
function MovieSlide(props: IMovieSlideProps) {
  const {
    index, title, description, rating, imageHref,
    slideHeight,
  } = props;
  return (
    <div className={styles.wrapper}>
      <StyledSlide index={index} className={styles.root} style={{ height: slideHeight }}>
        <img src={imageHref} alt={title} className={styles.img} />
      </StyledSlide>
      {/* <Typography fontWeight={600} className={styles.title}>
        {title}
      </Typography> */}
    </div>
  );
}

export default MovieSlide;
