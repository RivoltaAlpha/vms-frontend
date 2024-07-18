import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookingFormData } from '../types/types';  
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import { bookingsAPI } from '../features/bookings/bookingsApi';
import { toast, Toaster } from 'sonner';
import locationsAPI from '../features/locations/locationsAPI';

export const BookingForm = () => {
  const { location_id } = useParams<{ location_id: string }>();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.userAuth);
  const { selectedVehicle: vehicle } = useSelector((state: RootState) => state.vehicles);
  const navigate = useNavigate();
  
  const [bookVehicle, { isLoading }] = bookingsAPI.useCreateBookingMutation();
  const{ data: locationsData, isLoading: loadingLocations} = locationsAPI.useGetLocationsQuery();

  const [formData, setFormData] = useState<BookingFormData>({
    user_id: user?.user_id || 0,
    vehicle_id: vehicle ? vehicle.vehicle_id : 0,
    location_id: parseInt(location_id || '0'),
    booking_date: '',
    return_date: '',
    total_amount: 0,
    booking_status: 'Pending',
  } as BookingFormData);

  const calculateTotalAmount = () => {
    if (!vehicle) return 0;

    const bookingDate = new Date(formData.booking_date);
    const returnDate = new Date(formData.return_date);

    if (isNaN(bookingDate.getTime()) || isNaN(returnDate.getTime())) {
      return 0;
    }

    const diffTime = Math.abs(returnDate.getTime() - bookingDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays * vehicle.rental_rate;
  };


  useEffect(() => {
    const totalAmount = calculateTotalAmount();
    setFormData(prev => ({ ...prev, total_amount: totalAmount }));
  }, [formData.booking_date, formData.return_date, vehicle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0];
    if (formData.booking_date < currentDate || formData.return_date < formData.booking_date) {
      toast.error('Invalid booking dates');
      return;
    }
    console.log(formData);
    if (!formData.location_id || !formData.booking_date || !formData.return_date) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (!isAuthenticated) {
      toast.error('Please login to book a vehicle');
      return;
    }
    try {
      await bookVehicle(formData ).unwrap();
      toast.success('Booking successful');
      localStorage.removeItem('selectedVehicle');
      navigate('/user-dashboard');
    } catch (error) {
      console.error('Error booking vehicle:', error);
      toast.error('Failed to book vehicle');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <Toaster
        toastOptions={{
          classNames: {
            error: "bg-red-400",
            success: "text-green-400",
            warning: "text-yellow-400",
            info: "bg-blue-400",
          },
        }}
      />
      <h2 className="text-2xl font-bold mb-5">
        {vehicle ? `Book ${vehicle.vehicleSpec.manufacturer}${vehicle.vehicleSpec.model}` : 'Loading vehicle...'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="location_id" className="block mb-2">Pickup Location</label>
          <select
            id="location_id"
            name="location_id"
            value={formData.location_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
 <option value="">Select a location</option>
            {loadingLocations ? (
              <option>Loading locations...</option>
            ) : (
              locationsData?.map((location: { location_id: number, name: string }) => (
                <option key={location.location_id} value={location.location_id}>
                  {location.name}
                </option>
              ))
            )}
          </select>
        </div>
        <div>
          <label htmlFor="booking_date" className="block mb-2">Pickup Date</label>
          <input
            type="datetime-local"
            id="booking_date"
            name="booking_date"
            value={formData.booking_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="return_date" className="block mb-2">Return Date</label>
          <input
            type="datetime-local"
            id="return_date"
            name="return_date"
            value={formData.return_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          {isLoading ? 'Booking...' : 'Book Now'}
        </button>
        {vehicle && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
            <p>Vehicle: {vehicle.vehicleSpec.manufacturer} {vehicle.vehicleSpec.model}</p>
            <p>Rental Rate: ${vehicle.rental_rate}/day</p>
            <p>Total Amount: ${formData.total_amount.toFixed(2)}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
