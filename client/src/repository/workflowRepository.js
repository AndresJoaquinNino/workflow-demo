import { api } from './';

export const paginateWorkflows = async (params) => {
  const response = await api.request({
    method: 'GET',
    url: '/workflow',
    params
  });
  return response.data;
}