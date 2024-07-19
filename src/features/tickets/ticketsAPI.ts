import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Tickets } from '../../types/types';

export const ticketsAPI = createApi({
  reducerPath: 'ticketsAPI',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['tickets'],
  endpoints: (builder) => ({
    getTickets: builder.query<Tickets[], void>({
      query: () => '/tickets',
      providesTags: ['tickets'],
    }),
    getTicket: builder.query<Tickets, number>({
      query: (ticket_id) => `/ticket/${ticket_id}`,
    }),
    generateTicket: builder.mutation<Tickets, Partial<Tickets>>({
      query: (newTicket) => ({
        url: `/ticket`,
        method: 'POST',
        body: newTicket,
      }),
      invalidatesTags: ['tickets'],
    }),
    reviewTicket: builder.mutation<Tickets, Partial<Tickets>>({
      query: ({ ticket_id, ...data }) => ({
        url: `/update-ticket/${ticket_id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['tickets'],
    }),
    getUserTickets: builder.query<Tickets[], number>({
      query: (user_id) => `/user-tickets/${user_id}`,
      providesTags: ['tickets'],
    }),
    getTicketById: builder.query<Tickets, number>({
      query: (ticket_id) => `/ticket/${ticket_id}`,
      providesTags: ['tickets'],
    }),
  }),
});

export default ticketsAPI;





// Ticket updated successfully {
//     ticket_id: 5,
//     user_id: 1,
//     subject: 'Vehicle Damage',
//     description: 'The car I rented has a dent on the door.',
//     ticket_status: 'Closed',
//     created_at: 2024-07-19T11:30:23.525Z,
//     updated_at: 2024-07-19T20:51:47.727Z
//   }