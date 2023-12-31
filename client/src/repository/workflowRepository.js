import { api } from './';

export const paginateWorkflows = async (params) => {
  const response = await api.request({
    method: 'GET',
    url: '/workflow',
    params
  });
  return response.data;
}

export const getWorkflow = async (id) => {
  const response = await api.request({
    method: 'GET',
    url: `/workflow/${id}`,
  });

  return response.data;
}

export const getNodesTypes = async () => {
  const response = await api.request({
    method: 'GET',
    url: '/node/types',
  });

  return response.data;
}

export const getDiagramInfo = async (id) => {
  return Promise.all([
    getWorkflow(id),
    getNodesTypes()
  ]);
}

export const storeWorkflow = async (data) => {
  const response = await api.request({
    method: 'POST',
    url: '/workflow',
    data
  });

  return response.data;
}

export const deleteWorkflow = async (id) => {
  const response = await api.request({
    method: 'DELETE',
    url: `/workflow/${id}`,
  });

  return response.data;
}

export const updateWorkflow = async ({ id, data }) => {
  const response = await api.request({
    method: 'PATCH',
    url: `/workflow/${id}`,
    data
  });

  return response.data;
}