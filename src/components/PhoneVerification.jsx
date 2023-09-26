  import React, { useContext, useState } from 'react';
  import { getAuth, RecaptchaVerifier, signInWithPhoneNumber,linkWithCredential, updateProfile, multiFactor, PhoneAuthProvider, PhoneMultiFactorGenerator } from "firebase/auth";
  import AuthContext from '../FirebaseAuthContext';

  import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
  import { CgSpinner } from "react-icons/cg";

  import OtpInput from "otp-input-react";
  import PhoneInput from "react-phone-input-2";
  import "react-phone-input-2/lib/style.css";

  import { toast, Toaster } from "react-hot-toast";
  import { useNavigate } from 'react-router-dom';

  function PhoneVerification() {
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    const auth = getAuth()
    const navigate = useNavigate()
    const authCtx = useContext(AuthContext)

    function onCaptchVerify() {
      if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            // callback: (response) => {
            //   if(authCtx.currentUser){
            //     onSignup();

            //   }
            // },
            "expired-callback": () => {
              window.recaptchaVerifier.clear()
            },
          },
          auth
        );
      }
    }


    function onSignup() {
      if(!showOTP){
      // setLoading(true);
      onCaptchVerify();

      const appVerifier = window.recaptchaVerifier;

      const formatPh = "+" + ph;

      
      console.log("here");

      multiFactor(authCtx.currentUser).getSession()
      .then(function (multiFactorSession) {
        console.log(multiFactorSession);
        const phoneInfoOptions = {
          phoneNumber: formatPh,
          session: multiFactorSession
        };
        const phoneAuthProvider = new PhoneAuthProvider(auth);
        console.log("here3");
        phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, appVerifier,{
          // Set the code expiration duration to 60 seconds
          codeTime: 60000
          })
      .then(function (verificationId) {
        console.log("verificationID",verificationId)
          // verificationId will be needed to complete enrollment.
          window.confirmationResult = verificationId
          console.log("verificationID",window.confirmationResult)
          console.log("here4");
          setShowOTP(true);
          // setLoading(false);
      }).catch(error => {
        console.log("here4");   
        console.error(error.message)
      })
  });}

    }

   async function  onOTPVerify()  {
      // setLoading(true);
      console.log("here")
      const cred = PhoneAuthProvider.credential(window.confirmationResult, otp);
      console.log(cred)
          const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

          // Complete enrollment.
          // setLoading(false);
          return await multiFactor(auth.currentUser).enroll(multiFactorAssertion, "mfaDisplayName").then(()=>{
            navigate('/')

          })
          .catch(error=>{
            console.log(error.message)
          })

    }

    return (
      <section className="border m-3 max-w-max">
        <div>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div id="recaptcha-container"></div>
          
            <div className=" max-w-max flex flex-col gap-4 rounded-lg p-4">
            
              {showOTP ? (
                <>
                  <div className="bg-white text-black w-fit mx-auto p-4 rounded-full">
                    <BsFillShieldLockFill size={30} />
                  </div>
                  <label
                    htmlFor="otp"
                    className="font-bold text-xl text-black text-center"
                  >
                    Enter your OTP
                  </label>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    autoFocus
                    className="opt-container  "
                  ></OtpInput>
                  <button
                    onClick={onOTPVerify}
                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  >
                    {loading && (
                      <CgSpinner size={20} className="mt-1 animate-spin" />
                    )}
                    <span>Verify OTP</span>
                  </button>
                </>
              ) : (
                <>
                  {/* <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                    <BsTelephoneFill size={30} />
                  </div>
                  <label
                    htmlFor=""
                    className="font-bold text-xl text-white text-center"
                  >
                    Verify your phone number
                  </label> */}
                  <PhoneInput country={"in"} value={ph} onChange={setPh} className="max-w-max mx-auto "/>
                  <button
                    onClick={onSignup}
                    className="bg-emerald-600 w-1/2 mx-auto flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  >
                    {loading && (
                      <CgSpinner size={20} className="mt-1 animate-spin" />
                    )}
                    <span>Get OTP</span>
                  </button>
                </>
              )}
            </div>
          
        </div>
      </section>
    );
  }

  export default PhoneVerification;
