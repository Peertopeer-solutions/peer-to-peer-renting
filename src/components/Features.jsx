import React from 'react'
import {ReactComponent as Savings} from '../assets/illustration/Savings.svg'
import {ReactComponent as Freedom} from '../assets/illustration/Freedom.svg'
import {ReactComponent as Sustainability} from '../assets/illustration/Sustainability.svg'
import {ReactComponent as Trust} from '../assets/illustration/Trust.svg'
const Features = () => {
  return (
    <div>


    {/* <div className="mx-auto max-w-2xl lg:text-center">
      <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
      <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to deploy your app</p>
      <p className="mt-6 text-lg leading-8 text-gray-600">Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.</p>
    </div> */}
    <div className="mx-auto my-12 md:my-24  bg-gray-50 py-3 px-3 lg:px-8 ">
      <dl className="grid grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none  lg:grid-cols-3 lg:gap-y-3">
        <div className="relative ">
          <dt className=" md:text-xl flex flex-col items-center justify-center itemtext-base font-semibold leading-7 text-gray-900">
            <div className="flex  items-center justify-center rounded-full">
              <Freedom className="h-36 w-36 rounded-full"/>
            </div>
            Freedom to Explore
          </dt>
          <dd className="mt-2 text-center max-w- leading-7 text-gray-600">Follow your passion without a worry</dd>
        </div>
        <div className="relative ">
          <dt className="md:text-xl flex flex-col items-center justify-center itemtext-base font-semibold leading-7 text-gray-900">
            <div className=" rounded-lg ">
              <Savings className ="h-36 w-36 rounded-full text-white"/>
            </div>
            Affordability
          </dt>
          <dd className="mt-2 text-center md:px-12 leading-7 text-gray-600">Renting seems much affordable</dd>
        </div>
       
        <div className="relative ">
          <dt className="md:text-xl flex flex-col items-center justify-center itemtext-base font-semibold leading-7 text-gray-900">
            <div className="flex  items-center justify-center rounded-lg ">
             <Sustainability className="h-36 w-36 rounded-full " />
            </div>
            Sustainability
          </dt>
          <dd className="mt-2 text-center leading-7 text-gray-600 md:px-12">Take care of planet by buying less</dd>
        </div>
        
      </dl>
    </div>
  </div>



  )
}

export default Features
