import { elasticSearchClient, INDEXES } from '../elasticsearch';
import { normalizeElasticQueryData } from '../elasticsearch/utils';
import { Express } from 'express';
import { recommendationsSections } from '@ramp/utils/mocks/movies';
import { IRecommendationsSection } from '@ramp/utils/types/recommendationsSection';
import { Routes } from '@ramp/utils/types/routes';

export default (app: Express) => {
  app.get(Routes.GET_MOVIES, async (req, res) => {
    const data = await Promise.all(
      recommendationsSections.map(async (sectionSettings, index) => {
        const { body } = await elasticSearchClient.search({
          index: INDEXES.RECOMMENDATIONS,
          body: {
            query: {
              match_all: {},
            },
            size: 100,
            from: index * 100,
          },
        });
        return {
          body,
          sectionSettings,
        };
      }),
    );
    const response: IRecommendationsSection[] = data.map(({ sectionSettings, body }) =>
      normalizeElasticQueryData(body, sectionSettings),
    );
    res.json(response);
  });
};
