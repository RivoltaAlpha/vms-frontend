export interface RUser {
    first_name: string;
    last_name: string;
    user_name: string;
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
 export interface TUser {
    id: number;
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
    contact_phone: string;
    address: string;
}
export interface TBooking {
    id: number;
    userId: number;
    vehicleId: number;
    startDate: string;
    endDate: string;
    status: string;
}

export interface TPayment {
    id: number;
    userId: number;
    bookingId: number;
    amount: number;
    status: string;
    paymentDate: string;
}

export interface LoginResponse {
    user: {
      username: string;
      role: string;
      // Other user data as needed
    };
    role: Luser['role'];
    token: string;
  }