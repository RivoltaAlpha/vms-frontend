import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TPayment } from '../../types/types';

export const paymentsAPI = createApi({
    reducerPath: 'paymentsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://anirent.azurewebsites.net/' }),
    tagTypes: ['Payment'],
    endpoints: (builder) => ({
        getPayments: builder.query<TPayment[], void>({
            query: () => 'payments',
            providesTags: ['Payment'],
        }),
        createPayment: builder.mutation<TPayment, Partial<TPayment>>({
            query: (newPayment) => ({
                url: 'payment',
                method: 'POST',
                body: newPayment,
            }),
            invalidatesTags: ['Payment'],
        }),
        updatePayment: builder.mutation<TPayment, Partial<TPayment>>({
            query: ({ payment_id, ...rest }) => ({
                url: `payments/${payment_id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Payment'],
        }),
        deletePayment: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `payments/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Payment'],
        }),
        // get user payments by user id
        getUserPayments: builder.query<TPayment[], number>({
            query: (user_id) => `userPayments/${user_id}`,
            providesTags: ['Payment'],
        }),
    }),
});

export default paymentsAPI;
