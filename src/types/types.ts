export interface RUser {
    first_name: string;
    last_name: string;
    username: string;
    contact_phone: string;
    email: string;
    address: string;
    password: string;
  }
  export interface Luser {
      username: string;
      password: string;
      role: string;
      token: string;
  }
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
export interface TBooking {
    booking_id: number;
    user_id: number;
    vehicle_id: number;
    location_id: number;
    booking_date: string;
    return_date: string;
    total_amount: number;
    status: string;
}

export interface TPayment {
    payment_id: number;
    userId: number;
    bookingId: number;
    amount: number;
    status: string;
    paymentDate: string;
}

export interface LoginResponse {
      username: string;
      role: string;
      password: string;
  }

export interface TIUser {
    user_id: number
    first_name: string
    last_name: string
    username: string
    email: string
    contact_phone: string
    address: string
    
} 


export interface Booking {
    booking_id: number;
    tableNumber: string;
    capacity: string;
    location: string;
    type: string;
    seats: number;
  }


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
  
  export interface BookingFormData {
    user_id: number;
    vehicle_id: number;
    location_id: number;
    booking_date: string;
    return_date: string;
    total_amount: number;
    status: string;
  }

  export interface TIVehicle {
    vehicle_id: number;
    vehicleSpec: TIVehicleSpec;
    // image_url: string;
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
    vehicleSpec: TIVehicleSpec;
    // image_url: string;
    rental_rate: number;
    availability: boolean;
    manufacturer: string;
    model: string;
    year: number;
    fuel_type: string;
    engine_capacity: number;
    transmission: string;
    seating_capacity: number;
    color: string;
    features: string[];
  }