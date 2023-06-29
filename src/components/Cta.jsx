import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as AudioIllustrations } from '../assets/illustration/AudioIllustration.svg'
import { ReactComponent as Travel } from '../assets/illustration/Travel.svg'
import { ReactComponent as Waves } from '../assets/illustration/Waves.svg'
import { ReactComponent as Photo } from '../assets/illustration/Photo.svg'


const Cta = () => {
    return (
        <>
            <div className=" md:flex w-full md:mx-24 py-6 md:py-12 ">

                <div className="flex h-[630px]" >
                    <div className="flex relative md:left-[200px] md:items-center text-left px-8 md:px-24 lg:w-1/2">
                        <div >
                            <h2 className="text-3xl font-semibold text-gray-800 md:text-7xl">Rent <span className="text-indigo-600">anything</span> from people around you</h2>
                            <p className="mt-2 text-sm text-gray-500 md:text-xl z-1">Begin your adventure, let the world be your playground!</p>
                            <div className='flex my-3 items-center rounded-full border shadow-xl md:px-2 bg-white'>
                                <input type="text" placeholder="Search" class="px-1 m-2 md:text-xl md:h-12 w-full rounded-l-full" />
                                <button class="md:text-xl md:h-12 p-1 px-2 mr-1 md:w-36 rounded-full bg-blue-700 text-white">Search</button>
                            </div>
                            <div className="flex items-center justify-center lg:justify-start mt-6">
                                <p className='mr-3'>Or</p>
                                <Link to="/create-listing" className="md:px-4 px-2 py-2 md:py-3 bg-blue-700 text-gray-200 text-xs md:text-xl font-semibold rounded-full hover:bg-blue-800" href="#">List an item</Link>
                                {/* <Link to="how it works" className=" px-2 md:px-4 py-2 md:py-3 bg text-gray-900 text-xs md:text-xl font-semibold rounded-full hover:text-blue-700" href="#">Learn More</Link> */}
                            </div>
                        </div>
                    </div>
                    <div className='flex '>

                        <div className=' absolute md:right-[300px] md:top-[130px] right-0 top-[400px] -z-20'>
                            <Photo className='text-red h-[300px] md:h-[600px] w-[350px] md:w-[700px]' />

                        </div>

                    </div>

                </div>

            </div>
            <div className='h-36'>
                
            </div>

        </>
    )
}

export default Cta
