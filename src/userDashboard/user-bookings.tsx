import React from 'react';
import { useSelector } from "react-redux";
import { bookingsAPI } from "../features/bookings/bookingsApi";
import { RootState } from '../app/store';
import { Toaster, toast } from 'sonner';
import { Booking, BookingDetails, TIBookings  } from '../types/types';
import { Navigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBooking } from '../features/bookings/bookingSlice';
import { FaBackwardFast } from 'react-icons/fa6';


const UserBookings: React.FC = () => {
  const dispatch = useDispatch();
  const { user }: any = useSelector((state: RootState) => state.userAuth.user?.user_id && state.userAuth);
  const userId = user?.user_id;
  const { data: bookings, isLoading, isError } = bookingsAPI.useGetBookingsByUserIdQuery(userId);
  const [updateBooking] = bookingsAPI.useUpdateBookingMutation();
  const [deleteBooking] = bookingsAPI.useDeleteBookingMutation();  
  
  const handleDelete = async (id: number) => {
      try {
          await deleteBooking(id).unwrap();
          toast.success('Booking deleted successfully');
        } catch (error) {
            toast.error('Error deleting booking');
        }
    };

    const handleViewDetails = (BookingDetails: BookingDetails) => {
      dispatch(setBooking(BookingDetails));
      localStorage.setItem('selectedBooking', JSON.stringify(BookingDetails));
      Navigate({
        to: `/booking-details/${BookingDetails.booking_id}`
      });
    };

    const handleUpdate = async (booking_id: number, data: BookingDetails) => {
      try {
        await updateBooking(booking_id, data).unwrap();
        toast.success('Booking updated successfully');
      } catch (error) {
        toast.error('Error updating booking');
      }
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
      <div className="overflow-y-auto m-[100px] text-base-content bg-base rounded-lg p-4">
        <div className='flex flex-wrap justify-between'>
        <h1 className='text-3xl text-cyan-50 my-4'>{user?.username} Bookings Data</h1>
        <NavLink to="/user-dashboard" className=" text-white rounded mr-2"><FaBackwardFast size={20} /> </NavLink>
        </div>
        <div>
        <table className="table table-xs w-full ml-[10px] px-4">
          <thead>
            <tr className='text-lg'>
              <th className="py-2 px-4 border-b-2 border-gray-300">Booking Id</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Booking Date</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Return Date</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Total Amount</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Status</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Vehicle ID</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={7}>Loading...</td></tr>
            ) : isError ? (
              <tr><td colSpan={7}>Error loading bookings</td></tr>
            ) : (
              bookings && bookings?.map((booking) => (
                <tr key={booking?.booking_id}>
                  <td className="py-2 px-4 border-b border-gray-300">{booking?.booking_id}</td>
                  {/* <td>{booking?.location.name}</td> */}
                  <td className="py-2 px-4 border-b border-gray-300">{new Date(booking?.booking_date).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{new Date(booking?.return_date).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b border-gray-300">${booking?.total_amount}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{booking?.booking_status}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{booking?.vehicle_id}</td>
                  <td className='flex items-center py-2 px-4 border-b border-gray-300 gap-4'>
                    <NavLink
                      className='btn px-6 py-3 bg-teal-400 btn-sm rounded btn-outline btn-success'
                      onClick={() => handleViewDetails(booking)}
                      to={`/booking-details/${booking?.booking_id}`}
                    >
                      View Details
                    </NavLink>
                    <button
                      className='btn px-6 py-3 bg-teal-400 rounded btn-sm btn-outline btn-success'
                      onClick={() => handleUpdate(booking?.booking_id, booking)}
                    >
                      Update
                    </button>
                    <button
                      className='btn px-6 py-3 bg-red-500 btn-sm rounded  btn-outline btn-error'
                      onClick={() => handleDelete(booking.booking_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )
            )}
          </tbody>
          <tfoot className='text-lg py-4 flex-col justify-end'>
            <tr>
              <td colSpan={7}>{bookings ? `${bookings.length} records` : '0 records'}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      </div>
    </>
  );
};

export default UserBookings;