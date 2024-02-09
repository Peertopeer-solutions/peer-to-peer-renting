import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Joi, { number } from 'joi';
import { MobileNumber, OtpBox, TextInput } from '../components/Form/Input';
import OAuth from '../components/OAuth';
import { routes } from '../components/Routing/Routes';
import { useState } from 'react';
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  linkWithCredential,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { auth } from '../firebase.config';

const schema = Joi.object({
  number: Joi.string().length(10).label('Mobile Number'),
  otp: Joi.string().length(6).label('OTP'),
});
function captchaVerify() {
  if (window.recaptchaVerifier) {
    return window.recaptchaVerifier;
  }
  return (window.recaptchaVerifier = new RecaptchaVerifier(
    'recaptcha-container',
    {
      size: 'invisible',
    },
    auth
  ));
}
const EmailVerification = () => {
  const [otpConfirm, setOtpConfirm] = useState(null);
  const {
    register,
    setError,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: joiResolver(schema) });
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(false);
  const onSubmit = async (data) => {
    console.log(data);
    if (verifying) {
      try {
        const { otp } = data;
        console.log(otp);
        const credential = PhoneAuthProvider.credential(window.verifierId, otp);
        const userCredential = await linkWithCredential(auth.currentUser, credential);
        console.log(userCredential)
      } catch (err) {
        console.error(err)
      }
      navigate(routes.home)
      return;
    }
    try {
      const { number } = data;
      const appVerifier = captchaVerify();
      console.log(appVerifier);
      const provider = new PhoneAuthProvider(auth);
      window.verifierId = await provider.verifyPhoneNumber(`+91${number}`, appVerifier);
      setVerifying(true);
    } catch (err) {
      console.error(err, err.message);
    }
  };
  const headerText = verifying
    ? `Enter the OTP sent to +91 ${getValues('number')}`
    : 'We will send you One Time Password on this mobile number';
  return (
    <div className='w-full'>
      <div id='recaptcha-container' />
      <div className='mb-6 gap-2 flex flex-col '>
        <h1 className='text-3xl'>OTP Verification</h1>
        <h4 className='text-gray-500 text-sm'>{headerText}</h4>
      </div>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
        {errors.root && (
          <div className='text-red-400'>{errors.root.message}</div>
        )}
        {verifying ? (
          <TextInput label='OTP' options={register('otp')} error={errors.otp} />
        ) : (
          <MobileNumber options={register('number')} error={errors.number} />
        )}
        <div className='mt-2 flex flex-col gap-3'>
          {verifying ? (
            <button
              className='flex items-center bg-blue-500 w-full py-2 rounded-lg'
              disabled={isSubmitting}
            >
              <span className=' text-white flex-grow'>
                {isSubmitting ? 'Checking...' : 'Verify'}
              </span>
              {/* <IoIosArrowForward className='text-sm ' /> */}
            </button>
          ) : (
            <button className='flex items-center bg-blue-500 w-full py-2 rounded-lg'>
              <span className=' text-white flex-grow'>
                {isSubmitting ? 'Sending...' : 'Send OTP'}
              </span>
              {/* <IoIosArrowForward className='text-sm ' /> */}
            </button>
          )}

          {verifying && (
            <div className='text-sm flex gap-1 mt-2 justify-center'>
              <span className='text-gray-400'>Entered wrong number? </span>
              <button
                type='button'
                onClick={() => setVerifying(false)}
                to={routes.signin}
                className='text-blue-500 underline text-md font-bold'
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmailVerification;
