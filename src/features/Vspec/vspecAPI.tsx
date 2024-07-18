import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  Vspec } from '../../types/types';

export const VspecAPI = createApi({
    reducerPath: 'VspecAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://anirent.azurewebsites.net/',

     prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-Type', 'application/json');
        return headers;
      },
     }),
    tagTypes: ['Vspec'],
    endpoints: (builder) => ({
        getVspec: builder.query<Vspec[], void>({
            query: () => `/specifications`,
            providesTags: ['Vspec'],
        }),
        getVspecById: builder.query<Vspec, number>({
            query: (id) => `/specification/${id}`,
            providesTags: ['Vspec'],
        }),
        createVspec: builder.mutation<Vspec, Partial<Vspec>>({
            query: (newVspec) => ({
                url: '/specification',
                method: 'POST',
                body: newVspec,
            }),
            invalidatesTags: ['Vspec'],
        }),
        deleteVspec: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/delete-specification/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Vspec'],
        }),
    }),
});

export default VspecAPI;