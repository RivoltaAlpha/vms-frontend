import React from 'react';
import { useDispatch } from 'react-redux';
import { Toaster } from 'sonner';
import bookingsAPI from '../features/bookings/bookingsApi';
import { removeBooking } from '../features/bookings/bookingSlice';
import { NavLink } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

const stripePromise = loadStripe('pk_test_51PZNFqC2i6Qs2Q6ajp8zHmlssmFAd3WyX85dVs1isOEkwkov9TRtpdMsufCxf06kcfaQpqretsAQCodkcl9hzaz000NDjOls7R');

const BookingDetails: React.FC = () => {
  const dispatch = useDispatch();
  const selectedBookingString = localStorage.getItem('selectedBooking');
  const { user }: any = useSelector((state: RootState) => state.userAuth.user?.user_id && state.userAuth);
  const user_id = user?.user_id;
  const booking = JSON.parse(selectedBookingString || '{}');



  // handle checkout
  const handleCheckout = async (booking_id: number) => {
     try {    
          console.log('Booking ID:', booking_id);
          const selectedBookingString = localStorage.getItem('selectedBooking');
          const booking = JSON.parse(selectedBookingString || '{}');
          console.log('Selected booking:',booking);
          // spread the booking to add user id
          const bookingWithUserId = { ...booking, user_id: user_id };
          console.log('Booking with user ID:', bookingWithUserId);
          console.log('Booking ID:', booking_id);
          console.log ('User ID:', user_id);
          console.log(' Vehicle Availability', booking.vehicle.availability);
          console.log('Booking Status', booking.booking_status);

          // Perform checkout logic here
          const stripe = await stripePromise;
          const header = { 'Content-Type': 'application/json', };

          const checkoutResponse = await axios.post(`https://anirent.azurewebsites.net/payment-checkout/${booking_id}`, JSON.stringify(bookingWithUserId), {
            headers: header,
          });

          const session = await checkoutResponse.data;
          console.log('Checkout session:', session);
          await stripe?.redirectToCheckout({ sessionId: session.id });

        } catch (error) {
          console.error('Error:', error);
        }
  };

    const [deleteBooking] = bookingsAPI.useDeleteBookingMutation();
    const handleDelete = async (id: number) => {
      await deleteBooking(id);
      dispatch(removeBooking());
    };

    if (!booking) return <p>No booking selected</p>;

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <h2 className="text-2xl mt-10 font-bold text-center">Booking Details</h2>
        <div className="container mx-auto mt-8 flex">
          {/* Left side - Image */}
          <div className="w-1/2 p-4">
            <img src={booking.vehicle.vehicleSpec.image_url} className="w-full object-cover rounded-lg" alt="Car Image" />
          </div>
          
          {/* Right side - Details */}
          <div className="w-1/2 p-4 flex flex-col">
          <h2 className="text-4xl mt-10 font-bold text-center">Vehicle Details</h2>
          <div className="mb-6  rounded p-4">
              <p>Manufacturer: {booking.vehicle.vehicleSpec.manufacturer}</p>
              <p>Model: {booking.vehicle.vehicleSpec.model}</p>
              <p>Color: {booking.vehicle.vehicleSpec.color}</p>
              <p>Engine Capacity: {booking.vehicle.vehicleSpec.engine_capacity}</p>
              <p>Seating Capacity: {booking.vehicle.vehicleSpec.seating_capacity}</p>
              <p>Features: {booking.vehicle.vehicleSpec.features}</p>
              <p>Fuel: {booking.vehicle.vehicleSpec.fuel_type}</p>
              <p>Transmission: {booking.vehicle.vehicleSpec.transmission}</p>
              <p>Year: {booking.vehicle.vehicleSpec.year}</p>
              <p>Location: {booking.location.name}</p>
            </div>
            
            {/* Booking Details */}
            <div className="mb-6 rounded p-4">
            <h2 className="text-2xl mt-10 font-bold text-center">Booking</h2>
              <p>Booking Status: {booking.booking_status}</p>
              <p>Cost: {booking.total_amount}</p>
              <p>Pick Up Date: {new Date(booking.booking_date).toDateString()}</p>
              <p>Return Date: {new Date(booking.return_date).toDateString()}</p>
              <p>Pick-up Location: {booking.location.name}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-between">
              <NavLink to="/users/bookings/:user_id">
                <button className="px-4 py-2 bg-teal-600 text-white rounded" onClick={() => dispatch(removeBooking())}>Back</button>
              </NavLink>
              <button className="px-4 py-2 bg-rose-500 text-white rounded" onClick={() => handleCheckout(booking.booking_id)}>Checkout</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => handleDelete(booking.booking_id)}>Delete</button>
            </div>
          </div>
        </div>
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
      </div>
    );
  }

  export default BookingDetails;
