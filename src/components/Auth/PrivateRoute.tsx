import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = (props) => {
  // Retrieves the value stored in the browser's local storage (JWT token)
  const token = localStorage.getItem('auth');
  //Verify if the user has a token
  // If not, the user is redirected to the loginpage
  return <>{token ? <Route {...props} /> : <Navigate to="/Signin" />}</>;
};

export default PrivateRoute;
