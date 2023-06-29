import React from 'react'
import {ReactComponent as Savings} from '../assets/illustration/Savings.svg'
import {ReactComponent as Freedom} from '../assets/illustration/Freedom.svg'
import {ReactComponent as Sustainability} from '../assets/illustration/Sustainability.svg'
import {ReactComponent as Trust} from '../assets/illustration/Trust.svg'
const Features = () => {
  return (
    <div>
      <div className="bg-gray-50">
  <div className="mx-auto py-3 px-6 lg:px-8 ">
    {/* <div className="mx-auto max-w-2xl lg:text-center">
      <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
      <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to deploy your app</p>
      <p className="mt-6 text-lg leading-8 text-gray-600">Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.</p>
    </div> */}
    <div className="mx-auto my-6  max-w-2xl lg:max-w-6xl">
      <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none place-content-center lg:grid-cols-3 lg:gap-y-3">
        <div className="relative max-w-xl">
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
            <div className="flex  items-center justify-center rounded-lg ">
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
</div>

    </div>
  )
}

export default Features
