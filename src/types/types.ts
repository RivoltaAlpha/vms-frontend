// Register User
export interface RUser {
    first_name: string;
    last_name: string;
    username: string;
    contact_phone: string;
    email: string;
    address: string;
    password: string;
  }

  // create User
  export interface User {
    first_name: string;
    last_name: string;
    username: string;
    contact_phone: string;
    email: string;
    address: string;
    password: string;
    role: string;
}

  // Login User
  export interface Luser {
      username: string;
      password: string;
      role: string;
      token: string;
  }
  export interface LoginResponse {
        username: string;
        role: string;
        password: string;
    }

 

  // User
 export type TUser = {
    user_id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    contact_phone: string;
    address: string;
    role: string;
    token: string;
}

// Inference
export interface TIUser {
  user_id: number
  first_name: string
  last_name: string
  username: string
  email: string
  contact_phone: string
  address: string
} 


// Booking Details
export interface TBooking {
    booking_id: number;
    user_id: number;
    vehicle_id: number;
    location: {
        location_id: number;
        name: string;
      };
    name : string;
    vehicle : {
        vehicle_id: number;
        rental_rate: number;
        availability: boolean;
        vehicleSpec: {
            body_type: string;
            fuel_type: string;
            transmission: string;
            color: string;
            engine_capacity: number;
            seating_capacity: number;
            year: number;
            features: string[];
            manufacturer: string;
            model: string;
            image_url: string;};
    };
    booking_date: string;
    return_date: string;
    total_amount: number;
    booking_status: string;
}


// Payment//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface TPayment {
    payment_id: number;
    user_id: number;
    booking_id: number;
    amount: number;
    payment_status: string;
    payment_date: string;
    payment_method: string;
    transaction_id: string;
    booking: TBooking;
    user: TUser;
    vehicle : {
      vehicle_id: number;
      rental_rate: number;
      availability: boolean;
      vehicleSpec: {
          body_type: string;
          fuel_type: string;
          transmission: string;
          color: string;
          engine_capacity: number;
          seating_capacity: number;
          year: number;
          features: string[];
          manufacturer: string;
          model: string;
          image_url: string;};
  };
}

export interface PaymentState {
  id: string;
  userId: string;
  bookingId: string;
  amount: number;
  status: string;
  date: string;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface Booking {
  booking_id: number;
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date: string;
  return_date: string;
  total_amount: number;
  booking_status: string;
}

export interface TIBookings{
  booking_id: number;
  user_id: [TIUser];
  vehicle_id: [TSVehicle];
  location_id: [Location];
  booking_date: string;
  return_date: string;
  total_amount: number;
  booking_status: string;
}

export interface BookingFormData {
  booking_id: number;
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date: string;
  return_date: string;
  total_amount: number;
  booking_status: string;
}

export interface BookingDetails {
  bookings: TBooking;
  booking_id: number;
  booking_date: string;
  return_date: string;
  total_amount: number;
  booking_status: string;
  location_id: number
  vehicle_id: number
  user_id: number
  user: TUser
  location: Location
  vehicle:{
    vehicle_id: number
    rental_rate: number
    availability: boolean
    vehicleSpec: {
      body_type: string;
      fuel_type: string;
      transmission: string;
      color: string;
      engine_capacity: number;
      seating_capacity: number;
      year: number;
      features: string[];
      manufacturer: string;
      model: string;
      image_url: string;
    };
  };
  }

  export interface BookingState {
    booking: BookingDetails | null;
    selectedBooking: BookingDetails| null;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  export interface UserAuthenticatedState {
    user:{
        user_id: number
        first_name: string
        last_name: string
        username: string
        email: string
        contact_phone: string
        address: string
        role: string
    } | null
    token: string | null
    isAuthenticated: boolean
    loading: boolean
    error: string | null
  }
  export interface UserState {
    user: TUser | null;
    loading: boolean;
    error: string | null;
  }
  

//////////// Vehicle/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  export interface TIVehicle {
    vehicle_id: number;
    vehicleSpec: {
      manufacturer: string;
      model: string;
      year: number;
      fuel_type: string;
      engine_capacity: number;
      transmission: string;
      seating_capacity: number;
      color: string;
      features: string[];
      body_type: string;
      image_url: string;
    }
    rental_rate: number;
    availability: boolean;
  }

  export interface TSVehicle {
    vehicle_id: number;
    image_url: string;
    rental_rate: number;
    availability: boolean;
    vehicleSpec: [TIVehicleSpec];
  }

  export interface TIVehicleSpec {
    vehicle_id: number;
    rental_rate: number;
    availability: boolean;
    vehicleSpec: {
      manufacturer: string;
      model: string;
      year: number;
      fuel_type: string;
      engine_capacity: number;
      transmission: string;
      seating_capacity: number;
      color: string;
      features: string[];
      body_type: string;
      image_url: string;
    }
  }


  export interface VehiclesState {
    vehicle: TIVehicle[];
    selectedVehicle: TIVehicle | null;
  }

//////////////////////////////////////////////////////////////////////////////////
export interface Vspec {
  vehicleSpec_id: number;
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: number;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string[];
  body_type: string;
  image_url: string;
}


export interface TLocation {
  location_id: number;
  name: string;
  address: string;
  contact_phone: string;
  city: string;
}

 // Location
 export interface Location{
  location_id: number;
  name: string;
  address: string;
  contact_phone: number;
  city: string;
}

export interface LocationState {
  location: TLocation[];
  selectedLocation: TLocation | null;
}

export interface Tickets {
  ticket_id: number;
  user: TUser;
  subject: string;
  description: string;
  ticket_status: string;
}