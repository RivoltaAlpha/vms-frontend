import paymentsAPI from '../features/payments/paymentsApi';
import { TPayment } from '../types/types';
import Navigation from './navigation';

const Payments = () => {
    const { data: payments, isLoading, isError } = paymentsAPI.useGetPaymentsQuery();
    console.log(payments);

    if (isLoading) {
        return <p>Loading payments...</p>;
      }
    
      if (isError) {
        return <p>Error loading payments: {isError}</p>;
      }

      // calculate total amount
      // const calculateTotalAmount = (payments: TPayment[]) => {
      //   return payments.reduce((total, payment) => total + payment.amount, 0);
      // };

      return (
        <div className="flex">
          <Navigation />
          <div className="w-full p-6">
            <h1 className="text-2xl font-bold mb-4">Payments</h1>
    
              <table className=" w-[90%] mx-auto bg-cards rounded p-4 ">
                <thead>
                  <tr>
                    <th className="py-2">Payment ID</th>
                    <th className="py-2">Payment status</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Payment Date</th>
                    <th className="py-2">Payment Method</th>
                    <th className="py-2">User Name</th>
                    <th className="py-2">Vehicle Booked</th>
                    <th className="py-2">Vehicle Model</th>
                    <th className="py-2">Booking Status</th>
                  </tr>
                </thead>
                <tbody>
                {isLoading ? (
                  <tr><td colSpan={8}>Loading...</td></tr>
                ) : isError ? (
                  <tr><td colSpan={8}>Error loading bookings</td></tr>
                ) : (
                  Array.isArray(payments) && payments.map((payment: TPayment) => (
                    <tr key={payment.payment_id} className="border-t ">
                      <td className="py-2  px-4">{payment.payment_id}</td>
                      <td className="py-2 px-4">{payment.payment_status}</td>
                      <td className="py-2 px-4">${payment.amount}</td>
                      <td className="py-2 px-4">{new Date(payment.payment_date).toLocaleDateString()}</td>
                      <td className="py-2 px-4">{payment.payment_method}</td>
                      <td className="py-2 px-4">{payment.user.username}</td>
                      <td className="py-2 px-4">{payment.booking.vehicle.vehicleSpec.manufacturer}</td>
                      <td className="py-2 px-4">{payment.booking.vehicle.vehicleSpec.model}</td>
                      <td className="py-2 px-4">{payment.booking.booking_status}</td>
                    </tr>
                  ))
                )}
                </tbody>
              </table>
          </div>
        </div>
      );
    };
    
    export default Payments;