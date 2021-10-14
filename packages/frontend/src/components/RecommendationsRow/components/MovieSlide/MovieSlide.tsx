import styled from 'styled-components';
import React from 'react';
import { IMovie } from '@ramp/utils/types/index';
import styles from './MovieSlide.module.scss';

export interface IMovieSlideProps extends IMovie {
  index: number;
  slideHeight: number;
}

/**
 * Slide with movie info
 */
function MovieSlide(props: IMovieSlideProps) {
  const { title, imageHref, slideHeight } = props;
  return <img src={imageHref} alt={title} className={styles.img} style={{ height: slideHeight }} />;
}

export default MovieSlide;
