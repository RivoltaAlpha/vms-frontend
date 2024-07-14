import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingState, Booking, BookingDetails } from '../../types/types';

const initialState: BookingState = {
  selectedBooking: JSON.parse(localStorage.getItem('selectedBooking') || 'null'),
  booking: JSON.parse(localStorage.getItem('booking') || 'null'),
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBooking(state, action: PayloadAction<BookingDetails>) {
      state.booking = action.payload;
      localStorage.setItem('booking', JSON.stringify(action.payload));
    },
    updateBooking(state, action: PayloadAction<Booking>) {
      state.selectedBooking = action.payload;
      localStorage.setItem('selectedBooking', JSON.stringify(action.payload));
    },
    removeBooking(state) {
      state.selectedBooking = null;
      localStorage.removeItem('selectedBooking');},
  },
});

export const { setBooking, updateBooking, removeBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
