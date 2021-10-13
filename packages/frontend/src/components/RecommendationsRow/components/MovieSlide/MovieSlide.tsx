import styled from 'styled-components';
import React from 'react';
import styles from './MovieSlide.module.scss';
import {IMovie} from "@ramp/utils/types/index";

export interface IMovieSlideProps extends IMovie {
  index: number;
  slideHeight: number
}

const StyledSlide = styled.div`
  background: ${({ index }: {index: number}) => `rgba(255,255,255, 0.${index + 1})`};
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
