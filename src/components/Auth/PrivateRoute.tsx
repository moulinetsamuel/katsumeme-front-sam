import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  // Retrieves the value stored in the browser's local storage (JWT token)
  const token = localStorage.getItem('auth');
  //Verify if the user has a token
  // If not, the user is redirected to the loginpage
  return (
    <>
      {token ? (
        <Route element={<Element />} {...rest} />
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default PrivateRoute;
