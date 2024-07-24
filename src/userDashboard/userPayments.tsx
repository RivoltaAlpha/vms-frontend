import React from 'react';
import Navigation from './navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import paymentsAPI from '../features/payments/paymentsApi';
import { SyncLoader } from 'react-spinners';


const PaymentHistory: React.FC = () => {
  const { user }: any = useSelector((state: RootState) => state.userAuth.user?.user_id && state.userAuth);
  const user_id = user?.user_id;
  const { data: payments, error, isLoading } = paymentsAPI.useGetUserPaymentsQuery(user_id);

    // Conditional rendering for loading and error states
    if (isLoading) return <p>
    <SyncLoader
      color="#116696"
      loading={isLoading}
      size={20}
      aria-label="Loading Spinner"
      data-testid="loader"
      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    />
  </p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <div className='flex bg-white text-black'>
      <Navigation />
      <div className="container mt-10 mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-5">My Payments</h2>
        <div className=" p-4 grid grid-cols-1 md:grid-cols-2 gap-8 rounded">
          {payments && payments.length > 0 ? (
            payments.map((payment) => (
              <div key={payment.payment_id} className="bg-cards flex justify-center items-center text-white flex-col mb-4 p-1 border rounded">
                <div className="mt-4">
                  <h3 className="text-lg font-bold">Booked Vehicle</h3>
                  <div className="mt-2 w-[400px] h-[200px]">
                    <img src={payment.booking.vehicle.vehicleSpec.image_url} alt="Vehicle" className="mt-2 w-full h-full object-cover" />
                  </div>
                </div>
                <div className="mt-4">
                  <p><strong>Vehicle:</strong> {payment.booking.vehicle.vehicleSpec.manufacturer} {payment.booking.vehicle.vehicleSpec.model}</p>
                  <p className=' py-2'><strong>Amount:</strong> ${payment.amount}</p>
                  <p className=' py-2'><strong>Status:</strong> {payment.payment_status}</p>
                  <p className=' py-2'><strong>Date:</strong> {new Date(payment.payment_date).toLocaleDateString()}</p>
                  <p className=' py-2'><strong>Method:</strong> {payment.payment_method}</p>
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
