import React from 'react'
import {ReactComponent as Savings} from '../assets/illustration/Savings.svg'
import {ReactComponent as Freedom} from '../assets/illustration/Freedom.svg'
const Features = () => {
  return (
    <div>
      <div className="bg-white py-24 sm:py-12">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    {/* <div className="mx-auto max-w-2xl lg:text-center">
      <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
      <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to deploy your app</p>
      <p className="mt-6 text-lg leading-8 text-gray-600">Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.</p>
    </div> */}
    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
      <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
        <div className="relative max-w-xl">
          <dt className=" flex flex-col items-center justify-center itemtext-base font-semibold leading-7 text-gray-900">
            <div className="flex  items-center justify-center rounded-lg">
              <Freedom className="h-36 w-36"/>
            </div>
            Freedom to Explore
          </dt>
          <dd className="mt-2 text-center md:px-24  max-w-6 leading-7 text-gray-600">Unleash your passions without the financial burden. Rent the gear, explore endless possibilities.




</dd>
        </div>
        <div className="relative ">
          <dt className=" flex flex-col items-center justify-center itemtext-base font-semibold leading-7 text-gray-900">
            <div className="flex  items-center justify-center rounded-lg ">
              <Savings className ="h-36 w-36 rounded-full text-white"/>
            </div>
            Affordability
          </dt>
          <dd className="mt-2 text-center md:px-24 leading-7 text-gray-600">Access high-quality items without breaking the bank. Say goodbye to upfront costs and enjoy significant savings through peer-to-peer renting</dd>
        </div>
        <div className="relative ">
          <dt className=" flex flex-col items-center justify-center itemtext-base font-semibold leading-7 text-gray-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
            </div>
            Push to deploy
          </dt>
          <dd className="mt-2 text-center md:px-24 leading-7 text-gray-600">Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.</dd>
        </div>
        <div className="relative ">
          <dt className=" flex flex-col items-center justify-center itemtext-base font-semibold leading-7 text-gray-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
            </div>
            Push to deploy
          </dt>
          <dd className="mt-2 text-center leading-7 text-gray-600">Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.</dd>
        </div>
        
      </dl>
    </div>
  </div>
</div>

    </div>
  )
}

export default Features
