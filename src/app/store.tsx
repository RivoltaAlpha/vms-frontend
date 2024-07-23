import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE, 
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { usersAPI } from "../features/users/usersAPI";
import { bookingsAPI } from "../features/bookings/bookingsApi";
import { paymentsAPI } from "../features/payments/paymentsApi";
import { VehiclesAPI } from "../features/vehicles/vehicleAPI";
import { registrationAPI } from "../features/registration/registrationAPI";
import { authApi } from "../features/registration/loginAPI";
import { VspecAPI } from "../features/Vspec/vspecAPI";
import { locationsAPI } from "../features/locations/locationsAPI";
import { ticketsAPI } from "../features/tickets/ticketsAPI";
import { FleetAPI } from "../features/fleets/fleetsAPI";
import UserAuthReducer from "../features/registration/userAuthSlice";
import vehicleReducer from '../features/vehicles/vehiclesSlice';
import bookingReducer from '../features/bookings/bookingSlice';
import ticketsReducer from '../features/tickets/ticketSlice';
import LocationReducer from '../features/locations/locationSlice';

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    usersAPI.reducerPath,
    bookingsAPI.reducerPath,
    paymentsAPI.reducerPath,
    VehiclesAPI.reducerPath,
    locationsAPI.reducerPath,
    registrationAPI.reducerPath,
    authApi.reducerPath,
    VspecAPI.reducerPath,
    ticketsAPI.reducerPath,
    FleetAPI.reducerPath
  ],
  whitelist: [authApi.reducerPath],
};

const rootReducer = combineReducers({
  [usersAPI.reducerPath]: usersAPI.reducer,
  [bookingsAPI.reducerPath]: bookingsAPI.reducer,
  [paymentsAPI.reducerPath]: paymentsAPI.reducer,
  [VehiclesAPI.reducerPath]: VehiclesAPI.reducer,
  [registrationAPI.reducerPath]: registrationAPI.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [VspecAPI.reducerPath]: VspecAPI.reducer,
  [locationsAPI.reducerPath]: locationsAPI.reducer,
  [ticketsAPI.reducerPath]: ticketsAPI.reducer,
  [FleetAPI.reducerPath]: FleetAPI.reducer,
  tickets: ticketsReducer,
  userAuth: UserAuthReducer,
  vehicles: vehicleReducer,
  booking: bookingReducer,
  location: LocationReducer
  // Add other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      usersAPI.middleware,
      bookingsAPI.middleware,
      VehiclesAPI.middleware,
      paymentsAPI.middleware,
      registrationAPI.middleware,
      VspecAPI.middleware,
      authApi.middleware,
      locationsAPI.middleware,
      ticketsAPI.middleware,
      FleetAPI.middleware
      // Add other middleware here
    ),
});

const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
