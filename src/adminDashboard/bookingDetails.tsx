import React from 'react';
import {  useDispatch } from 'react-redux';
import { Toaster } from 'sonner';
import bookingsAPI from '../features/bookings/bookingsApi';
import { removeBooking } from '../features/bookings/bookingSlice';
import { NavLink } from 'react-router-dom';

const ViewDetails: React.FC = () => {
  const dispatch = useDispatch();
  const selectedBookingString = localStorage.getItem('selectedBooking');
  const booking = JSON.parse(selectedBookingString || '{}');

  const [deleteBooking] = bookingsAPI.useDeleteBookingMutation();
  const handleDelete = async (id: number) => {
    await deleteBooking(id);
    dispatch(removeBooking());
  };

  if (!booking) return <p>No booking selected</p>;

  return (
    <div className="p-32">
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
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-cards mb-6 shadow-lg rounded-lg">
      {booking && (
          <ul className="py">
          <h2 className="text-2xl font-bold mb-5">Booking Details</h2>
          <img src={booking.vehicle.vehicleSpec.image_url} className="w-[700px] object-cover " alt="Car Image" />
          UserName:
            <li className="w-full p-2 mb-6 border rounded ">  {booking.user?.username}</li>
           Location:
           <li className="w-full p-2 mb-6 border rounded "> {booking.location?.name}</li>
           Manufacturer:
           <li className=" w-full p-2 mb-6 border rounded"> {booking.vehicle.vehicleSpec.manufacturer}</li>
           Model:
           <li className=" w-full p-2 mb-6 border rounded"> {booking.vehicle.vehicleSpec.model}</li>
            Location:          
            <li className=" w-full p-2 mb-6 border rounded">  {booking.location.name}</li>
            Vehicle Details:
          <li className="w-full p-2 mb-6 border rounded"> {booking.vehicle.vehicleSpec.model}</li>
          Booking Status:
          <li className="w-full p-2 mb-6 border rounded"> {booking.booking_status}</li>
          Cost:
          <li className="w-full p-2 mb-6 border rounded"> {booking.total_amount}</li>
          Pick Up Date:
          <li className="w-full p-2 mb-6 border rounded"> {new Date(booking.booking_date).toDateString()}</li>
          Return Date:
          <li className="w-full p-2 mb-6 border rounded"> {new Date(booking.return_date).toDateString()}</li>
          Pick-up Location:
          <li className="w-full p-2 mb-6 border rounded"> {booking.location.name}</li>
        </ul>
        
      )}
      <div>
          <NavLink to="/bookings"  >
            <button className="px-4 py-2 mr-10 bg-teal-600 m-10 text-white rounded " >Back</button>
          </NavLink>
            <button className="px-4 py-2 mr-10 bg-red-500 m-10 text-white rounded " onClick={() => handleDelete(booking.booking_id)}> Cancel </button>
      </div>
    </div>
    </div>
  );
};

export default ViewDetails;
