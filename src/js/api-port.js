import axios from 'axios';

const API = axios.create({
  baseURL: 'https://wedding-photographer.b.goit.study/api',
});

export const getCategories = async () => {
  const { data } = await API.get('/categories');

  return data;
};

export const getWeddingPhotos = async (
  categoryId = '',
  page = 1,
  limit = 9
) => {
  const params = {
    page,
    limit,
    sortName: 'title',
  };

  if (categoryId) {
    params.categoryId = categoryId;
  }

  const { data } = await API.get('/wedding-photos', {
    params,
  });

  return data;
};
