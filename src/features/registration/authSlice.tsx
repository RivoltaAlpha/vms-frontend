// authSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginResponse } from '../../types/types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { username: string; password: string; role: string}>({
      query: ({ username, password, role }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { username, password, role },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;

export default authApi;
