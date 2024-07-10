import React from 'react';
import { useSelector } from "react-redux";
import { bookingsAPI } from "../features/bookings/bookingsApi";
import { RootState } from '../app/store';
import { Toaster, toast } from 'sonner';
import { TBooking } from '../types/types';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBooking } from '../features/bookings/bookingSlice';

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

   const  handleViewDetails = (booking: TBooking[] ) => {
    dispatch(setBooking(booking)); 
    console.log('Dispatch:', booking);
     };

  const handleUpdate = async (booking_id: number, data: Partial<TBooking>) => {
    try {
      await updateBooking({booking_id, ...data }).unwrap();
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
      <div className="overflow-x-auto m-[100px] text-base-content bg-base rounded-lg p-4">
        <h1 className='text-3xl text-cyan-50 my-4'>{user?.username} Bookings Data</h1>
        <table className="table table-xs w-full ml-12 px-4">
          <thead>
            <tr className='text-lg'>
              <th>Location</th>
              <th>Booking Date</th>
              <th>Return Date</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Vehicle ID</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={7}>Loading...</td></tr>
            ) : isError ? (
              <tr><td colSpan={7}>Error loading bookings</td></tr>
            ) : (
              bookings && bookings.map((booking) => (
                <tr key={booking.booking_id}>
                  <td>{booking.location_id}</td>
                  <td>{new Date(booking.booking_date).toLocaleString()}</td>
                  <td>{new Date(booking.return_date).toLocaleString()}</td>
                  <td>${booking.total_amount}</td>
                  <td>{booking.status}</td>
                  <td>{booking.vehicle_id}</td>
                  <td className='flex py-4 gap-4'>
                    <NavLink
                      className='btn px-6 py-3 bg-teal-400 btn-sm btn-outline btn-success'
                      onClick={() => handleViewDetails([booking])}
                      to={`/booking-details/${booking.booking_id}`}
                    >
                      View Details
                    </NavLink>
                    <button
                      className='btn px-6 py-3 bg-teal-400 btn-sm btn-outline btn-success'
                      onClick={() => handleUpdate(booking.booking_id, booking)}
                    >
                      Update
                    </button>
                    <button
                      className='btn px-6 py-3 bg-red-500 btn-sm btn-outline btn-error'
                      onClick={() => handleDelete(booking.booking_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot className='text-lg flex-col justify-end'>
            <tr>
              <td colSpan={7}>{bookings ? `${bookings.length} records` : '0 records'}</td>
              <NavLink to="/user-dashboard" className="px-4 py-2 bg-teal-500 text-white rounded mr-2">Dashboard</NavLink>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default UserBookings;