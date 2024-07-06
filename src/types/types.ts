
 export interface TUser {
    id: number;
    fullname: string;
    email: string;
    phone: string;
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
