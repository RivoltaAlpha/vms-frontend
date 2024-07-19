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
  tagTypes: ['tickets', 'userTickets'],
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
      invalidatesTags: ['tickets', 'userTickets'],
    }),
    reviewTicket: builder.mutation<Tickets, Partial<Tickets>>({
      query: ({ ticket_id, ...data }) => ({
        url: `/update-ticket/${ticket_id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['tickets'],
    }),
    deleteTicket: builder.mutation<Tickets, number>({
      query: (ticket_id) => ({
        url: `/delete-ticket/${ticket_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['tickets'],
    }),
    getUserTickets: builder.query<Tickets[], number>({
      query: (user_id) => `/user-tickets/${user_id}`,
      providesTags: ['tickets'],

    }),
    getTicketById: builder.query<Tickets, number>({
      query: (ticket_id) => `/ticket/${ticket_id}`,
      providesTags: ['userTickets'],
    }),
  }),
});

export default ticketsAPI;
