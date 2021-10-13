import {IMovie} from "@ramp/utils/types/index";

const generateMovie = ({ title, description, imageHref, rating }): IMovie => ({
  title,
  description,
  imageHref,
  rating,
});

export default generateMovie