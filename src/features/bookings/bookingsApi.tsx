import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TBooking } from '../../types/types';

export const bookingsAPI = createApi({
    reducerPath: 'bookingsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
          },
     }),
    tagTypes: ['getBookings', 'createBooking', 'updateBooking', 'deleteBooking', 'getBookingsByUserId'],
    endpoints: (builder) => ({
        getBookings: builder.query<TBooking[], void>({
            query: () => '/bookings',
            providesTags: ['getBookings'],
        }),
        getBooking: builder.query<TBooking[], number>({
            query: (booking_id) => `/booking/${booking_id}`,
            providesTags: ['getBookings'],
        }),
        createBooking: builder.mutation<TBooking, Partial<TBooking>>({
            query: (newBooking) => ({
                url: '/create-booking',
                method: 'POST',
                body: newBooking,
            }),
            invalidatesTags: ['createBooking'],
        }),
        updateBooking: builder.mutation<TBooking, Partial<TBooking>>({
            query: ({ booking_id, ...rest }) => ({
                url: `/update-booking/${booking_id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['updateBooking'],
        }),
        deleteBooking: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/delete-booking/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['deleteBooking'],
        }),
        getBookingsByUserId: builder.query<TBooking[], number>({
            query: (id) => `/user-bookings/${id}`,
            providesTags: ['getBookingsByUserId'],
        }),
    }),
});

export default bookingsAPI;
