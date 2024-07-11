// components/Dashboard.tsx
import React from 'react';
import bookingsAPI from '../features/bookings/bookingsApi';
import Navigation from './navigation';
import { NavLink } from 'react-router-dom';
import { FaBackwardFast } from 'react-icons/fa6';

export const Dashboard: React.FC = () => {

  const { data: bookings, error, isLoading } = bookingsAPI.useGetBookingsQuery();
  console.log('Bookings:', bookings);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading bookings.</p>;

  return (
    <div className="container mx-4 px-4 py-8">
      <h2 className="text-2xl font-bold mb-5">Bookings Data</h2>
      <table className="min-w-full bg-base">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-300">Location</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Booking Date</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Return Date</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Status</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Vehicle Model</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Vehicle Manufacturer</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((booking) => (
            <tr key={booking.booking_id}>
              <td className="py-2 px-4 border-b">{booking.location?.name}</td>
              <td className="py-2 px-4 border-b">{new Date(booking.booking_date).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{new Date(booking.return_date).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{booking.booking_status}</td>
              <td className="py-2 px-4 border-b">{booking.vehicle?.vehicleSpec?.model}</td>
              <td className="py-2 px-4 border-b">{booking.vehicle?.vehicleSpec?.manufacturer}</td>
              
              <td className="py-2 px-4 border-b">
                <button className="bg-teal-500 text-white py-1 px-3 rounded hover:bg-blue-600">View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={7} className="text-right py-2 px-4 border-t">
              <NavLink to="/admin-dashboard" className="px-4 py-2 mr-10 m-10 text-white rounded ">
              <FaBackwardFast />
              </NavLink>
              {bookings?.length} {bookings?.length === 1 ? 'record' : 'records'}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export const AdminDashboard = () => {
  return (
    <div className='min-h-screen flex bg-gray-100 gap-[100px]'>
        <Navigation/> 
        <Dashboard />
    </div>
  );
};

export default AdminDashboard;