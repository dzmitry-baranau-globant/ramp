import { recommendationsSections } from '../elasticsearch/sampleData';
import { elasticSearchClient, INDEXES } from '../elasticsearch';
import { normalizeElasticQueryData } from '../elasticsearch/utils';
import { Express } from 'express';

export default (app: Express) => {
  app.get('/movies', async (req, res) => {
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
    const response = data.map(({ sectionSettings, body }) =>
      // @ts-ignore
      normalizeElasticQueryData(body, sectionSettings),
    );
    res.json(response);
  });
};
