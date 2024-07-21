import React from 'react';
import VehiclesAPI from '../features/vehicles/vehicleAPI';
import { TIVehicleSpec } from '../types/types';
import { Link, useNavigate } from 'react-router-dom';
import { setSelectedVehicle } from '../features/vehicles/vehiclesSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface VehicleCardProps {
  vehicle: TIVehicleSpec;
  handleVehicleClick: (vehicle: TIVehicleSpec) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, handleVehicleClick }) => (
  <div className="bg-white shadow-lg  rounded-lg overflow-hidden">
    <div className="px-6 items-center py-4">
      <img src={vehicle.vehicleSpec.image_url} className="w-full h-64 object-cover" alt="Car Image" />
      <p className="text-gray-700">Color: {vehicle.vehicleSpec.color}</p>
      <p className="text-gray-700">Engine Capacity: {vehicle.vehicleSpec.engine_capacity}</p>
      <p className="text-gray-700">Fuel Type: {vehicle.vehicleSpec.fuel_type}</p>
      <p className="text-gray-700">Manufacturer: {vehicle.vehicleSpec.manufacturer}</p>
      <p className="text-gray-700">Model: {vehicle.vehicleSpec.model}</p>
      <p className="text-gray-700">Seating Capacity: {vehicle.vehicleSpec.seating_capacity}</p>
      <p className="text-gray-700">Transmission: {vehicle.vehicleSpec.transmission}</p>
      <p className="text-gray-700">Year: {vehicle.vehicleSpec.year}</p>
      <p className="text-gray-700  mb-2">Availability: {vehicle.availability ? 'Available' : 'Not Available'}</p>
      <p className="text-gray-700">Rental Rate: ${vehicle.rental_rate}</p>
    </div>
    <Link to={`/book/${vehicle.vehicle_id}`}>
    <button className="bg-base text-white px-4 py-2 mb-4 ml-6  rounded hover:bg-blue-800 transition duration-300 " onClick={() => handleVehicleClick(vehicle)}>
      {vehicle.availability ? 'Book Now' : 'Not Available'}
    </button></Link>
  </div>
);

const Explore = () => {
  const isAuthenticated = useSelector((state: RootState) => state.userAuth.isAuthenticated);
  const { data: vehicles = [] } = VehiclesAPI.useGetVehiclesQuery();
  console.log(vehicles)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleVehicleClick = (vehicle: TIVehicleSpec) => {
    if (isAuthenticated) {
      dispatch(setSelectedVehicle(vehicle));
    }else {
      navigate('/login');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-base text-white py-2 px-4">Explore Our Vehicles</h1>
      <div className="grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} handleVehicleClick={handleVehicleClick}/>
        ))}
      </div>
    </div>
  );
};

export default Explore;