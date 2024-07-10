// features/vehicles/vehicleSlice.TI
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIVehicle } from '../../types/types';
import { VehiclesState } from '../../types/types';


const initialState: VehiclesState = {
  vehicle: [],
  selectedVehicle: JSON.parse(localStorage.getItem('selectedVehicle') || 'null'),
};

const vehiclesSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setVehicles(state, action: PayloadAction<TIVehicle[]>) {
      state.vehicle = action.payload;
    },
    setSelectedVehicle(state, action: PayloadAction<TIVehicle>) {
      state.selectedVehicle = action.payload;
      localStorage.setItem('selectedVehicle', JSON.stringify(action.payload));
    },
    clearSelectedVehicle(state) {
      state.selectedVehicle = null;
      localStorage.removeItem('selectedVehicle');
    },
  },
});

export const { setVehicles, setSelectedVehicle, clearSelectedVehicle } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
