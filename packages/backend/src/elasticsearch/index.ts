import generateMovie from "@ramp/utils/utils/generateMovie";
import {movieIds} from "@ramp/utils/mocks/movies";

const { Client } = require('@elastic/elasticsearch');
export const elasticSearchClient = new Client({ node: 'http://localhost:9200',  });

export enum INDEXES {
  RECOMMENDATIONS = 'recommendations',
}


const indexMoviesData = async () => {
  await Promise.all(
    movieIds.map(async (movieId, index) => {
      console.log('index', movieId);
      await elasticSearchClient.index({
        index: INDEXES.RECOMMENDATIONS,
        body: generateMovie({
          title: 'Movie ' + index,
          imageHref: `https://artist.api.cdn.hbo.com/images/${movieId}/tileburnedin?v=d4dbabafcc34ec8cf580c1faa921674d&size=400x400&compression=low&protection=false&scaleDownToFit=false&productCode=hboMax&overlayImage=urn:warnermedia:brand:not-in-a-hub`,
          description: '',
          rating: '5',
        }),
      });
    }),
  );
};

const setupElasticSearchData = async () => {
  await elasticSearchClient.search({ index: INDEXES.RECOMMENDATIONS }).catch(async (err) => {
    console.error(err);
    await indexMoviesData();
  });
};
export default setupElasticSearchData
