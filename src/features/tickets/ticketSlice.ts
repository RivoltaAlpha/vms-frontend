import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tickets } from '../../types/types';


 const ticketSlice = createSlice({
    name: 'ticket',
    initialState: {
        selectedTicket: JSON.parse(localStorage.getItem('selectedTicket') || 'null'),
    },
    reducers: {
        setTicket: (state, action: PayloadAction<Tickets>) => {
            state.selectedTicket = action.payload;
            localStorage.setItem('selectedTicket', JSON.stringify(action.payload));
        },
        updateTicket: (state, action: PayloadAction<Tickets | null>) => {
            state.selectedTicket = action.payload;
            localStorage.setItem('selectedTicket', JSON.stringify(action.payload));
        },
        clearTicket: (state) => {
            state.selectedTicket = null;
            localStorage.removeItem('selectedTicket');
        }
    },
});

export const { setTicket, updateTicket, clearTicket } = ticketSlice.actions;
export default ticketSlice.reducer;