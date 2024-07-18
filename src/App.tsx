import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Login from "./pages/login";
import AdminLogin from "./adminDashboard/login";
import Contact from "./pages/contact";
import Register from "./pages/register";
import Footer from "./components/footer";
import LandingPage from "./pages/landingPage";
import Fleets from "./pages/fleet";
import AboutUs from "./pages/about";
import Explore from "./pages/explore";
import { BookingForm } from "./userDashboard/bookingForm";
import PaymentPage from "./userDashboard/payment";
import BookingConfirmation from "./userDashboard/bookingForm";
import UserBookings from "./userDashboard/user-bookings";
import { Dashboard } from "./userDashboard/dashboard";
import {AdminDashboard } from "./adminDashboard/dashboard";
import { ThankYou } from "./userDashboard/thankyou";
import Profile from "./userDashboard/profile";
import {ProfileEditPage} from "./userDashboard/profileUpdate";
import BookingDetails  from "./userDashboard/bookingDetails";
import ViewDetails  from "./adminDashboard/bookingDetails";
import UsersTable from "./adminDashboard/users";
import BookingsTable from "./adminDashboard/bookings";
import VehiclesTable from "./adminDashboard/vehicles";
import AdminProfile from "./adminDashboard/profile"
import UpdateBooking from "./userDashboard/updateBooking"
import VehicleSpec from "./adminDashboard/VehicleSpec";
import CreateVspecForm from "./adminDashboard/createVSpec";
import CreateVehicleForm from "./adminDashboard/createVehicle";
import CreateUserForm from "./adminDashboard/createAdmin";
import Payments from "./adminDashboard/payments";
import LocationsTable from "./adminDashboard/locations";
// import Navigation from "./adminDashboard/navigation";

const App = () => {
  return (
    <Router>
      <div className="flex bg-gray-200 flex-col min-h-screen">
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
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/user-payment" element={<PaymentPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/user-dashboard" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/user-bookings/:user_id" element={<UserBookings />} />
            <Route path="/booking-details/:booking_id" element={<BookingDetails />} />
            <Route path="/update-details/:booking_id" element={<UpdateBooking />} />
            <Route path="/user-profile" element={<Profile />} />
            <Route path="/admin-profile" element={<AdminProfile />} />
            <Route path="/edit-profile" element={<ProfileEditPage />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/branches" element={<LocationsTable />} />
            <Route path="/book/:vehicle_id" element={<BookingForm />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/users" element={<UsersTable />} />
            <Route path="/bookings" element={<BookingsTable />} />
            <Route path="/vehicles" element={<VehiclesTable />} />
            <Route path="/vspec" element={<VehicleSpec />} />
            <Route path="/addVehicle" element={<CreateVehicleForm />} />
            <Route path="/addVspec" element={<CreateVspecForm />} />
            <Route path="/addAdmin" element={<CreateUserForm />} />
            <Route path="/viewDetails/:booking_id" element={<ViewDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

// Include error handling

export default App;
