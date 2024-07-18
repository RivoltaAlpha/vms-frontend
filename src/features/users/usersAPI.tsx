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
    tagTypes: ['getUsers','getUser', 'createUser', 'updateUser', 'deleteUser'],
    endpoints: (builder) => ({
        getUsers: builder.query<TUser[], void>({
            query: () => '/users',
            providesTags: ['getUsers'],
        }),

        getUser: builder.query<TUser, number>({
            query: (id) => `/user/${id}`,
            providesTags: ['getUser', 'getUsers'],
        }),

        createUser: builder.mutation<User, Partial<User>>({
            query: (newUser) => ({
                url: '/user',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: ['getUsers', 'createUser'],
        }),
        updateUser: builder.mutation<TUser, { id: number; data: Partial<TIUser> }>({
            query: ({ id, data }) => ({
                url: `/update-user/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['getUsers', 'updateUser'],
        }),
        deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/delete-user/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['getUsers', 'deleteUser'],
        }),
    }),
});

export default usersAPI;
