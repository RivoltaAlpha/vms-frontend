import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TUser,TIUser, User } from '../../types/types';

export const usersAPI = createApi({
    reducerPath: 'usersAPI',
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
    tagTypes: ['getUsers'],
    endpoints: (builder) => ({
        getUsers: builder.query<TUser[], void>({
            query: () => '/users',
            providesTags: ['getUsers'],
        }),

        getUser: builder.query<TUser, number>({
            query: (user_id) => `/user/${user_id}`,
            providesTags: ['getUsers'],
        }),

        createUser: builder.mutation<User, Partial<User>>({
            query: (newUser) => ({
                url: '/user',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['getUsers'],
        }),
        updateUser: builder.mutation<TUser, { id: number; data: Partial<TIUser> }>({
            query: ({ id, data }) => ({
                url: `/update-user/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['getUsers'],
        }),
        deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/delete-user/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['getUsers'],
        }),
    }),
});

export default usersAPI;
