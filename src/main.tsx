import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import  {store, persistor } from './app/store';
import App from "./App";
import "./index.css";

// Import Slick CSS files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// here we are rendering data
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
