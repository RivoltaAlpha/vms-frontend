import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { Toaster } from 'sonner';
import bookingsAPI from '../features/bookings/bookingsApi';
import { removeBooking } from '../features/bookings/bookingSlice';
import { NavLink } from 'react-router-dom';

const BookingDetails: React.FC = () => {
  const dispatch = useDispatch();
  const selectedBooking = useSelector((state: RootState) => state.booking.selectedBooking);
  const { bookingId} : any = selectedBooking?.booking_id;

  const { data: booking, isLoading, error } = bookingsAPI.useGetBookingQuery(bookingId, {
    skip: !bookingId, // Skip the query if no bookingId
  });

  const [deleteBooking] = bookingsAPI.useDeleteBookingMutation();

  const handleDelete = async (id: number) => {
    await deleteBooking(id);
    dispatch(removeBooking());
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading bookings.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
      <div className="booking-list">
        <h2 className="text-2xl font-bold mb-5">Bookings</h2>
        {booking && (
          <div key={booking.booking_id} className="booking-item">
            <p>Booking ID: {booking.booking_id}</p>
            <p>Booking Date: {new Date(booking.booking_date).toLocaleDateString()}</p>
            <p>Return Date: {new Date(booking.return_date).toLocaleDateString()}</p>
            <p>Total Amount: ${booking.total_amount.toFixed(2)}</p>
            <p>Vehicle: {booking.vehicle.vehicleSpec.manufacturer} {booking.vehicle.vehicleSpec.model}</p>
            <p>Location: {booking.location.name}</p>
            <p>User: {booking.user.username}</p>
            <button className="px-4 py-2 mr-10 bg-teal-500 m-10 text-white rounded " onClick={() => handleDelete(booking.booking_id)}>Delete</button>
            <NavLink to="/update-details"  >
            <button className="px-4 py-2 mr-10 bg-teal-500 m-10 text-white rounded "></button>
            </NavLink>
          </div>
        )}
      </div>

      {booking && (
        <ul className="py">
          <h2 className="text-2xl font-bold mb-5">Booking Details</h2>
          <li className="w-full p-2 mb-6 border rounded">Booking Id: {booking.booking_id}</li>
          <li className="w-full p-2 mb-6 border rounded">User Details: {booking.user_id}</li>
          <li className="w-full p-2 mb-6 border rounded">Vehicle Details: {booking.vehicle_id}</li>
          <li className="w-full p-2 mb-6 border rounded">Booking Status: {booking.booking_status}</li>
          <li className="w-full p-2 mb-6 border rounded">Cost: {booking.total_amount}</li>
          <li className="w-full p-2 mb-6 border rounded">Pick Up Date: {new Date(booking.booking_date).toDateString()}</li>
          <li className="w-full p-2 mb-6 border rounded">Return Date: {new Date(booking.return_date).toDateString()}</li>
          <li className="w-full p-2 mb-6 border rounded">Pick-up Location: {booking.location_id}</li>
        </ul>
      )}
    </div>
  );
};

export default BookingDetails;
