import VehiclesAPI from '../features/vehicles/vehicleAPI';
import { FaUsers, FaCar, FaCashRegister, FaTicketAlt, FaTruck, FaDollarSign, FaBackward } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import paymentsAPI from '../features/payments/paymentsApi';
import { SyncLoader } from 'react-spinners';
import bookingsAPI from '../features/bookings/bookingsApi';
import usersAPI from '../features/users/usersAPI';
import locationsAPI from '../features/locations/locationsAPI';
import { FaLocationDot } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import ticketsAPI from '../features/tickets/ticketsAPI';
import FleetAPI from '../features/fleets/fleetsAPI';

export const Reports: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.userAuth);
    const { data: bookings, error: bookingsError, isLoading: bookingsLoading } = bookingsAPI.useGetBookingsQuery();
    const { data: users, error: usersError, isLoading: usersLoading } = usersAPI.useGetUsersQuery();
    const { data: vehicles, error: vehiclesError, isLoading: vehiclesLoading } = VehiclesAPI.useGetVehiclesQuery();
    const { data: payments, error: paymentsError, isLoading: paymentsLoading } = paymentsAPI.useGetPaymentsQuery();
    const { data: locations, error: locationsError, isLoading: locationsLoading } = locationsAPI.useGetLocationsQuery();
    const { data: fleets } = FleetAPI.useGetFleetsQuery();
    const { data: tickets } = ticketsAPI.useGetTicketsQuery();
    const confirmedBookings = bookings?.filter((booking) => booking.booking_status === 'Confirmed');
    const pendingBookings = bookings?.filter((booking) => booking.booking_status === 'Pending');
    const openTickets = tickets?.filter((ticket) => ticket.ticket_status === 'Open');
    const pendingTickets = tickets?.filter((ticket) => ticket.ticket_status === 'In Progress');
    const navigate = useNavigate();

    if (bookingsLoading || usersLoading || vehiclesLoading || paymentsLoading || locationsLoading) return <p>
        <SyncLoader
            color="#116696"
            loading={bookingsLoading || usersLoading || vehiclesLoading || paymentsLoading || locationsLoading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
    </p>;

    if (bookingsError || usersError || vehiclesError || paymentsError || locationsError) return <p>Error loading data.</p>;

    // calculate total revenue
    const calculateTotalRevenue = (bookings: any[]) => {
        return bookings?.reduce((total, booking) => total + parseFloat(booking.total_amount), 0) || 0;
    };
    const totalRevenue = calculateTotalRevenue(bookings || []);


    // calculate monthly revenue
    const calculateMonthlyRevenue = (bookings: any[]) => {
        const monthlyRevenue: { [key: string]: number } = {};
        bookings?.forEach((booking) => {
            const bookingDate = new Date(booking.booking_date);
            const monthYear = `${bookingDate.getMonth() + 1}-${bookingDate.getFullYear()}`;
            const totalAmount = parseFloat(booking.total_amount);
            if (!monthlyRevenue[monthYear]) {
                monthlyRevenue[monthYear] = 0;
            }
            monthlyRevenue[monthYear] += totalAmount;
        });
        return monthlyRevenue;
    };

    const monthlyRevenueData = calculateMonthlyRevenue(confirmedBookings || []);

    const formattedMonthlyRevenueData = Object.entries(monthlyRevenueData).map(([key, value]) => {
        const [month, year] = key.split('-');
        return { month: `${month}/${year}`, revenue: value };
    });


    // calculate payments
    const paymantsData = payments?.map(payment => ({
        name: new Date(payment.payment_date).toLocaleDateString(),
        value: payment.amount
    }));


    const locationsData = locations?.map(location => ({
        name: location.name,
        value: confirmedBookings?.filter(booking => booking.location.location_id === location.location_id).length
    }));

    // Calculate total revenue for each location
    const revenueData = locations?.map(location => ({
        name: location.name,
        value: confirmedBookings
            ?.filter(booking => booking.location.location_id === location.location_id)
            .reduce((total, booking) => total + parseFloat(String(booking?.total_amount)), 0)
    }));

    return (
        <div className=" m-10 text-white mx-[20] py-8 mr-12">
            <div className="flex justify-between">
                <div>
                    <h1 className=" text-4xl font-bold mb-4">Hello, {user?.username} ...</h1>
                    <h2 className="mb-5 text-xl">System Report Summary</h2>
                </div>
                <div>
                    {/* Dasboard button */}
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="bg-cards flex items-center gap-2 hover:bg-secondary text-white font-bold py-2 px-4 rounded"
                    >
                        <FaBackward />
                        Dashboard
                    </button>
                </div>
            </div>

            {/* Cards Section */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10'>
                <div className='flex flex-col items-center bg-cards text-white hover:bg-cyan-500 py-10 px-4 rounded' onClick={() => navigate('/admin/payments')}>
                    <FaDollarSign /> <br />
                    {totalRevenue} {totalRevenue === 1 ? 'Total' : 'Total Amount'}
                </div>
                <div className='flex flex-col items-center bg-cards text-white hover:bg-cyan-500 py-10 px-4 rounded' onClick={() => navigate('/admin/bookings')}>
                    <FaUsers /> <br />
                    {confirmedBookings?.length} {confirmedBookings?.length === 1 ? 'Paid Booking' : 'Paid Bookings'}
                </div>
                <div className='flex flex-col items-center bg-cards text-white hover:bg-cyan-500 py-10 px-4 rounded' onClick={() => navigate('/admin/bookings')}>
                    <FaUsers /> <br />
                    {pendingBookings?.length} {pendingBookings?.length === 1 ? 'Unpaid Booking' : 'Unpaid Bookings'}
                </div>
                <div className='flex flex-col items-center bg-cards text-white hover:bg-cyan-500 py-10 px-4 rounded' onClick={() => navigate('/admin/users')}>
                    <FaUsers /> <br />
                    {users?.length} {users?.length === 1 ? 'User' : 'Registered Users'}
                </div>
                <div className='flex flex-col items-center bg-cards text-white hover:bg-cyan-500 py-10 px-4 rounded' onClick={() => navigate('/admin/vehicles')}>
                    <FaCar /> <br />
                    {vehicles?.length} {vehicles?.length === 1 ? 'Vehicle' : 'Vehicles'}
                </div>
                <div className='flex flex-col items-center bg-cards text-white hover:bg-cyan-500 py-10 px-4 rounded ' onClick={() => navigate('/admin/payments')}>
                    <FaCashRegister /> <br />
                    {payments?.length} {payments?.length === 1 ? 'payment' : 'Payments made'}
                </div>
                <div className='flex flex-col items-center bg-cards text-white hover:bg-cyan-500 py-10 px-4 rounded' onClick={() => navigate('/admin/branches')}>
                    <FaLocationDot /> <br />
                    {locations?.length} {locations?.length === 1 ? 'Location' : 'Branches'}
                </div>
                <div className='flex flex-col items-center bg-cards text-white hover:bg-cyan-500 py-10 px-4 rounded' onClick={() => navigate('/admin/tickets')}>
                    <FaTicketAlt /> <br />
                    {openTickets?.length} {openTickets?.length === 1 ? 'Open Ticket' : 'Open Tickets'}
                </div>
                <div className='flex flex-col items-center bg-cards text-white hover:bg-cyan-500 py-10 px-4 rounded' onClick={() => navigate('/admin/tickets')}>
                    <FaTicketAlt /> <br />
                    {pendingTickets?.length} {pendingTickets?.length === 1 ? 'Ticket in Progress' : 'Tickets in Progress'}
                </div>
                <div className='flex flex-col items-center bg-cards text-white hover:bg-cyan-500 py-10 px-4 rounded' onClick={() => navigate('/admin/fleets')}>
                    <FaTruck /> <br />
                    {fleets?.length} {fleets?.length === 1 ? 'Fleet' : 'Fleets'}
                </div>
            </div>
            <h2 className="text-4xl ml-[40%] p-10 font-bold mb-5">Revenue Generated</h2>
            <div className='flex ml-20'>
                <div>
                    <h2 className="text-2xl ml-[40%] font-bold mb-5">Recent Payments Made</h2>
                    <BarChart
                        width={700}
                        height={400}
                        data={paymantsData}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#b380ff" />
                    </BarChart>
                </div>
                {/* Monthly Revenue Bar Chart */}
                <div className='text-white ml-10 rounded mb-10'>
                    <h3 className='text-2xl ml-[40%] font-bold mb-4'>Annual Revenue</h3>
                    <BarChart
                        width={600}
                        height={400}
                        data={formattedMonthlyRevenueData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#ff1a75" />
                    </BarChart>
                </div>
                {/*  location Analysis */}
            </div>
            <h2 className="text-4xl ml-[40%] p-10 font-bold mb-5"> Branch Perfomance </h2>
            <div className='flex ml-10'>
                <div className='text-white p-6 rounded mb-10'>
                    <h3 className='text-3xl font-bold ml-[40%] mb-4'>Bookings by Location</h3>
                    <BarChart
                        width={700}
                        height={500}
                        data={locationsData}
                        margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#0099e6" >
                            <LabelList dataKey="name" position="top" />
                        </Bar>
                    </BarChart>
                </div>
                <div className='text-white p-6 rounded mb-10'>
                    <h3 className='text-2xl ml-[40%] font-bold mb-4'>Revenue by Location</h3>
                    <BarChart
                        width={700}
                        height={500}
                        data={revenueData}
                        margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#cc0052">
                            <LabelList dataKey="name" position="top" />
                        </Bar>
                    </BarChart>
                </div>
            </div>
        </div>
    );
}

export default Reports;
