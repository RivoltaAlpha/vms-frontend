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
    userId: number;
    vehicleId: number;
    startDate: string;
    endDate: string;
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
  