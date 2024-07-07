import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PZNFqC2i6Qs2Q6ajp8zHmlssmFAd3WyX85dVs1isOEkwkov9TRtpdMsufCxf06kcfaQpqretsAQCodkcl9hzaz000NDjOls7R');

// const PaymentForm: React.FC<{ amount: number, onSuccess: () => void }> = ({ amount, onSuccess }) => {
//   // ... (keep the existing PaymentForm component as is)
// };

export const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData, vehicle } = location.state as any;

  const calculateTotalAmount = () => {
    const startDate = new Date(bookingData.booking_date);
    const endDate = new Date(bookingData.return_date);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    return days * vehicle.rental_rate;
  };

  const handlePaymentSuccess = async () => {
    // ... (keep the existing handlePaymentSuccess function as is)
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <div className="flex">
        <div className="w-1/2 pr-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-5">Complete Your Booking</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
              <p>Vehicle: {vehicle.vehicleSpec.manufacturer} {vehicle.vehicleSpec.model}</p>
              <p>Pickup Date: {new Date(bookingData.booking_date).toLocaleDateString()}</p>
              <p>Return Date: {new Date(bookingData.return_date).toLocaleDateString()}</p>
              <p className="font-bold mt-2">Total Amount: ${calculateTotalAmount().toFixed(2)}</p>
            </div>
            <Elements stripe={stripePromise}>
              <PaymentForm amount={calculateTotalAmount()} onSuccess={handlePaymentSuccess} />
            </Elements>
          </div>
        </div>
        <div className="w-1/2 pl-8">
          <div className="bg-gray-100 rounded-lg p-6 h-full flex items-center justify-center">
            <div className="w-64 h-128 bg-white rounded-3xl shadow-lg p-4">
              <div className="bg-teal-500 text-white p-4 rounded-t-2xl">
                <h3 className="text-lg font-bold">Payment Preview</h3>
              </div>
              <div className="p-4">
                <p className="text-sm">Amount: ${calculateTotalAmount().toFixed(2)}</p>
                <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
                <p className="text-sm">Vehicle: {vehicle.vehicleSpec.manufacturer} {vehicle.vehicleSpec.model}</p>
                <p className="text-sm">Status: Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;