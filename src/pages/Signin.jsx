import React from 'react'
import { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../../public/assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../../public/assets/svg/visibilityIcon.svg'
import { getAuth , signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify' 
import OAuth from '../components/OAuth'
import PageWrapper from '../components/Layout/PageWrapper'
import { IoIosArrowForward, IoIosEye, IoIosLock, IoIosMail } from 'react-icons/io'


const Signin = () => {
    const [showPassword , setShowPassword] = useState(false)
    const [formData , setFormData] = useState({
        email:'',
        password:''
    })
    const { email , password } = formData
    const navigate = useNavigate()
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value,

        }))

    }
    const onSubmit = async(e) => {
        e.preventDefault()
        try {
            const auth = getAuth()
            const userCredential = await signInWithEmailAndPassword( auth , email, password)

            if (userCredential.user) {
                navigate('/')
            }
        } catch (error) {
            toast.error('Wrong User Credentials')
        }
        
    }
  return (
    <PageWrapper> <div className='bg-gradient-to-l from-indigo-400 to-blue-500 md:border flex flex-col items-center justify-center max-w-fit p-9  rounded-xl  space-y-6  w-full  mx-auto md:h-[80vh] sm:text-[16px] md:text-xl '>
        <header>
            <p className='text-white font-bold text-2xl'>Welcome!</p>
        </header>
        <form onSubmit={onSubmit} className='space-y-2'>
            <div className='flex space-x-2 w-full items-center'>
            <label htmlFor="email">
                <IoIosMail className='text-sm text-white'/>
            </label>
            <input type='email'
            className='text-black bg-white opacity-50 p-1 rounded-2xl text-sm w-full'
            placeholder='Email'
            id = 'email'
            value={email}
            onChange={onChange}/>
            </div>
           
            <div className='flex space-x-2 w-full items-center'>
                <label htmlFor="password">
                    <IoIosLock className='text-sm text-white'/>
                </label>
                <div className='flex justify-between items-center relative h-fit w-full'>
                     <input type={showPassword? 'text' : 'password' }
                className='text-black bg-white opacity-50 p-1 rounded-2xl text-sm w-full' placeholder="Password"
                id="password" value={password} onChange={onChange} />
                <IoIosEye className='absolute right-2  text-sm  '  onClick={() => setShowPassword((prevState)=> !prevState)}/>
                </div>
               

            </div>
            <div className='flex justify-between'>
            <div className=' flex  items-center '>
                <p className='text-sm font-bold text-white'> Sign In</p>
                <button className=''> 
                <IoIosArrowForward className='text-sm text-white'/>
                </button>
            </div>
            <Link to='/forgotpassword' className='flex justify-center my-4 text-sm   text-red-500'>Forgot Password </Link>


            </div>
           
        </form>
        <OAuth className=""/>
        <Link to='/sign-up' className='text-white'>Sign Up Instead</Link>
    </div></PageWrapper>
   
  )
}

export default Signin