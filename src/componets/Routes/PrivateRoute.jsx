import React, { useContext } from 'react';
import { authContext } from '../Provider/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const navigate = useNavigate()
  const {user, loading} = useContext(authContext)
  if (loading){
    return <div>loading....</div>
  }
  if(user){
    return children
  }
  return <Navigate to='/login'></Navigate>
};

export default PrivateRoute;