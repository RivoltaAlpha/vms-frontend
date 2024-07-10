// components/BookingsTable.tsx
import React from 'react';
import bookingsAPI from '../features/bookings/bookingsApi';
import {  TBooking } from '../types/types';
import { NavLink } from 'react-router-dom';

const BookingsTable: React.FC = () => {
  const { data: bookings, error, isLoading } = bookingsAPI.useGetBookingsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading bookings.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-5">Bookings Data</h2>
      <table className="min-w-full bg-base">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-300">Location</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Booking Date</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Return Date</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Total Amount</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Status</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Vehicle ID</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((booking: TBooking) => (
            <tr key={booking.booking_id}>
              <td className="py-2 px-4 border-b">{booking.location_id}</td>
              <td className="py-2 px-4 border-b">{new Date(booking.booking_date).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{new Date(booking.return_date).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">${booking.total_amount}</td>
              <td className="py-2 px-4 border-b">{booking.status}</td>
              <td className="py-2 px-4 border-b">{booking.vehicle_id}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">View Details</button>
                <button className="bg-teal-600 text-white py-1 px-3 rounded hover:bg-green-600 ml-2">Update</button>
                <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className='text-lg flex-col  justify-end'>
            <tr>
              <td colSpan={7}>{bookings ? `${bookings.length} records` : '0 records'}</td>
            </tr>
          </tfoot>
      </table>
      <div>
      <NavLink to="/admin-dashboard" className="px-4 py-2 bg-teal-500 m-10  text-white rounded mr-2">Dashboard</NavLink>
      </div>
    </div>
  );
};

export default BookingsTable;
