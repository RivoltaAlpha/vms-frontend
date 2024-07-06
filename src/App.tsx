import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header'
import Login from './pages/login';
import Contact from './pages/contact';
import Register from './pages/register';
import Footer from './components/footer';
import LandingPage from './pages/landingPage';
import Fleets from './pages/fleet';
import AboutUs from './pages/about';
import Explore from './pages/explore';
import BookingForm from './userDashboard/bookingForm';
import PaymentPage from './userDashboard/payment';
import BookingConfirmation from './userDashboard/bookingForm';


const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/fleets" element={<Fleets />} />
            <Route path="/register" element={<Register />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book/:vehicleId" element={<BookingForm />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

// Include error handling 


export default App;