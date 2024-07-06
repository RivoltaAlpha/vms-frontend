import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TPayment } from '../../types/types';

export const paymentsAPI = createApi({
    reducerPath: 'paymentsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    tagTypes: ['Payment'],
    endpoints: (builder) => ({
        getPayments: builder.query<TPayment[], void>({
            query: () => 'payments',
            providesTags: ['Payment'],
        }),
        createPayment: builder.mutation<TPayment, Partial<TPayment>>({
            query: (newPayment) => ({
                url: 'payments',
                method: 'POST',
                body: newPayment,
            }),
            invalidatesTags: ['Payment'],
        }),
        updatePayment: builder.mutation<TPayment, Partial<TPayment>>({
            query: ({ id, ...rest }) => ({
                url: `payments/${id}`,
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
    }),
});

export const {
    useGetPaymentsQuery,
    useCreatePaymentMutation,
    useUpdatePaymentMutation,
    useDeletePaymentMutation,
} = paymentsAPI;
