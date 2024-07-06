// src/features/bookings/bookingSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookingState {
  id: string;
  userId: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  status: string;
}

const initialState: BookingState[] = [];

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addBooking(state, action: PayloadAction<BookingState>) {
      state.push(action.payload);
    },
    updateBooking(state, action: PayloadAction<BookingState>) {
      const index = state.findIndex(booking => booking.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removeBooking(state, action: PayloadAction<string>) {
      return state.filter(booking => booking.id !== action.payload);
    },
  },
});

export const { addBooking, updateBooking, removeBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
