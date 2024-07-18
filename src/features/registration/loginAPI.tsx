// authSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginResponse } from '../../types/types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://anirent.azurewebsites.net/' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user: LoginResponse) => ({
        url: '/auth/login',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});



export default authApi;
