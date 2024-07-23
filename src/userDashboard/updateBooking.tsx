import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { BookingFormData } from '../types/types';
import { bookingsAPI } from '../features/bookings/bookingsApi';
import { removeBooking, setBooking } from '../features/bookings/bookingSlice';

const UpdateBooking: React.FC = () => {
  const  booking = localStorage.getItem('selectedBooking');
  const { selectedVehicle } = useSelector((state: RootState) => state.vehicles);
  const vehicleRate = selectedVehicle?.rental_rate || 0;

  const [updateBooking, { isLoading }] = bookingsAPI.useUpdateBookingMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedBooking = JSON.parse(localStorage.getItem('selectedBooking') || '{}');
    setFormData(
      {
        ...storedBooking,
        booking_date: storedBooking.booking_date?.slice(0, 16),
        return_date: storedBooking.return_date?.slice(0, 16),
      });
    dispatch(setBooking(storedBooking));
  }, [dispatch]);

  const bookingData = JSON.parse(booking || '{}');

  const [formData, setFormData] = useState<Partial<BookingFormData>>({
    booking_id: 0,
    user_id:  bookingData?.user_id || 0,
    vehicle_id: 0,
    location_id: 0,
    booking_date: '',
    return_date: '',
    total_amount: 0,
    booking_status: 'Pending',
  } as BookingFormData);

  

  // Calculate total amount
  const calculateTotalAmount = () => {
    if (!formData.booking_date || !formData.return_date) return 0;
    const bookingDate = new Date(formData.booking_date);
    const returnDate = new Date(formData.return_date);
    if (isNaN(bookingDate.getTime()) || isNaN(returnDate.getTime())) return 0;

    const diffTime = Math.abs(returnDate.getTime() - bookingDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return vehicleRate * diffDays;
  };

  useEffect(() => {
    const totalAmount = calculateTotalAmount();
    setFormData(prev => ({ ...prev, total_amount: totalAmount }));
  }, [formData.booking_date, formData.return_date, vehicleRate]);

  const handleCancel = () => {
    dispatch(removeBooking());
    navigate(`/users/bookings/${bookingData.user_id}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    // Ensure formData contains valid date strings or Date objects
    const bookingDate = new Date(formData.booking_date || '');
    const returnDate = new Date(formData.return_date || '');

        // Validate dates
      if (!bookingDate || isNaN(bookingDate.getTime()) || !returnDate || isNaN(returnDate.getTime())) {
      toast.error('Invalid date format');
      return;
    }

    // Convert dates to ISO strings
    const formattedData = {
      ...formData,
      booking_date:  bookingDate.toString(),
      return_date: returnDate .toString(),
    };
    
    try {
      const bookingData = JSON.parse(booking || '{}');
      await updateBooking({ booking_id: bookingData.booking_id, data: formattedData }).unwrap();
      toast.success('Booking updated successfully');
      localStorage.removeItem('selectedBooking');
      navigate('/users/bookings');
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Error updating booking');
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
      <h2 className="text-2xl font-bold mb-5">Edit Booking</h2>
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
            <option value="1">Location 1</option>
            <option value="2">Location 2</option>
            <option value="3">Location 3</option>
            <option value="4">Location 4</option>
            <option value="5">Location 5</option>
            <option value="6">Location 6</option>
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
        <div>
          <label htmlFor="total_amount" className="block mb-2">Total Amount</label>
          <input
            type="number"
            id="total_amount"
            name="total_amount"
            value={formData.total_amount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
          <button type="submit" className="w-1/4 bg-blue-500 text-white py-2 ml-20 px-4 rounded hover:bg-blue-600">
            {isLoading ? 'Updating...' : 'Update Booking'}
          </button>
          <button type="button" onClick={handleCancel} className="w-1/4 bg-red-500 ml-20 text-white py-2 px-4 rounded hover:bg-red-600">
            Cancel
          </button>
        </form>
      </div>
  );
}

export default UpdateBooking;
