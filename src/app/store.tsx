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
import { registrationAPI } from '../features/registration/registrationSlice';
import { authApi } from "../features/registration/authSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    usersAPI.reducerPath,
    bookingsAPI.reducerPath,
    paymentsAPI.reducerPath,
  ],
};

const rootReducer = combineReducers({
  [usersAPI.reducerPath]: usersAPI.reducer,
  [bookingsAPI.reducerPath]: bookingsAPI.reducer,
  [paymentsAPI.reducerPath]: paymentsAPI.reducer,
  [registrationAPI.reducerPath]: registrationAPI.reducer,
  [authApi.reducerPath]: authApi.reducer,
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
      paymentsAPI.middleware,
      registrationAPI.middleware,
      authApi.middleware
    ),
});

const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
