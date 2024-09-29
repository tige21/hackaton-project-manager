import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8081/' }),
  endpoints: () => ({}), // Пустой объект, так как мы будем добавлять эндпоинты через injectEndpoints
});