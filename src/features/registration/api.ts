// api.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// PrivateRoute.tsx
import { Route, redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component:, ...rest }:any) => {
  const token = localStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
