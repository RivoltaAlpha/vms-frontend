import React from 'react';
import Navigation from './navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import paymentsAPI from '../features/payments/paymentsApi';


const PaymentHistory: React.FC = () => {
  const { user }: any = useSelector((state: RootState) => state.userAuth.user?.user_id && state.userAuth);
  const user_id = user?.user_id;
  const { data: payments, error, isLoading } = paymentsAPI.useGetUserPaymentsQuery(user_id);
  console.log ('Payments:', payments);



  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading payments.</p>;
  return (
    <div className='flex'>
      <Navigation />
      <div className="container mt-10 mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-5">My Payments</h2>
        <div className=" p-4 rounded">
          {payments && payments.length > 0 ? (
            payments.map((payment) => (
              <div key={payment.payment_id} className="bg-cards mb-4 p-4 border rounded">
                <p><strong>Payment ID:</strong> {payment.payment_id}</p>
                <p><strong>Amount:</strong> ${payment.amount}</p>
                <p><strong>Status:</strong> {payment.payment_status}</p>
                <p><strong>Date:</strong> {new Date(payment.payment_date).toLocaleDateString()}</p>
                <p><strong>Method:</strong> {payment.payment_method}</p>
                <div className="mt-4">
                  <h3 className="text-lg font-bold">Booked Vehicle Details</h3>
                  <div className="mt-2">
                    <img src={payment.booking.vehicle.vehicleSpec.image_url} alt="Vehicle" className="mt-2 w-64 h-48 object-cover" />
                    <p><strong>Manufacturer:</strong> {payment.booking.vehicle.vehicleSpec.manufacturer}</p>
                    <p><strong>Model:</strong> {payment.booking.vehicle.vehicleSpec.model}</p>
                    <p><strong>Year:</strong> {payment.booking.vehicle.vehicleSpec.year}</p>
                    <p><strong>Fuel Type:</strong> {payment.booking.vehicle.vehicleSpec.fuel_type}</p>
                    <p><strong>Engine Capacity:</strong> {payment.booking.vehicle.vehicleSpec.engine_capacity}</p>
                    <p><strong>Transmission:</strong> {payment.booking.vehicle.vehicleSpec.transmission}</p>
                    <p><strong>Seating Capacity:</strong> {payment.booking.vehicle.vehicleSpec.seating_capacity}</p>
                    <p><strong>Color:</strong> {payment.booking.vehicle.vehicleSpec.color}</p>
                    <p><strong>Features:</strong> {payment.booking.vehicle.vehicleSpec.features}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No payments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};


export default PaymentHistory;
