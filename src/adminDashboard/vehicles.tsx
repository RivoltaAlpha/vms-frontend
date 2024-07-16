import React from 'react';
import VehiclesAPI from '../features/vehicles/vehicleAPI';
import { NavLink } from 'react-router-dom';
import { RiApps2AddFill } from "react-icons/ri";
import Navigation from './navigation';
import {  toast } from 'sonner';

const VehiclesTable: React.FC = () => {
  const { data: vehicles, error, isLoading } = VehiclesAPI.useGetVehiclesQuery();
  console.log('Vehicles:', vehicles);

  const [deleteVehicle] = VehiclesAPI.useDeletevehicleMutation();

  const handleDelete = async (id: number) => {
    try {
        await deleteVehicle(id).unwrap();
        toast.success('Booking deleted successfully');
      } catch (error) {
          toast.error('Error deleting booking');
      }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading vehicles.</p>;

  return (
    <div className='flex  gap-10'>
       <Navigation/> 
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-5">Vehicles Data</h2>
        <table className="min-w-full bg-base">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-300">ID</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Rental Rate</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Availability</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Model</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Manufacturer</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Fuel Type</th>
              <th className="py-2 px-4 border-b-2 border-gray-300"> Engine Capacity</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Year</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles?.map((vehicle ) => (
              <tr key={vehicle.vehicle_id}>
                <td className="py-2 px-4 border-b">{vehicle.vehicle_id}</td>
                <td className="py-2 px-4 border-b">{vehicle.rental_rate}</td>
                <td className="py-2 px-4 border-b">{vehicle.availability}</td> 
                <td className="py-2 px-4 border-b">{vehicle.vehicleSpec?.model}</td>
                <td className="py-2 px-4 border-b">{vehicle.vehicleSpec?.manufacturer}</td>
                <td className="py-2 px-4 border-b">{vehicle.vehicleSpec?.fuel_type}</td>
                <td className="py-2 px-4 border-b">{vehicle.vehicleSpec?.engine_capacity}</td>
                <td className="py-2 px-4 border-b">{vehicle.vehicleSpec?.year}</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">View Details</button>
                  <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-2"
                   onClick={() => handleDelete(vehicle.vehicle_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7} className=" py-2 px-4">
                {vehicles?.length} {vehicles?.length === 1 ? 'record' : 'records'}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className=" mt-10 flex ">
        <NavLink to ="/addVehicle" className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-blue-600 ">  <RiApps2AddFill /> Add Vehicle</NavLink>
        </div>
      </div>
    </div>
  );
};

export default VehiclesTable;
