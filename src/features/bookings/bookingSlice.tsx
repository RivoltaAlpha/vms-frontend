import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingState, TBooking } from '../../types/types';

const initialState: BookingState = {
  booking: [],
  selectedBooking: JSON.parse(localStorage.getItem('selectedBooking') || 'null'),
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBooking(state, action: PayloadAction<TBooking[]>) {
      state.booking = action.payload;
    },
    updateBooking(state, action: PayloadAction<TBooking>) {
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
