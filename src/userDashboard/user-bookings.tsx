import React from 'react';
import { useSelector } from "react-redux";
import { bookingsAPI } from "../features/bookings/bookingsApi";
import { RootState } from '../app/store';
import { Toaster, toast } from 'sonner';
import { BookingDetails } from '../types/types';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBooking } from '../features/bookings/bookingSlice';
import Navigation from './navigation';

const UserBookings: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user }: any = useSelector((state: RootState) => state.userAuth.user?.user_id && state.userAuth);
  const userId = user?.user_id;
  const { data, isLoading, isError } = bookingsAPI.useGetBookingsByUserIdQuery(userId);

  const bookings = data?.[0]?.bookings || []; // Access nested bookings array
  console.log(bookings);

  const [deleteBooking] = bookingsAPI.useDeleteBookingMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteBooking(id).unwrap();
      toast.success('Booking deleted successfully');
    } catch (error) {
      toast.error('Error deleting booking');
    }
  };

  const handleViewDetails = (booking: BookingDetails) => {
    dispatch(setBooking(booking));
    localStorage.setItem('selectedBooking', JSON.stringify(booking));
    navigate(`/booking-details/${booking.booking_id}`);
  };

  return (
    <>
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
      <div className='flex flex-col lg:flex-row gap-10'>
        <Navigation />
        <div className="overflow-y-auto m-[10px] mb-12 text-base-content bg-cards rounded-lg p-4 w-full">
          <div className='flex flex-wrap justify-between'>
            <h1 className='text-3xl text-cyan-50 my-4'>{user?.username} Bookings Data</h1>
          </div>
          <div className="m-[20px]">
            <table className="table-auto w-full ml-[10px] px-4">
              <thead>
                <tr className='text-lg'>
                  <th className="py-2 px-4 border-b-2 border-gray-300">Booking Id</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300">Vehicle</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300">Location</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300">Total Amount</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300">Status</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300">Booking Date</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300">Return Date</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={8}>Loading...</td></tr>
                ) : isError ? (
                  <tr><td colSpan={8}>Error loading bookings</td></tr>
                ) : (
                  Array.isArray(bookings) && bookings.map((booking: BookingDetails) => (
                    <tr key={booking?.booking_id}>
                      <td className="py-2 px-4 border-b border-gray-300">{booking?.booking_id}</td>
                      <td className="py-2 px-4 border-b border-gray-300">{booking?.vehicle.vehicleSpec.model}</td>
                      <td className="py-2 px-4 border-b border-gray-300">{booking?.location.name}</td>
                      <td className="py-2 px-4 border-b border-gray-300">${booking?.total_amount}</td>
                      <td className="py-2 px-4 border-b border-gray-300">{booking?.booking_status}</td>
                      <td className="py-2 px-4 border-b border-gray-300">{new Date(booking?.booking_date).toLocaleString()}</td>
                      <td className="py-2 px-4 border-b border-gray-300">{new Date(booking?.return_date).toLocaleString()}</td>
                      <td className='flex flex-col md:flex-row items-center py-2 px-4 border-b border-gray-300 gap-4'>
                        <NavLink
                          className='btn px-6 py-3 bg-teal-400 btn-sm rounded btn-outline btn-success'
                          onClick={() => handleViewDetails(booking)}
                          to={`/booking-details/${booking?.booking_id}`}
                        >
                          View Details
                        </NavLink>
                        <button
                          className='btn px-6 py-3 bg-red-500 btn-sm rounded btn-outline btn-error'
                          onClick={() => handleDelete(booking.booking_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot className='text-lg py-4 flex-col justify-end'>
                <tr>
                  <td colSpan={8}>{Array.isArray(bookings) ? `${bookings.length} records` : '0 records'}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBookings;
