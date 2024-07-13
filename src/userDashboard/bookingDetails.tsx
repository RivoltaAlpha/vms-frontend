import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { bookingsAPI } from '../features/bookings/bookingsApi';

const BookingDetails: React.FC = () => {
  const [ booking, isLoading,error ] = bookingsAPI.useGetBookingQuery(booking_id);
  const { vehicleRate }: any = useSelector((state: RootState) => state.vehicles.selectedVehicle?.rental_rate);

  console.log(booking);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading bookings.</p>;

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <Toaster
          toastOptions={{
            classNames: {
              error: "bg-red-400",
              success: "text-green-400",
              warning: "text-yellow-400",
              info: "bg-blue-400",
            },
          }}
        />

          <ul className='py'>
          <h2 className="text-2xl font-bold mb-5">Booking Details</h2>
          
          <p> Booking Id:</p>
            <li className='w-full p-2  mb-6 border rounded'> {booking?.booking_id}</li>

          <p> User Details:</p>
            <li className='w-full p-2  mb-6 border rounded'> {booking?.user_id}</li>
            <p> Vehicle Details:</p>
            <li className='w-full p-2  mb-6 border rounded'> {booking?.vehicle_id}</li>
            <p> Booking Status:</p>
            <li className='w-full p-2  mb-6 border rounded'> {booking?.booking_status} </li>
            <p> Cost:</p>
            <li className='w-full p-2  mb-6 border rounded'> {booking?.total_amount} </li>
            <p> Pick Up Date:</p>
            <li className='w-full p-2  mb-6 border rounded'> {new Date (booking?.booking_date).toDateString() } </li>
            <p> Return Date:</p>
            <li className='w-full p-2  mb-6 border rounded'> {new Date (booking?.return_date).toDateString() } </li>
            <p> Pick-up Location:</p>
            <li className='w-full p-2  mb-6 border rounded'>  {booking?.location_id}</li>
          </ul>

      </div>
    </>
  );
}

export default BookingDetails;
