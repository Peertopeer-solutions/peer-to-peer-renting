import React from 'react'
import { useNavigate , useLocation } from 'react-router-dom'
import { getAuth , signInWithPopup , GoogleAuthProvider } from 'firebase/auth'
import { doc , getDoc , setDoc , serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../../public/assets/svg/googleIcon.svg'

const OAuth = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const onGoogleClick = async(e) => {

        try {
            
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth , provider)
            const user = result.user
            console.log(user)
            // Check for user
            const docRef = doc(db , 'users' , user.uid)
            const docSnap = await getDoc(docRef)

            // If user, doesn,t exist, create user
            if(!docSnap.exists()) {
                await setDoc(doc(db , 'users' , user.uid) , {
                    name : user.displayName,
                    email : user.email,
                    timeStamp : serverTimestamp()
                }) 
            }
            navigate(-1)   

        } catch (error) {
            // console.log(error)
            console.log(error.message)
            toast.error('Could not authorize with Google')
        }
    }

  return (
   
        <button className="ring-1 ring-black shadow-md flex items-center gap-2 p-3 rounded " onClick={onGoogleClick}>
                    <p className='text-[18px]'>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>

            <img className='h-[22px] w-[22px] ' src={googleIcon} alt='google'/> 
        
        
</button>
  
  )
}

export default OAuth