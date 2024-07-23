import React from 'react';
import bookingsAPI from '../features/bookings/bookingsApi';
import Navigation from './navigation';
import usersAPI from '../features/users/usersAPI';
import VehiclesAPI from '../features/vehicles/vehicleAPI';
import { FaUsers, FaCar, FaCalendarAlt, FaCashRegister } from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line
} from 'recharts';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import paymentsAPI from '../features/payments/paymentsApi';
import { SyncLoader } from 'react-spinners';
import ticketsAPI from '../features/tickets/ticketsAPI';

export const Dashboard: React.FC = () => {
  const { data: bookings, error: bookingsError, isLoading: bookingsLoading } = bookingsAPI.useGetBookingsQuery();
  const { data: users, error: usersError, isLoading: usersLoading } = usersAPI.useGetUsersQuery(); 
  const { data: vehicles, error: vehiclesError, isLoading: vehiclesLoading } = VehiclesAPI.useGetVehiclesQuery(); 
  const { data: payments, error: paymentsError, isLoading: paymentsLoading } = paymentsAPI.useGetPaymentsQuery();
  const { data: tickets } = ticketsAPI.useGetTicketsQuery();

  const { user } = useSelector((state: RootState) => state.userAuth);

  if (bookingsLoading || usersLoading || vehiclesLoading || paymentsLoading) return <p>
      <SyncLoader
      color="#116696"
      loading={bookingsLoading || usersLoading || vehiclesLoading || paymentsLoading}
      size={20}
      aria-label="Loading Spinner"
      data-testid="loader"
      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    />
    .</p>;
  if (bookingsError || usersError || vehiclesError || paymentsError) return <p>Error loading data.</p>;

  const data = [
    { name: 'Bookings', value: bookings?.length || 0 },
    { name: 'Users', value: users?.length || 0 },
    { name: 'Vehicles', value: vehicles?.length || 0 },
    { name: 'Payments', value: payments?.length || 0 },
    { name: 'Tickets', value: tickets?.length || 0 },
  ];

// Prepare data for the line chart
interface BookingData {
  month: string;
  count: number;
}

const bookingsData: BookingData[] = bookings?.reduce((acc, booking) => {
  const bookingDate = new Date(booking.booking_date);
  const monthYear = `${bookingDate.getMonth() + 1}-${bookingDate.getFullYear()}`;
  
  const existing = acc.find(item => item.month === monthYear);
  if (existing) {
    existing.count += 1;
  } else {
    acc.push({ month: monthYear, count: 1 });
  }
  return acc;
}, [] as BookingData[]).sort((a, b) => new Date(`01-${a.month}`).getTime() - new Date(`01-${b.month}`).getTime()) || [];


  return (
    <div className="container text-black mx-auto py-8 mr-12">
          <h1 className="text-4xl font-bold mb-4">Hello, {user?.username} ...</h1>
          <h2 className=" mb-5">Welcome to your Vehicle Management System</h2>
      <div className='flex justify-center font-bold text-2xl gap-10'>
        {/* Cards */}
        <div className='flex flex-col items-center bg-cards text-white hover:bg-cyan-500 py-10 px-4 rounded mb-10 h-[200px] w-[300px]'>
          <FaCalendarAlt /> <br/>
          {bookings?.length} {bookings?.length === 1 ? 'booking' : 'Bookings'}
        </div >
        <div className='flex-col items-center flex bg-cards text-white hover:bg-cyan-500 py-10 px-4 rounded mb-10 h-[200px] w-[300px]'>
          <FaUsers /> <br/>
          {users?.length} {users?.length === 1 ? 'user' : 'Users'}
        </div>
        <div className='flex flex-col items-center bg-cards text-white hover:bg-cyan-500 py-10 px-4 rounded mb-10 h-[200px] w-[300px]'>
          <FaCar /> <br/>
          {vehicles?.length} {vehicles?.length === 1 ? 'vehicle' : 'Vehicles'}
        </div>
        <div className='flex flex-col items-center bg-cards text-white hover:bg-cyan-500 py-10 px-4 rounded mb-10 h-[200px] w-[300px]'>
          <FaCashRegister /> <br/>
          {payments?.length} {payments?.length === 1 ? 'payment' : 'Payments'}
        </div>
        
      </div>
      
      <div className="flex justify-center ">
        <div>
          <h2 className="text-2xl ml-[30%] font-bold mb-5">System Overview</h2>
          <BarChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#cc0052" />
          </BarChart>
        </div>
        {/* Booking Trend Line Chart */}
        <div>
                <h2 className="text-2xl ml-20 font-bold mb-5">Booking Trend</h2>
                <LineChart
                  width={500}
                  height={400}
                  data={bookingsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#99003d" />
                </LineChart>
              </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-5">Bookings Data</h2>
        <table className="min-w-full rounded text-white bg-cards">
          <thead>
            <tr>
              <th className="py-2 border-b-2 border-gray-300">Location</th>
              <th className="py-2 border-b-2 border-gray-300">Booking Date</th>
              <th className="py-2 border-b-2 border-gray-300">Return Date</th>
              <th className="py-2 border-b-2 border-gray-300">Total Amount</th>
              <th className="py-2 border-b-2 border-gray-300">Status</th>
              <th className="py-2 border-b-2 border-gray-300">Vehicle Model</th>
              <th className="py-2  border-b-2 border-gray-300">Vehicle Manufacturer</th>
              {/* <th className="py-2 border-b-2 border-gray-300">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking) => (
              <tr key={booking.booking_id} className="hover:bg-cyan-500 cursor-pointer">
                <td className="py-2 px-[50px] border-b">{booking.location?.name}</td>
                <td className="py-2 border-b">{new Date(booking.booking_date).toLocaleDateString()}</td>
                <td className="py-2 border-b">{new Date(booking.return_date).toLocaleDateString()}</td>
                <td className="py-2 border-b">{booking.total_amount}</td>
                <td className="py-2 border-b">{booking.booking_status}</td>
                <td className="py-2 border-b">{booking.vehicle?.vehicleSpec?.model}</td>
                <td className="py-2 border-b">{booking.vehicle?.vehicleSpec?.manufacturer}</td>
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
    <div className='min-h-screen flex bg-gray-100 gap-[50px]'>
        <Navigation/> 
        <Dashboard />
    </div>
  );
};

export default AdminDashboard;
