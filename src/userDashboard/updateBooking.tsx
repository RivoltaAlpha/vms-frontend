import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { BookingFormData } from '../types/types';
import { bookingsAPI } from '../features/bookings/bookingsApi';
import { removeBooking, setBooking } from '../features/bookings/bookingSlice';

const UpdateBooking: React.FC = () => {
  const { booking } = useSelector((state: RootState) => state.booking);
  const { vehicleRate }: any = useSelector((state: RootState) => state.vehicles.selectedVehicle?.rental_rate);

  const [updateBooking, { isLoading }] = bookingsAPI.useUpdateBookingMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<BookingFormData>>({
    user_id: booking?.user_id || 0,
    vehicle_id: booking?.vehicle_id || 0,
    booking_date: booking?.booking_date || '',
    return_date: booking?.return_date || '',
    location_id:booking?.location_id || 0,
    total_amount: booking?.total_amount || 0,
    booking_status: booking?.booking_status || '',
  });

  useEffect(() => {
    const storedBooking = JSON.parse(localStorage.getItem('selectedBooking') || '{}');
    setFormData(storedBooking);
    dispatch(setBooking(storedBooking));
  }, []);
  

  // Calculate total amount
  const calculateTotalAmount = () => {
    if (!booking || !vehicleRate) return 0;
    const bookingDate = new Date(booking.booking_date);
    const returnDate = new Date(booking.return_date);
    if (isNaN(bookingDate.getTime()) || isNaN(returnDate.getTime())) {
      return 0;
    }
    const diffTime = Math.abs(returnDate.getTime() - bookingDate.getTime());
    const diffDays = Math.ceil(diffTime / (5000 * 60 * 60 * 24));
    const totalAmount = vehicleRate * diffDays;
    setFormData(prev => ({ ...prev, total_amount: totalAmount }));
  };

  useEffect(() => {
    const totalAmount = calculateTotalAmount();
    setFormData(prev => ({ ...prev, total_amount: totalAmount }));
  }, [booking, vehicleRate]);

  const handleCancel = () => {
    dispatch(removeBooking());
    navigate(`/user-bookings/${booking?.user_id}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      await updateBooking({booking_id: booking?.booking_id, data:formData}).unwrap();
      toast.success('Booking updated successfully');
      localStorage.removeItem('selectedBooking');
      navigate('/user-bookings');
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Error updating booking');
    }
    console.log('Form Data:', formData);
  };

  return (
    <>
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
              value={(formData.booking_date)}
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
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            {isLoading ? 'Updating...' : 'Update Booking'}
          </button>
          <button type="button" onClick={handleCancel} className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateBooking;
