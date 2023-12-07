import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuthStatus from '../hooks/useAuthStatus'
import Spinner from './Spinner'

const PrivateRoute = ({children}) => {
  // const { pathname } = useLocation();

    const {loggedIn , checkingStatus } = useAuthStatus()
    // const [isValidToken, setIsValidToken] = useState(); // <-- initially undefined
    // useEffect(() => {
    //   // initial mount or route changed, check token
    //   setIsValidToken(!!loggedIn);
    // }, [pathname]);
    
  // if (loggedIn === undefined) {
  //   return null; // or loading indicator/spinner/etc
  // }
    if(checkingStatus){
        return <Spinner/>
    }

  return loggedIn ? children : <Navigate to='/sign-in' />
}

export default PrivateRoute