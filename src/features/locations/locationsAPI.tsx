import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TLocation } from '../../types/types';

export const locationsAPI = createApi({
    reducerPath: 'locationsAPI',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:8000',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Location'],
    endpoints: (builder) => ({
        getLocations: builder.query<TLocation[], void>({
            query: () => '/locations',
            providesTags: ['Location'],
        }),
        getLocation: builder.query<TLocation, number>({
            query: (location_id) => `/location/${location_id}`,
            providesTags: ['Location'],
        }),
        createLocation: builder.mutation<void, Partial<TLocation>>({
            query: (newLocation) => ({
                url: '/location',
                method: 'POST',
                body: newLocation,
            }),
            invalidatesTags: ['Location'],
        }),
        updateLocation: builder.mutation<void, Partial<TLocation> & { location_id: number }>({
            query: ({ location_id, ...rest }) => ({
                url: `/update-location/${location_id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Location'],
        }),
        deleteLocation: builder.mutation<void, number>({
            query: (location_id) => ({
                url: `/delete-location/${location_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Location'],
        }),
    }),
});

export default locationsAPI;
