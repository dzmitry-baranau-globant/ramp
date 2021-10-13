import { movieIds } from './sampleData';

const { Client } = require('@elastic/elasticsearch');
export const elasticSearchClient = new Client({ node: 'http://localhost:9200' });

export enum INDEXES {
  RECOMMENDATIONS = 'recommendations',
}

export const generateMovie = ({ title, description, imageHref, rating }) => ({
  title,
  description,
  imageHref,
  rating,
});
const items = [
  generateMovie({
    title: '365 Days',
    description:
      'A woman falls victim to a dominant mafia boss, who imprisons her and gives her one year to fall in',
    imageHref:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/96647665-be26-4de2-9f63-bdf7ed652620/600x900',
    rating: '3.3',
  }),
  generateMovie({
    title: 'Fantasy Island',
    description:
      'What can the island do for you? Any fantasy requested by guests is fulfilled, although they rarely turn out as expected.',
    imageHref: 'https://m.media-amazon.com/images/I/81lcJtr+toL._SL1500_.jpg',
    rating: '5.5',
  }),
  generateMovie({
    title: 'The Midnight Sky',
    description:
      'In the aftermath of a global catastrophe, a lone scientist in the Arctic races to contact a crew of astronauts with a warning not to return',
    imageHref:
      'https://upload.wikimedia.org/wikipedia/ru/thumb/a/a1/The_Midnight_Sky.png/202px-The_Midnight_Sky.png',
    rating: '5',
  }),
  generateMovie({
    title: 'Extraction',
    description:
      "A hardened mercenary's mission becomes a soul-searching race to survive when he's sent into Bangladesh to rescue a drug lord's kidnapped son.",
    imageHref:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/b5e622a2-f19a-458c-8e74-f905a913e0ad/300x450',
    rating: '6.7',
  }),
  generateMovie({
    title: 'The Turning',
    description:
      'Kate Mandell takes a job as a nanny for two young orphans at an isolated Gothic mansion in the Maine countryside. She soon learns that the children -- Miles and',
    imageHref: 'https://i.ytimg.com/vi/EdWbFJ15P1Y/movieposter_en.jpg',
    rating: '5.5',
  }),
  generateMovie({
    title: 'The New Mutants',
    description:
      'The New Mutants is a coming-of-age story in which the internal and biochemical struggles that plague us all are externalized into something grand and',
    imageHref:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/43c9b26f-6125-4dbe-895b-b0cc683d3cdd/300x450',
    rating: '5.6',
  }),
  generateMovie({
    title: 'You should have left',
    description:
      'Уже немолодой банкир на пенсии Тэо Конрой женат на востребованной актрисе Сюзанне, и из-за её занятости супруги проводят вместе не так много времени. Когда у Сюзанны выдаётся перерыв в съёмках, они вместе с шестилетней дочкой отправляются отдохнуть в снятый через интернет дизайнерский особняк в уэльской глуши.',
    imageHref:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/28f53954-6c8c-46ed-a447-c9644d5f1e0b/300x450',
    rating: '5.5',
  }),
  generateMovie({
    title: 'Infinite',
    description:
      'For Evan McCauley (Mark Wahlberg), skills he has never learned and memories of places he has never visited haunt his daily life. Self-medicated',
    imageHref:
      'https://upload.wikimedia.org/wikipedia/ru/4/4f/%D0%91%D0%B5%D1%81%D0%BA%D0%BE%D0%BD%D0%B5%D1%87%D0%BD%D0%BE%D1%81%D1%82%D1%8C_%28%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%2C_2021%29.jpeg',
    rating: '5.5',
  }),
  generateMovie({
    title: 'Sweet Girl',
    description:
      'Sweet Girl is a 2021 American action thriller film directed by Brian Andrew Mendoza in his feature directorial debut and written by Philip Eisner and Gregg',
    imageHref:
      'https://m.media-amazon.com/images/M/MV5BOGIzOTZiZjItNTMyYS00ODcyLWE2ZDUtYWNjZDNmNTUxYjVkXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg',
    rating: '5.5',
  }),
  generateMovie({
    title: 'Without Remorse',
    description:
      "An elite Navy SEAL uncovers an international conspiracy while seeking justice for the murder of his pregnant wife in Tom Clancy's Without Remorse, the explosive",
    imageHref:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/4774061/ba59c372-2517-490e-8ad3-ada241375c18/300x450',
    rating: '5.8',
  }),
  generateMovie({
    title: 'Stranger Things',
    description:
      'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
    imageHref:
      'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/2f4bd9ea-ec01-4fa9-9812-575158aa71f2/600x900',
    rating: '8.7',
  }),
];

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
  console.log('INDEXED ALL MOVIES');
  // await Promise.all(
  //   items.map(
  //     async (movieItem) =>
  //       await elasticSearchClient.index({ index: INDEXES.RECOMMENDATIONS, body: movieItem }),
  //   ),
  // );
};

const setupElasticSearchData = async () => {
  await elasticSearchClient.search({ index: INDEXES.RECOMMENDATIONS }).catch(async (err) => {
    console.error(err);
    console.log('INDEXING MOVIES');
    await indexMoviesData();
  });
};

setupElasticSearchData().catch((err) => {
  console.error('ERROR SETTING UP ELASTIC', err);
});
