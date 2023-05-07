import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {apiUrl} from '@/common/constants';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: () => ({}),
})