import React from 'react';
import VehiclesAPI from '../features/vehicles/vehicleAPI';
import { TIVehicle } from '../types/types';
import { Link } from 'react-router-dom';

const VehicleCard: React.FC<{ vehicle: TIVehicle }> = ({ vehicle }) => (
  <div className="bg-white shadow-lg  rounded-lg overflow-hidden">
    <div className="px-6 items-center py-4">
      <p className="text-gray-700">Color: {vehicle.vehicleSpec.color}</p>
      <p className="text-gray-700">Engine Capacity: {vehicle.vehicleSpec.engine_capacity}</p>
      <p className="text-gray-700">Fuel Type: {vehicle.vehicleSpec.fuel_type}</p>
      <p className="text-gray-700">Manufacturer: {vehicle.vehicleSpec.manufacturer}</p>
      <p className="text-gray-700">Model: {vehicle.vehicleSpec.model}</p>
      <p className="text-gray-700">Seating Capacity: {vehicle.vehicleSpec.seating_capacity}</p>
      <p className="text-gray-700">Transmission: {vehicle.vehicleSpec.transmission}</p>
      <p className="text-gray-700">Year: {vehicle.vehicleSpec.year}</p>
      <p className="text-gray-700 font-bold mb-2">Availability: {vehicle.availability ? 'Available' : 'Not Available'}</p>
      <p className="text-gray-700">Rental Rate: ${vehicle.rental_rate}</p>
    </div>
    <Link to={`/book/${vehicle.vehicle_id}`}>
    <button className="bg-blue-500 text-white px-4 py-2 mb-4 ml-6  rounded hover:bg-blue-800 transition duration-300">
      {vehicle.availability ? 'Book Now' : 'Not Available'}
    </button></Link>
  </div>
);

const Explore = () => {
  const { data: vehicles = [] } = VehiclesAPI.useGetVehiclesQuery();
  console.log(vehicles)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-blue-500 text-white py-2 px-4">Explore Our Vehicles</h1>
      <div className="grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default Explore;