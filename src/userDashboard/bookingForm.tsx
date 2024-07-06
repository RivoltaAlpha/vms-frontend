import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface BookingFormData {
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date: string;
  return_date: string;
}

const BookingForm: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BookingFormData>({
    user_id: 0, // This should be set based on the logged-in user
    vehicle_id: parseInt(vehicleId || '0'),
    location_id: 0,
    booking_date: '',
    return_date: '',
  });
  const [vehicle, setVehicle] = useState<any>(null);

  useEffect(() => {
    // Fetch vehicle details
    const fetchVehicle = async () => {
      // Replace with your actual API call
      const response = await fetch(`/api/vehicles/${vehicleId}`);
      const data = await response.json();
      setVehicle(data);
    };

    fetchVehicle();
  }, [vehicleId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to payment page with booking details
    navigate('/payment', { state: { bookingData: formData, vehicle } });
  };

  if (!vehicle) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Book {vehicle.vehicleSpec.manufacturer} {vehicle.vehicleSpec.model}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields (same as before) */}
        {/* ... */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
          <p>Vehicle: {vehicle.vehicleSpec.manufacturer} {vehicle.vehicleSpec.model}</p>
          <p>Rental Rate: ${vehicle.rental_rate.toFixed(2)}/day</p>
          {/* Add more summary details as needed */}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default BookingForm;