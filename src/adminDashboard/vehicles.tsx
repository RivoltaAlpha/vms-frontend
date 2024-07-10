// components/VehiclesTable.tsx
import React from 'react';
import VehiclesAPI from '../features/vehicles/vehicleAPI';
import {  TIVehicleSpec } from '../types/types';
import { NavLink } from 'react-router-dom';

const VehiclesTable: React.FC = () => {
  const { data: vehicles, error, isLoading } = VehiclesAPI.useGetVehiclesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading vehicles.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-5">Vehicles Data</h2>
      <table className="min-w-full bg-base">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-300">ID</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Make</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Model</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Year</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles?.map((vehicle:TIVehicleSpec ) => (
            <tr key={vehicle.vehicle_id}>
              <td className="py-2 px-4 border-b">{vehicle.vehicle_id}</td>
              <td className="py-2 px-4 border-b">{vehicle.rental_rate}</td>
              <td className="py-2 px-4 border-b">{vehicle.availability}</td>
              <td className="py-2 px-4 border-b">{vehicle.manufacturer}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">View Details</button>
                <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 ml-2">Update</button>
                <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className='text-lg flex-col justify-end'>
            <tr className='mb-4 py-10'>
              <td colSpan={7}>{vehicles ? `${vehicles.length} records` : '0 records'}</td>
              <NavLink to="/admin-dashboard" className="px-4 py-2 bg-teal-500  text-white rounded mr-2">Dashboard</NavLink>
            </tr>
          </tfoot>
      </table>
    </div>
  );
};

export default VehiclesTable;
