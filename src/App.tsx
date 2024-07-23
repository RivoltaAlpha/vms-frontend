import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Login from "./pages/login";
import AdminLogin from "./adminDashboard/login";
import Contact from "./pages/contact";
import Register from "./pages/register";
import Footer from "./components/footer";
import LandingPage from "./pages/landingPage";
// import Fleets from "./pages/fleet";
import AboutUs from "./pages/about";
import Explore from "./pages/explore";
import { BookingForm } from "./userDashboard/bookingForm";
import PaymentPage from "./userDashboard/userPayments";
import BookingConfirmation from "./userDashboard/bookingForm";
import UserBookings from "./userDashboard/user-bookings";
import { Dashboard } from "./userDashboard/dashboard";
import { AdminDashboard } from "./adminDashboard/dashboard";
import ThankYou from "./userDashboard/thankyou";
import Profile from "./userDashboard/profile";
import { ProfileEditPage } from "./userDashboard/profileUpdate";
import BookingDetails from "./userDashboard/bookingDetails";
import ViewDetails from "./adminDashboard/bookingDetails";
import UsersTable from "./adminDashboard/users";
import BookingsTable from "./adminDashboard/bookings";
import VehiclesTable from "./adminDashboard/vehicles";
import AdminProfile from "./adminDashboard/profile";
import UpdateBooking from "./userDashboard/updateBooking";
import VehicleSpec from "./adminDashboard/VehicleSpec";
import CreateVspecForm from "./adminDashboard/createVSpec";
import CreateVehicleForm from "./adminDashboard/createVehicle";
import CreateUserForm from "./adminDashboard/createAdmin";
import Payments from "./adminDashboard/payments";
import LocationsTable from "./adminDashboard/locations";
import CreateLocationForm from "./adminDashboard/addLocation";
import Tickets from "./adminDashboard/tickets";
import UserTickets from "./userDashboard/userTickets";
import CreateTicket from "./userDashboard/ticket";
import TicketReview from "./adminDashboard/reviewTicket";
import PaymentHistory from "./userDashboard/userPayments";
import UpdateLocationForm from "./adminDashboard/updateLocation";
import FleetsTable from "./adminDashboard/fleets";
import AdminProfileEdit from "./adminDashboard/editProfile";

const App = () => {
  return (
    <Router>
      <div className="flex bg-gray-900 text-white flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Common Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/explore" element={<Explore />} />
            {/* <Route path="/fleets" element={<Fleets />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/contact" element={<Contact />} />

            {/* User Routes */}
            <Route path="/users">
              <Route path="payment" element={<PaymentPage />} />
              <Route path="booking-confirmation" element={<BookingConfirmation />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings/:user_id" element={<UserBookings />} />
              <Route path="booking-details/:booking_id" element={<BookingDetails />} />
              <Route path="update-details/:booking_id" element={<UpdateBooking />} />
              <Route path="profile" element={<Profile />} />
              <Route path="edit-profile" element={<ProfileEditPage />} />
              <Route path="paymentHistory/:user_id" element={<PaymentHistory />} />
              <Route path="tickets" element={<UserTickets />} />
              <Route path="createTicket" element={<CreateTicket />} />
              <Route path="book/:vehicle_id" element={<BookingForm />} />
              <Route path="thankyou" element={<ThankYou />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin">
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="editProfile" element={<AdminProfileEdit />} />
              <Route path="users" element={<UsersTable />} />
              <Route path="bookings" element={<BookingsTable />} />
              <Route path="vehicles" element={<VehiclesTable />} />
              <Route path="vspec" element={<VehicleSpec />} />
              <Route path="addVehicle" element={<CreateVehicleForm />} />
              <Route path="addVspec" element={<CreateVspecForm />} />
              <Route path="addAdmin" element={<CreateUserForm />} />
              <Route path="viewDetails/:booking_id" element={<ViewDetails />} />
              <Route path="payments" element={<Payments />} />
              <Route path="branches" element={<LocationsTable />} />
              <Route path="addBranch" element={<CreateLocationForm />} />
              <Route path="updateBranch/:location_id" element={<UpdateLocationForm />} />
              <Route path="tickets" element={<Tickets />} />
              <Route path="ticketReview/:ticket_id" element={<TicketReview />} />
              <Route path="fleets" element={<FleetsTable />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

// Include error handling

export default App;



