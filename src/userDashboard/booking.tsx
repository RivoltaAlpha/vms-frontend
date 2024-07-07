import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('your-publishable-key-here');

const BookNowForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { data: clientSecret } = await axios.post('/api/payment_intent', {
      amount: amount * 100, // Convert to cents
    });

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement!,
        billing_details: {
          name,
          email,
        },
      },
    });

    if (error) {
      console.error(error);
    } else if (paymentIntent?.status === 'succeeded') {
      window.location.href = '/thankyou';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Book a Vehicle</h1>
      <div className="mb-4">
        <label className="block text-lg mb-2">Name</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Email</label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg mb-2">Amount</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          required
        />
      </div>
      <div className="mb-4">
        <CardElement className="p-2 border border-gray-300 rounded" />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!stripe}
      >
        Pay
      </button>
    </form>
  );
};

export const BookNow: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <BookNowForm />
    </Elements>
  );
};

export default BookNow;
