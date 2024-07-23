import React from 'react';
import VehiclesAPI from '../features/vehicles/vehicleAPI';
import { TIVehicleSpec } from '../types/types';
import { Link, useNavigate } from 'react-router-dom';
import { setSelectedVehicle } from '../features/vehicles/vehiclesSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { HashLoader  } from "react-spinners";

interface VehicleCardProps {
  vehicle: TIVehicleSpec;
  handleVehicleClick: (vehicle: TIVehicleSpec) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, handleVehicleClick }) => (
  <div className="bg-gray-900 shadow-lg rounded-lg overflow-hidden">
    <div className="px-2 items-center py-4">
      <img src={vehicle.vehicleSpec.image_url} className="w-[100%] h-64 object-cover" alt="Car Image" />
      <p className="text-white ">Color: {vehicle.vehicleSpec.color}</p>
      <p className="text-white ">Engine Capacity: {vehicle.vehicleSpec.engine_capacity}</p>
      <p className="text-white ">Fuel Type: {vehicle.vehicleSpec.fuel_type}</p>
      <p className="text-white ">Manufacturer: {vehicle.vehicleSpec.manufacturer}</p>
      <p className="text-white ">Model: {vehicle.vehicleSpec.model}</p>
      <p className="text-white ">Seating Capacity: {vehicle.vehicleSpec.seating_capacity}</p>
      <p className="text-white ">Transmission: {vehicle.vehicleSpec.transmission}</p>
      <p className="text-white ">Year: {vehicle.vehicleSpec.year}</p>
      <p className="text-white   mb-2">Availability: {vehicle.availability ? 'Available' : 'Not Available'}</p>
      <p className="text-white ">Rental Rate: ${vehicle.rental_rate}</p>
    </div>
    <Link to={`/users/book/${vehicle.vehicle_id}`}>
    <button className="bg-cards text-white px-4 py-2 mb-4 ml-40 mt-10 rounded hover:bg-blue-800 transition duration-300 " onClick={() => handleVehicleClick(vehicle)}>
      {vehicle.availability ? 'Book Now' : 'Not Available'}
    </button></Link>
  </div>
);

const Explore = () => {
  const isAuthenticated = useSelector((state: RootState) => state.userAuth.isAuthenticated);
  const { data: vehicles = [], isLoading, isError } = VehiclesAPI.useGetVehiclesQuery();
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

    // is loading loader
    if (isLoading) {
      return <div><HashLoader 
        color="#116696"
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      /></div>;
    } else if (isError) {
      return <div>Error</div>;
    }


  return (
    <div className="bg-gray-800  mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-cards py-2 px-4">Explore Our Vehicles</h1>
      <div className="grid grid-cols-1 mx-20 items-center md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} handleVehicleClick={handleVehicleClick}/>
        ))}
      </div>
    </div>
  );
};

export default Explore;