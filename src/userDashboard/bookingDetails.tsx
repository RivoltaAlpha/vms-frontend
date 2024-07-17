import React from 'react';
import {  useDispatch } from 'react-redux';
import { Toaster } from 'sonner';
import bookingsAPI from '../features/bookings/bookingsApi';
import { removeBooking } from '../features/bookings/bookingSlice';
import { NavLink } from 'react-router-dom';

const BookingDetails: React.FC = () => {
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
      <div className="booking-list items-center gap-3">
        <h2 className="text-2xl font-bold gap-3 mb-5"> Vehicle Details</h2>
        {booking && (
          <div key={booking.booking_id} className="booking-item bg-secondary rounded shadow-black">
            <img src="./public/images/car3.png" alt="image" />
            <p className=" p-2 mb-4 " >Manufacturer:{booking.vehicle.vehicleSpec.manufacturer}</p>
            <p className=" p-2 mb-4 " >Model:{booking.vehicle.vehicleSpec.model}</p>
            <p className=" p-2 mb-4 " >Color  :{booking.vehicle.vehicleSpec.color}</p>
            <p className=" p-2 mb-4 " >Engine Capacity:{booking.vehicle.vehicleSpec.engine_capacity}</p>
            <p className=" p-2 mb-4 " >Seating Capacity:{booking.vehicle.vehicleSpec.seating_capacity}</p>
            <p className=" p-2 mb-4 " >Features:{booking.vehicle.vehicleSpec.features}</p>
            <p className=" p-2 mb-4 " >Fuel:{booking.vehicle.vehicleSpec.fuel_type}</p>
            <p className=" p-2 mb-4 " >Transmission:{booking.vehicle.vehicleSpec.transmission}</p>
            <p className=" p-2 mb-4 " >Year:{booking.vehicle.vehicleSpec.year}</p>            
            <p className=" p-2 mb-4 " >Location: {booking.location.name}</p>
          </div>
        )}
      </div>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-cards mb-6 shadow-lg rounded-lg">
      {booking && (
        <ul className="py">
          <h2 className="text-2xl font-bold mb-5">Booking Details</h2>
          <li className="w-full p-2 mb-6 border rounded">Booking Id: {booking.booking_id}</li>
          <li className="w-full p-2 mb-6 border rounded">Vehicle Details: {booking.vehicle.vehicleSpec.model}</li>
          <li className="w-full p-2 mb-6 border rounded">Booking Status: {booking.booking_status}</li>
          <li className="w-full p-2 mb-6 border rounded">Cost: {booking.total_amount}</li>
          <li className="w-full p-2 mb-6 border rounded">Pick Up Date: {new Date(booking.booking_date).toDateString()}</li>
          <li className="w-full p-2 mb-6 border rounded">Return Date: {new Date(booking.return_date).toDateString()}</li>
          <li className="w-full p-2 mb-6 border rounded">Pick-up Location: {booking.location.name}</li>
        </ul>
        
      )}
      <div>
          <NavLink to="/user-bookings/:user_id"  >
            <button className="px-4 py-2 mr-10 bg-teal-600 m-10 text-white rounded " >Back</button>
          </NavLink>
          <NavLink to = {`/update-details/${booking?.booking_id}`} >
            <button className="px-4 py-2 mr-10 bg-teal-500 m-10 text-white rounded " >Update</button>
          </NavLink>
            <button className="px-4 py-2 mr-10 bg-red-500 m-10 text-white rounded " onClick={() => handleDelete(booking.booking_id)}>Delete</button>
      </div>
    </div>
    </div>
  );
};

export default BookingDetails;
