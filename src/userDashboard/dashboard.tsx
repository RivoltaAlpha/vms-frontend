import { useSelector } from 'react-redux';
import bookingsAPI from '../features/bookings/bookingsApi';
import Navigation from './navigation';
import { RootState } from '../app/store';
import { FaCalendarAlt, FaCar, FaCashRegister } from 'react-icons/fa';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { BookingDetails } from '../types/types';
import paymentsAPI from '../features/payments/paymentsApi';

export const DashboardContent = () => {
  const { user }: any = useSelector((state: RootState) => state.userAuth.user?.user_id && state.userAuth);
  const userId = user?.user_id;
  const { data, isLoading, isError } = bookingsAPI.useGetBookingsByUserIdQuery(userId);
  const { data: payments } = paymentsAPI.useGetUserPaymentsQuery(userId);
  console.log('Payments:',payments);
  const totalPayments = payments?.length || 0;

  const bookings = data?.[0]?.bookings || []; // Access nested bookings array
  // console.log(bookings);
  
  // Prepare data for the line chart
  interface BookingData {
    date: string;
    count: number;
    acc : number;
    current : number;
    items: BookingDetails[];
  }

  const bookingsData: BookingData[] = Array.isArray(bookings) && bookings?.map((booking: BookingDetails) => ({
    date: new Date(booking.booking_date).toLocaleDateString(),
    count: 1,
  })).reduce<BookingData[]>((acc, current: any ) => {
    const existing = acc.find(item => item.date === current.date);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push(current);
    }
    return acc;
  }, []) || [];

  // Conditional rendering for loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;


  // Calculate total bookings and vehicles
  const totalBookings = Array.isArray(bookings) ? bookings.length : 0;
  
  return (
    <div className="flex-grow">
      <h1 className="text-4xl font-bold mb-4">Hello, {user?.username} ...</h1>
      <h2 className=" mb-5">Here is your Booking Summary</h2>
      <div className="flex justify-center">
        <div className="mr-4  bg-cyan-600 p-1 items rounded">
          <h2 className="text-2xl ml-10 font-bold mb-5">Bookings Over Time</h2>
          <LineChart
            width={500}
            height={300}
            data={bookingsData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#fff"  />
          </LineChart>
        </div>
        {/* Cards */}
        <div className="flex flex-wrap gap-8">
          <div className="flex flex-col items-center justify-center bg-secondary text-white hover:bg-cyan-500 py-4 px-4 rounded-lg w-full md:w-[300px]">
            <FaCalendarAlt size={40} className="mb-2" />
            <p className="text-3xl">Total: {totalBookings} {totalBookings === 1 ? 'Booking' : 'Bookings'}</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-secondary text-white hover:bg-cyan-500 py-4 px-4 rounded-lg w-full md:w-[300px]">
            <FaCar size={48} className="mb-2" />
            <p className="text-3xl"> Total: {totalBookings} {totalBookings === 1 ? 'Vehicle' : 'Vehicles'}</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-secondary text-white hover:bg-cyan-500 py-4 px-4 rounded-lg w-full md:w-[300px]">
            <FaCashRegister size={48} className="mb-2" />
            <p className="text-3xl">Total: {totalPayments} {totalPayments === 1 ? 'Payment' : 'Payments'}</p>
          </div>
        </div>
      </div>
      {/* Bookings Data Table */}
      <div className="container mx-auto mb-10  mt-10 text-base-content bg-cards rounded-lg p-4">
        <h1 className="text-3xl text-cyan-50 my-4"> Bookings Summary</h1>
        <table className="table table-xs w-full ml-4">
          <thead>
            <tr className="text-lg">
              <th className="py-2 px-4 border-b-2 border-gray-300">Location</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Vehicle </th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Total Amount</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Status</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Booking Date</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Return Date</th>
            </tr>
          </thead>
          <tbody>
          {isLoading ? (
                  <tr><td colSpan={8}>Loading...</td></tr>
                ) : isError ? (
                  <tr><td colSpan={8}>Error loading bookings</td></tr>
                ) : (
              Array.isArray(bookings) &&  bookings?.map((booking: BookingDetails ) => (
              <tr key={booking?.booking_id}>
                <td className="py-2 px-4 border-b border-gray-300">{booking?.location.name}</td>             
                <td className="py-2 px-4 border-b border-gray-300">{booking?.vehicle.vehicleSpec.model}</td>
                <td className="py-2 px-4 border-b border-gray-300">${booking?.total_amount}</td>
                <td className="py-2 px-4 border-b border-gray-300">{booking?.booking_status}</td>
                <td className="py-2 px-4 border-b border-gray-300">{new Date(booking?.booking_date).toLocaleString()}</td>
                <td className="py-2 px-4 border-b border-gray-300">{new Date(booking?.return_date).toLocaleString()}</td>
                 </tr>
            ))
            )}
          </tbody>
          <tfoot className="text-lg py-4">
            <tr>
            <td colSpan={8}>{Array.isArray(bookings) ? `${bookings.length} records` : '0 records'}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-row flex-wrap bg-gray-100 gap-4 p-4">
      <Navigation />
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
