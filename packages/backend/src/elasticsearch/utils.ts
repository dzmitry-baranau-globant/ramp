import {IRecommendationsSection} from "@ramp/utils/types/recommendationsSection";

export const normalizeElasticQueryData = (
  data: any,
  options: Pick<IRecommendationsSection, "slideHeight" | "slideWidth" | "title"> = {
    title: { text: 'Recommendations', color: 'any' },
    slideHeight: 240,
    slideWidth: 200,
  },
) => {
  return {
    items: data.hits.hits.map(({ _source }) => _source),
    ...options,
  };
};
