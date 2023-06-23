import React from 'react'
import { Link } from 'react-router-dom'

const Cta = () => {
  return (

    <div className="w-full ">
        <div className="flex bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100 h-[600px]" >
            <div className="flex items-center  text-left px-8 md:px-12 lg:w-1/2">
                <div>
                    <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">Rent <span className="text-indigo-600">anything</span> from people around you</h2>
                    <p className="mt-2 text-sm text-gray-500 md:text-base">Embrace the joy of renting and unleash limitless possibilities! Don't wait to buy—rent effortlessly. Explore new hobbies, diverse interests, and create unforgettable memories without the ownership burden. Start your adventure today and let the world be your playground!</p>
                    
                    <div className="flex justify-center items-center lg:justify-start mt-6">
                    <p className='mr-3'>Or</p>
                        <Link to="/create-listing" className="md:px-4 px-2 py-2 md:py-3 bg-blue-700 text-gray-200 text-xs font-semibold rounded-full hover:bg-blue-800" href="#">List an item</Link>
                        <Link className="mx-4 px-2 md:px-4 py-2 md:py-3 bg-white text-gray-900 text-xs font-semibold rounded-full hover:bg-gray-400" href="#">Learn More</Link>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block lg:w-1/2" style={{ clipPath: 'polygon(10% 0, 100% 0%, 100% 100%, 0 100%)' }}>
                <div className="h-full object-cover" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80)` }}>
                    <div className="h-full bg-black opacity-25"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cta
