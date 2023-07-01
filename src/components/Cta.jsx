import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as AudioIllustrations } from '../assets/illustration/AudioIllustration.svg'
import { ReactComponent as Travel } from '../assets/illustration/Travel.svg'
import { ReactComponent as Waves } from '../assets/illustration/Waves.svg'
import { ReactComponent as Photo } from '../assets/illustration/Photo.svg'


const Cta = () => {
    return (
        <>
            <div className="container mx-auto md:flex md:p-6 py-3 ">

                <div className=" md:flex h-[630px]" >
                    <div className="  flex relative lg:left-[100px] text-left  md:p-3  ">
                        <div >
                            <h2 className="text-4xl font-bold text-gray-800 md:text-4xl lg:text-5xl xl:text-6xl ">Rent <span className="text-indigo-600">anything</span> from people around you</h2>
                            <p className=" text-sm text-gray-500 md:text-lg xl:text-2xl z-1 ">Begin your adventure, let the world be your playground!</p>
                            <div className='text-sm  lg:text-lg  flex my-3 lg:my-6 items-center rounded-full shadow-xl  bg-gray-50'>
                                <input type="text" placeholder="search"className=" p-1 md:p-2 ml-2 w-full rounded-l-full bg-gray-50 h-9" />
                                <button className="  m-0.5 md:m-1 rounded-full bg-blue-700 text-white h-9 w-2/4">Search</button>
                            </div>
                            <div className="flex  items-center justify-start mt-6 ">
                                <p className='mr-3'>Or</p>
                                <Link to="/create-listing" className="md:px-3 p-2 md:py-3 bg-blue-700 text-gray-200 text-sm md:text-sm font-semibold rounded-full hover:bg-blue-800" href="#">List an item</Link>
                                {/* <Link to="how it works" className=" px-2 md:px-4 py-2 md:py-3 bg text-gray-900 text-xs md:text-xl font-semibold rounded-full hover:text-blue-700" href="#">Learn More</Link> */}
                            </div>
                        </div>
                    </div>
                    <div className='flex '>

                        <div className='mx-auto relative bottom-10  lg:right-[100px] -z-20'>
                            <Photo className='text-red h-full container md:w-[350px] lg:w-[450px] xl:w-[600px] ' />

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
