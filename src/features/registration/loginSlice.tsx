// src/features/registration/registrationSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Luser } from '../../types/types';


export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        loginUser: builder.mutation<Luser, Partial<Luser>>({
            query: (user) => ({
                url: 'auth/login',
                method: 'POST',
                body: user,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),
    }),
});

// export const { useLoginUserMutation } = loginAPI;
