import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentState {
  id: string;
  userId: string;
  bookingId: string;
  amount: number;
  status: string;
  date: string;
}

const initialState: PaymentState[] = [];

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    addPayment(state, action: PayloadAction<PaymentState>) {
      state.push(action.payload);
    },
    updatePayment(state, action: PayloadAction<PaymentState>) {
      const index = state.findIndex(payment => payment.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    removePayment(state, action: PayloadAction<string>) {
      return state.filter(payment => payment.id !== action.payload);
      },
  },
});

export const { addPayment, updatePayment, removePayment } = paymentSlice.actions;
export default paymentSlice.reducer;
