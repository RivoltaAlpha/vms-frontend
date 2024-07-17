import { useSelector } from 'react-redux';
import bookingsAPI from '../features/bookings/bookingsApi';
import Navigation from './navigation';
import { RootState } from '../app/store';
import { FaCalendarAlt, FaCar } from 'react-icons/fa';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const DashboardContent = () => {
  const { user }: any = useSelector((state: RootState) => state.userAuth.user?.user_id && state.userAuth);
  const userId = user?.user_id;
  const { data: bookings, isLoading, isError } = bookingsAPI.useGetBookingsByUserIdQuery(userId);

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
  }, []) || [];

  // Conditional rendering for loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;

  // Calculate total bookings and vehicles
  const totalBookings = bookings?.length || 0;

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
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col items-center justify-center bg-secondary text-white hover:bg-cyan-500 py-6 px-4 rounded-lg w-full md:w-[300px]">
            <FaCalendarAlt size={48} className="mb-2" />
            <p className="text-3xl">Total: {totalBookings} {totalBookings === 1 ? 'Booking' : 'Bookings'}</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-secondary text-white hover:bg-cyan-500 py-6 px-4 rounded-lg w-full md:w-[300px]">
            <FaCar size={48} className="mb-2" />
            <p className="text-3xl"> Total: {totalBookings} {totalBookings === 1 ? 'Vehicle' : 'Vehicles'}</p>
          </div>
        </div>
      </div>
      {/* Bookings Data Table */}
      <div className="container mx-auto mb-10  mt-10 text-base-content bg-cards rounded-lg p-4">
        <h1 className="text-3xl text-cyan-50 my-4">{user?.username} Bookings Data</h1>
        <table className="table table-xs w-full ml-4">
          <thead>
            <tr className="text-lg">
              <th className="py-2 px-4 border-b-2 border-gray-300">Booking Id</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Booking Date</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Return Date</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Total Amount</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Status</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Vehicle ID</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking) => (
              <tr key={booking?.booking_id}>
                <td className="py-2 px-4 border-b border-gray-300">{booking?.booking_id}</td>
                <td className="py-2 px-4 border-b border-gray-300">{new Date(booking?.booking_date).toLocaleString()}</td>
                <td className="py-2 px-4 border-b border-gray-300">{new Date(booking?.return_date).toLocaleString()}</td>
                <td className="py-2 px-4 border-b border-gray-300">${booking?.total_amount}</td>
                <td className="py-2 px-4 border-b border-gray-300">{booking?.booking_status}</td>
                <td className="py-2 px-4 border-b border-gray-300">{booking?.vehicle_id}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="text-lg py-4">
            <tr>
              <td colSpan={6}>{bookings ? `${bookings.length} records` : '0 records'}</td>
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
