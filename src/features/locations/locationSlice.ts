import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocationState, TLocation } from '../../types/types';


const initialState: LocationState = {
    location: [],
    selectedLocation: JSON.parse(localStorage.getItem('selectedLocation') || 'null'),
};

const locationSlice = createSlice({
    name: ' location[] as location ',
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<TLocation[]>) => {
            state.location = action.payload;
            localStorage.setItem('location', JSON.stringify(action.payload));
        },
        updateLocation: (state, action: PayloadAction<TLocation | null>) => {
            state.selectedLocation = action.payload;
            localStorage.setItem('selectedLocation', JSON.stringify(action.payload));
          },
        removeLocation: (state) => {   
            state.selectedLocation = null;
            localStorage.removeItem('selectedLocation');

        }
    },
});

export const { setLocation, removeLocation, updateLocation } = locationSlice.actions;
export default locationSlice.reducer;