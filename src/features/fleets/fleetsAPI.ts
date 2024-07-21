import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TIFleetSpec } from '../../types/types'; // Assume these types exist

export const FleetAPI = createApi({
    reducerPath: 'FleetAPI',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://anirent.azurewebsites.net/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
          },
    }),
    tagTypes: ['getFleets'],
    endpoints: (builder) => ({
        getFleets: builder.query<TIFleetSpec[], void>({
            query: () => '/fleet-records',
            providesTags: ['getFleets'],
        }),

        getFleet: builder.query<TIFleetSpec, number>({
            query: (id) => `/fleet-record/${id}`,        
            providesTags: ['getFleets'],
        }),

        createFleet: builder.mutation<TIFleetSpec, Partial<TIFleetSpec>>({
            query: (newFleet) => ({
                url: '/fleet-record',
                method: 'POST',
                body: newFleet,
            }),
            invalidatesTags: ['getFleets'],
        }),

        updateFleet: builder.mutation<TIFleetSpec, { id: number; data: Partial<TIFleetSpec> }>({
            query: ({ id, data }) => ({
                url: `/update-fleet-record/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['getFleets'],
        }),

        deleteFleet: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/delete-fleet-record/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['getFleets'],
        }),
    }),
});

export default FleetAPI;