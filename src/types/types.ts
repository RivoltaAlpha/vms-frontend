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

  // Location
  export interface Location{
    location_id: number;
    name: string;
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
            model: string;  };
    };
    booking_date: string;
    return_date: string;
    total_amount: number;
    booking_status: string;
}


// Payment//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export interface TPayment {
    payment_id: number;
    userId: number;
    bookingId: number;
    amount: number;
    status: string;
    paymentDate: string;
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

export interface BookingFormData {
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date: string;
  return_date: string;
  total_amount: number;
  booking_status: string;
}

export interface BookingDetails {
  booking_id: number;
  booking_date: string;
  return_date: string;
  total_amount: number;
  booking_status: string;

  user:{
    user_id: number
    first_name: string
    last_name: string
    username: string
    email: string
    contact_phone: string
    address: string
    role: string
  }
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
    };
  };
  location:{
    location_id: number
    name: string
  } ;
  }

  export interface BookingState {
    booking: {
      booking_id: number;
      user_id: number;
      vehicle_id: number;
      location_id: number;
      booking_date: string;
      return_date: string;
      total_amount: number;
      booking_status: string;
    };
    selectedBooking: 
    {
      booking_id: number;
      user_id: number;
      vehicle_id: number;
      location_id: number;
      booking_date: string;
      return_date: string;
      total_amount: number;
      booking_status: string;
    }| null;
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
    vehicleSpec: TIVehicleSpec;
    // image_url: string;
    rental_rate: number;
    availability: boolean;
  }

  export interface TSVehicle {
    vehicle_id: number;
    // image_url: string;
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
    }
  }


  export interface VehiclesState {
    vehicle: TIVehicle[];
    selectedVehicle: TIVehicle | null;
  }

