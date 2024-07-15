import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Booking, BookingDetails, TIBookings } from '../../types/types';

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
    tagTypes: ['getBookings'],
    endpoints: (builder) => ({
        getBookings: builder.query<BookingDetails[], void>({
            query: () => '/bookings',
            providesTags: ['getBookings'],
        }),

        getBooking: builder.query<BookingDetails, number>({
            query: (booking_id) => `/booking/${booking_id}`,
        }),

        createBooking: builder.mutation<Booking, Partial<TIBookings>>({
            query: (newBooking) => ({
                url: '/create-booking',
                method: 'POST',
                body: newBooking,
            }),
            invalidatesTags: [ 'getBookings'],
        }),

        updateBooking: builder.mutation<Booking, { booking_id: number; data:Partial<Booking>}>({
            query: ({ booking_id, data }: { booking_id: number; data:Partial<Booking>}) => ({
                url: `/update-booking/${booking_id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: [ 'getBookings'],
        }),

        deleteBooking: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/delete-booking/${id}`,
                method: 'DELETE',

            }),
            invalidatesTags: ['getBookings'],
        }),
        
        getBookingsByUserId: builder.query<BookingDetails[], number>({
            query: (id) => `/user-bookings/${id}`,
        }),
    }),
});

export default bookingsAPI;
