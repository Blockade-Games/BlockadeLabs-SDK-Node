import axios from 'axios';

export const prodApi = axios.create({
  baseURL: 'https://backend.blockadelabs.com/api/v1',
});

export const stagingApi = axios.create({
  baseURL: 'https://backend-staging.blockadelabs.com/api/v1',
});
