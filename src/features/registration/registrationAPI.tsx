// src/features/registration/registrationSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RUser } from '../../types/types';

export const registrationAPI = createApi({
    reducerPath: 'registrationAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        registerUser: builder.mutation<RUser, Partial<RUser>>({
            query: (newUser) => ({
                url: 'auth/register',
                method: 'POST',
                body: newUser,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),
    }),
});

export default registrationAPI;
