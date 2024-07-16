// components/Dashboard.tsx
import React from 'react';
import bookingsAPI from '../features/bookings/bookingsApi';
import Navigation from './navigation';
import usersAPI from '../features/users/usersAPI';
import VehiclesAPI from '../features/vehicles/vehicleAPI';

export const Dashboard: React.FC = () => {

  const { data: bookings, error:bookingsError, isLoading:bookingsLoading } = bookingsAPI.useGetBookingsQuery();
  const { data: users, error: usersError, isLoading: usersLoading } = usersAPI.useGetUsersQuery(); 
  const { data: vehicles, error: vehiclesError, isLoading: vehiclesLoading } = VehiclesAPI.useGetVehiclesQuery(); 
  console.log('Bookings:', bookings);

  if (bookingsLoading || usersLoading || vehiclesLoading) return <p>Loading...</p>;
  if (bookingsError || usersError || vehiclesError) return <p>Error loading data.</p>;


  return (
    <div className="container mx-4 px-4 py-8">
              <h2 className="text-2xl font-bold mb-5">Summary</h2>
      <div className='flex ml-20 gap-10'>
                {/* cards */}
        <div className='flex bg-secondary text-white py-10 px-4 rounded mb-10 h-[200px] w-[300px]'>
          Total Bookings: {bookings?.length} {bookings?.length === 1 ? 'record' : 'records'}
        </div >
        <div className='flex bg-secondary text-white py-10 px-4 rounded mb-10 h-[200px] w-[300px]'>
           Total Users: {users?.length} {users?.length === 1 ? 'record' : 'records'}
        </div>
        <div className='flex bg-secondary text-white py-10 px-4 rounded mb-10 h-[200px] w-[300px]'>
        Total Vehicles: {vehicles?.length} {vehicles?.length === 1 ? 'record' : 'records'}
        </div>
      </div>
    <div>
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
                {bookings?.length} {bookings?.length === 1 ? 'record' : 'records'}
              </td>
            </tr>
          </tfoot>
        </table>
    
      </div>
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