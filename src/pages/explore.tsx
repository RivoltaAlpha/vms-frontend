import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface VehicleSpec {
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string[];
}

interface Vehicle {
  vehicle_id: number;
  image_url: string;
  rental_rate: number;
  availability: boolean;
  vehicleSpec: VehicleSpec;
}

const VehicleCard: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <img src={vehicle.image_url} alt={`${vehicle.vehicleSpec.manufacturer} ${vehicle.vehicleSpec.model}`} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold">{vehicle.vehicleSpec.manufacturer} {vehicle.vehicleSpec.model}</h3>
      <p className="text-gray-600">{vehicle.vehicleSpec.year} - {vehicle.vehicleSpec.fuel_type}</p>
      <ul className="mt-2 text-sm text-gray-700">
        <li>Transmission: {vehicle.vehicleSpec.transmission}</li>
        <li>Seats: {vehicle.vehicleSpec.seating_capacity}</li>
        <li>Color: {vehicle.vehicleSpec.color}</li>
      </ul>
      <p className="mt-2 text-lg font-bold">${vehicle.rental_rate.toFixed(2)}/day</p>
      <div className="mt-4">
        {vehicle.availability ? (
          <Link 
            to={`/book/${vehicle.vehicle_id}`}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            Book Now
          </Link>
        ) : (
          <span className="px-4 py-2 bg-gray-300 text-gray-600 rounded-full">Unavailable</span>
        )}
      </div>
    </div>
  </div>
);

const Explore: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    // Fetch vehicles from your API
    const fetchVehicles = async () => {
      // Replace with your actual API call
      const response = await fetch('/api/vehicles');
      const data = await response.json();
      setVehicles(data);
    };

    fetchVehicles();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 bg-blue-500 text-white py-2 px-4">Explore Our Vehicles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default Explore;