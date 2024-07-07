// components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import Navigation from './navigation';

interface Booking {
  id: number;
  tableNumber: string;
  capacity: string;
  location: string;
  type: string;
  seats: number;
}

export const DashboardContent: React.FC = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [currentBookings, setCurrentBookings] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Fetch data from API here
    // Using mock data for now
    setTotalBookings(50);
    setCurrentBookings(10);
    setTotalPayments(5000);
    setUserBookings([
      { id: 2, tableNumber: 'TBL-1', capacity: '1 - 4', location: 'Main Dining Room', type: 'Square - Medium', seats: 5 },
      { id: 3, tableNumber: 'TBL-2', capacity: '1 - 4', location: 'Main Dining Room', type: 'Square - Medium', seats: 6 },
      { id: 4, tableNumber: 'TBL-3', capacity: '1 - 4', location: 'Main Dining Room', type: 'Square - Medium', seats: 7 },
      { id: 5, tableNumber: 'TBL-4', capacity: '1 - 4', location: 'Main Dining Room', type: 'Square - Medium', seats: 8 },
      { id: 6, tableNumber: 'TBL-5', capacity: '1 - 2', location: 'Main Dining Room', type: 'Square - Small', seats: 1 },
    ]);
  }, []);

  return (
      <div className="p-[50px] w-[76%]">   
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
          <p className="text-3xl font-bold">{totalBookings}</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Current Bookings</h3>
          <p className="text-3xl font-bold">{currentBookings}</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Payments</h3>
          <p className="text-3xl font-bold">${totalPayments}</p>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <h2 className="text-xl font-semibold p-4 bg-teal-500 text-white">User Bookings</h2>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seats</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {userBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap">{booking.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.tableNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.capacity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.location}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.seats}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};
export const Dashboard = () => {
  return (
    <div className='min-h-screen flex flex-row flex-wrap bg-gray-100 gap-[100px]'>
        <Navigation/> 
        <DashboardContent />
    </div>
  );
};

export default Dashboard;