import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TSVehicle, TIVehicle, TIVehicleSpec } from '../../types/types';

export const VehiclesAPI = createApi({
    reducerPath: 'VehiclesAPI',
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
    tagTypes: ['getVehicles','getVehicle', 'createVehicle', 'updateVehicle', 'deleteVehicle'],
    endpoints: (builder) => ({
        getVehicles: builder.query<TIVehicleSpec[], void>({
            query: () => '/vehicles',
            providesTags: ['getVehicles'],
        }),

        getvehicle: builder.query<TSVehicle, number>({
            query: (id) => `/vehicle/${id}`,        
            providesTags: ['getVehicle', 'getVehicles'],
        }),

        createvehicle: builder.mutation<TSVehicle, Partial<TIVehicle>>({
            query: (newVehicle) => ({
                url: '/vehicle',
                method: 'POST',
                body: newVehicle,
            }),
            invalidatesTags: ['getVehicles', 'createVehicle'],
        }),
        updatevehicle: builder.mutation<TSVehicle, { id: number; data: Partial<TIVehicle> }>({
            query: ({ id, data }) => ({
                url: `/update-vehicle/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['getVehicles', 'updateVehicle'],
        }),
        deletevehicle: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/delete-vehicle/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['getVehicles', 'deleteVehicle'],
        }),
    }),
});

export default VehiclesAPI;
