import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as AudioIllustrations } from '../assets/illustration/AudioIllustration.svg'
import { ReactComponent as Travel } from '../assets/illustration/Travel.svg'
import { ReactComponent as Waves } from '../assets/illustration/Waves.svg'
import { ReactComponent as Photo } from '../assets/illustration/Photo.svg'


const Cta = () => {
    return (
        <>
            <div className="w-5/6 mx-auto md:container  md:mx-auto md:flex md:p-6 py-3 ">

                <div className=" md:flex h-[630px]" >
                    <div className=" flex relative lg:left-[100px] text-left  md:p-3  ">
                        <div >
                            <h2 className="container text-3xl font-semibold text-gray-800 md:text-4xl lg:text-5xl xl:text-6xl tracking-wide ">Rent <span className="text-indigo-600">anything</span> from people around you</h2>
                            <p className=" text-sm my-6 text-gray-500 md:text-lg xl:text-2xl z-1 ">Begin your adventure, let the world be your playground!</p>
                            <div className='text-sm  lg:text-lg  flex  lg:my-6 items-center rounded-full shadow-xl  bg-gray-50'>
                                <input type="text" placeholder="Camera, bikking jacket"className=" p-2 md:p-2 ml-3 w-full rounded-l-full bg-gray-50 h-9" />
                                <button className="shadow-lg  m-1 md:m-1 rounded-full bg-blue-700 text-white w-2/4 h-10 md:h-12">Search</button>
                            </div>
                            <div className="md:flex items-center justify-start mt-6 hidden">
                                <p className='mr-3'>Or</p>
                                <Link to="/create-listing" className="md:px-3 p-2 md:py-3 bg-blue-700 text-gray-200 text-sm md:text-sm font-semibold rounded-full hover:bg-blue-800" href="#">List an item</Link>
                                {/* <Link to="how it works" className=" px-2 md:px-4 py-2 md:py-3 bg text-gray-900 text-xs md:text-xl font-semibold rounded-full hover:text-blue-700" href="#">Learn More</Link> */}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center mx-auto'>

                        <div className='mx-auto relative bottom-0  lg:right-[100px] -z-20'>
                            <Photo className='text-red h-full w-full md:w-[350px] lg:w-[450px] xl:w-[600px] ' />

                        </div>
                        <div className="flex md:hidden items-center justify-start ">
                                <p className='mr-3'>Or</p>
                                <Link to="/create-listing" className="md:px-3 p-2 md:py-3 bg-blue-700 text-gray-200 text-sm md:text-sm font-semibold rounded-full hover:bg-blue-800" href="#">List an item</Link>
                                {/* <Link to="how it works" className=" px-2 md:px-4 py-2 md:py-3 bg text-gray-900 text-xs md:text-xl font-semibold rounded-full hover:text-blue-700" href="#">Learn More</Link> */}
                            </div>
                        
                    </div>

                </div>

            </div>
            {/* <div className='h-36'>
                
            </div> */}

        </>
    )
}

export default Cta
