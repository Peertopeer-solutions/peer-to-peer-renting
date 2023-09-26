import React from 'react'
import { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../../public/assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../../public/assets/svg/visibilityIcon.svg'
import { getAuth , signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify' 
import OAuth from '../components/OAuth'


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
    <div className='md:border flex flex-col items-center justify-center my-9 md:shadow-md  rounded-xl  space-y-6 m-2 px-6 w-full md:w-2/4 lg:w-2/5 xl:w-1/3  mx-auto md:h-[80vh] sm:text-[16px] md:text-xl'>
        <header>
            <p className='pageHeader'>Welcome!</p>
        </header>
        <form onSubmit={onSubmit}>
            <input type='email'
            className='emailInput'
            placeholder='Email'
            id = 'email'
            value={email}
            onChange={onChange}/>
            <div className='passwordInputDiv'>
                <input type={showPassword? 'text' : 'password' }
                className='passwordInput' placeholder="Password"
                id="password" value={password} onChange={onChange} />
                <img src={visibilityIcon} 
                alt='show password'
                className='showPassword'
                onClick={() => setShowPassword((prevState)=> !prevState)}/>
            </div>
            <div className='flex justify-betwee'>
            <div className=' flex justify-center items-center gap-4 '>
                <p className='text-xl font-bold'> Sign In</p>
                <button className=''> 
                <ArrowRightIcon fill='#ffffff' className="bg-black w-10 aspect-square rounded-full flex justify-end"/>
                </button>
            </div>
            <Link to='/forgotpassword' className='flex justify-center my-4 text-red-500'>Forgot Password </Link>


            </div>
           
        </form>
        <OAuth className=""/>
        <Link to='/sign-up' className='registerLink'>Sign Up Instead</Link>
    </div>
  )
}

export default Signin