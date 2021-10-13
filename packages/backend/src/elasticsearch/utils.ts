export const normalizeElasticQueryData = (
  data: any,
  options = {
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
