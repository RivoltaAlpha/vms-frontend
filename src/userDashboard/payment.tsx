import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51PZNFqC2i6Qs2Q6ajp8zHmlssmFAd3WyX85dVs1isOEkwkov9TRtpdMsufCxf06kcfaQpqretsAQCodkcl9hzaz000NDjOls7R');

const PaymentForm: React.FC<{ amount: number, onSuccess: () => void }> = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();         
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message || 'An error occurred');
        setProcessing(false);
      } else {
        // Send paymentMethod.id to your server for processing
        console.log(paymentMethod.id);
        // If successful, call onSuccess()
        onSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement />
      {error && <div className="text-red-500">{error}</div>}
      <button 
        type="submit" 
        disabled={!stripe || processing} 
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300"
      >
        Pay ${amount.toFixed(2)}
      </button>
    </form>
  );
};

const PaymentPage: React.FC = () => {
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
    // Send booking data to your server to create the booking
    // Replace with your actual API call
    await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...bookingData,
        total_amount: calculateTotalAmount(),
        booking_status: 'Confirmed',
      }),
    });

    navigate('/booking-confirmation');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
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
  );
};

export default PaymentPage;









