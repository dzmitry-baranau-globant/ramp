import {IMovie} from "@ramp/utils/types/index";

export interface IRecommendationsSection {
  title: { color?: string, text: string },
  items: IMovie[]
  slideHeight?: number
  slideWidth?: number
}