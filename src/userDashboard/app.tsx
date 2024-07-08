// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./navigation";
import { Dashboard } from "./dashboard";
import { ProfilePage } from "./profileUpdate";
import { PaymentPage } from "./payment";
import { BookingForm } from "./bookingForm";
import { ThankYou } from "./thankyou";

export const UserApp: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/book/:vehicleId" element={<BookingForm />} />
            <Route path="/thank-you" element={<ThankYou />} />
            {/* Add other routes here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default UserApp;
