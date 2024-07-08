import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Login from "./pages/login";
import Contact from "./pages/contact";
import Register from "./pages/register";
import Footer from "./components/footer";
import LandingPage from "./pages/landingPage";
import Fleets from "./pages/fleet";
import AboutUs from "./pages/about";
import Explore from "./pages/explore";
import BookingForm from "./userDashboard/bookingForm";
import PaymentPage from "./userDashboard/payment";
import BookingConfirmation from "./userDashboard/bookingForm";
// import UserApp from '../src/userDashboard/app.tsx';
import { Dashboard } from "./userDashboard/dashboard";
import { ThankYou } from "./userDashboard/thankyou";
import Profile from "./userDashboard/profile";
import {ProfileEditPage} from "./userDashboard/profileUpdate";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/fleets" element={<Fleets />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book/:vehicleId" element={<BookingForm />} />
            <Route path="/user-payment" element={<PaymentPage />} />
            <Route
              path="/booking-confirmation"
              element={<BookingConfirmation />}
            />
            <Route path="/user-dashboard" element={<Dashboard />} />
            <Route path="/user-profile" element={<Profile />} />
            <Route path="/edit-profile" element={<ProfileEditPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/book/:vehicleId" element={<BookingForm />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

// Include error handling

export default App;
