import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../FirebaseAuthContext';
import { toast } from 'react-toastify' 
import PhoneVerification from '../components/PhoneVerification';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase.config';
const ProfileSetup = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);
  const [form, setForm] = useState({
    BusinessName : "",
    
  })
  


  useEffect(() => {
    // Get the current user's email when the component mounts
    const user = authCtx.currentUser;
    if (user) {
      setEmail(user.email);
   
    }
  }, []);



  return (
   <div>


   </div>
  );
}

export default ProfileSetup
