import React from 'react';
import bookingsAPI from '../features/bookings/bookingsApi';
import Navigation from './navigation';
import usersAPI from '../features/users/usersAPI';
import VehiclesAPI from '../features/vehicles/vehicleAPI';
import { FaUsers, FaCar, FaCalendarAlt } from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

export const Dashboard: React.FC = () => {
  const { data: bookings, error: bookingsError, isLoading: bookingsLoading } = bookingsAPI.useGetBookingsQuery();
  const { data: users, error: usersError, isLoading: usersLoading } = usersAPI.useGetUsersQuery(); 
  const { data: vehicles, error: vehiclesError, isLoading: vehiclesLoading } = VehiclesAPI.useGetVehiclesQuery(); 
  console.log('Bookings:', bookings);

  if (bookingsLoading || usersLoading || vehiclesLoading) return <p>Loading...</p>;
  if (bookingsError || usersError || vehiclesError) return <p>Error loading data.</p>;

  const data = [
    { name: 'Bookings', value: bookings?.length || 0 },
    { name: 'Users', value: users?.length || 0 },
    { name: 'Vehicles', value: vehicles?.length || 0 },
  ];

// Prepare data for the line chart
  interface BookingData {
    date: string;
    count: number;
  }
  const bookingsData: BookingData[] = bookings?.map(booking => ({
    date: new Date(booking.booking_date).toLocaleDateString(),
    count: 1,
  })).reduce<BookingData[]>((acc, current) => {
    const existing = acc.find(item => item.date === current.date);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push(current);
    }
    return acc;
  }, []).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) || [];


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="container mx-auto py-8 mr-12">
      <h2 className="text-2xl font-bold mb-5">Summary</h2>
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
        
      </div>
      
      <div className="flex justify-center ">
        <div>
          <h2 className="text-2xl font-bold mb-5">Bar Chart</h2>
          <BarChart
            width={400}
            height={300}
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
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
        <div>
          <h2 className="text-2xl font-bold ">Pie Chart</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx={200}
              cy={200}
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className=" mr-2">
        <h2 className="text-2xl font-bold mb-5">Bookings Over Time</h2>
        <LineChart
          width={500}
          height={400}
          data={bookingsData}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-5">Bookings Data</h2>
        <table className="min-w-full rounded text-white bg-cards">
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
              <tr key={booking.booking_id} className="hover:bg-cyan-500 cursor-pointer">
                <td className="py-2 px-4 border-b">{booking.location?.name}</td>
                <td className="py-2 px-4 border-b">{new Date(booking.booking_date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{new Date(booking.return_date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{booking.booking_status}</td>
                <td className="py-2 px-4 border-b">{booking.vehicle?.vehicleSpec?.model}</td>
                <td className="py-2 px-4 border-b">{booking.vehicle?.vehicleSpec?.manufacturer}</td>
                
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-100 text-black py-1 px-3 rounded hover:bg-blue-600">View Details</button>
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
    <div className='min-h-screen flex bg-gray-100 gap-[50px]'>
        <Navigation/> 
        <Dashboard />
    </div>
  );
};

export default AdminDashboard;
