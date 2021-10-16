import styled from 'styled-components';
import React from 'react';
import { IMovie } from '@ramp/utils/types/index';
import styles from './MovieSlide.module.scss';

export interface IMovieSlideProps extends IMovie {
  index: number;
  slideHeight: number;
  isLast: boolean;
}

/**
 * Slide with movie info
 */
function MovieSlide(props: IMovieSlideProps) {
  const {
    title, imageHref, slideHeight, isLast,
  } = props;
  return (
    <img
      src={imageHref}
      alt={title}
      className={styles.img}
      style={{ height: slideHeight, borderRight: isLast ? 'none' : '1px solid rgb(42, 42, 42)' }}
    />
  );
}

export default MovieSlide;
