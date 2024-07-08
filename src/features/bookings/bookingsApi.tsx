import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TBooking } from '../../types/types';

export const bookingsAPI = createApi({
    reducerPath: 'bookingsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    tagTypes: ['getBookings', 'createBooking', 'updateBooking', 'deleteBooking'],
    endpoints: (builder) => ({
        getBookings: builder.query<TBooking[], void>({
            query: () => 'bookings',
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
            query: ({ id, ...rest }) => ({
                url: `/update-booking/${id}`,
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
    }),
});

// export const {
//     useGetBookingsQuery,
//     useCreateBookingMutation,
//     useUpdateBookingMutation,
//     useDeleteBookingMutation,
// } = bookingsAPI;
