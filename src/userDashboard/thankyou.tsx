import React from 'react';
import { FaCheckDouble } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ThankYou: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/user-dashboard');
  };

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
  <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[1000px] max-w-20xl mx-auto flex">
    <div className="w-3/4 flex items-center justify-center p-8">
      <div className="text-center flex-row text-white">
        <h2 className="text-3xl text-black font-bold mb-4">Payment Complete       <FaCheckDouble/>
        </h2> 
        <img
          src="./images/thanks.png" 
          alt="Thank You"
          className="max-w-full h-auto"
        />
      </div>
    </div>
    <div className="w-1/2 bg-cards p-8 flex items-center justify-center relative">
      <div className="absolute top-4 right-4">
      </div>
      <img
        src="./images/payment.png" 
        alt="Payment Success"
        className="max-w-full h-auto"
      />
    </div>
    </div>
    <button
          onClick={handleGoHome}
          className="bg-cards text-white px-4 py-2 mt-10 rounded"
        >
          Go to Home
        </button>
</div>
  

  );
};

export default ThankYou;
