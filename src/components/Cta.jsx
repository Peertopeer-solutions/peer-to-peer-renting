import React from 'react'
import { Link } from 'react-router-dom'





const Cta = () => {
  
    return  (
        <>
            <div className="w-5/6 mt-24 mx-auto md:container  md:mx-auto md:flex md:p-6 py-3 ">

                <div className="mx-auto md:flex" >
                    <div className=" flex relative lg:left-[50px] text-left  md:p-3  ">
                        <div >
                            <h2 className="container xl:w-3/4 text-4xl font-semibold text-gray-800 md:text-4xl lg:text-7xl tracking-wide ">Rent <span className="text-indigo-600">anything</span> from people around you</h2>
                            <p className=" text-lg my-6 text-gray-500 md:text-lg lg:text-2xl z- tracking-wider leading-loose ">Begin your adventure, let the world be your playground!</p>
                            <div className='container text-sm  lg:text-lg  flex  lg:my-6 items-center rounded-full shadow-xl p-1 bg-gray-100 lg:h-16'>
                                <input type="text" placeholder="Camera, shoes, riding jacket "className=" bg-gray-100 p-2 md:p-2 ml-3 w-full xl:w-3/4 rounded-l-full  h-9" />
                                <button className="shadow-lg rounded-full bg-blue-700 text-white w-2/6 p-2 lg:p-3">Search</button>
                            </div>
                            <div className="md:flex items-center justify-start mt-6 hidden">
                                <p className='mr-3'>Or</p>
                                <Link to="/create-listing" className="md:px-3 p-2 md:py-3 bg-blue-700 text-gray-200 text-sm md:text-sm font-semibold rounded-full hover:bg-blue-800" href="#">List an item</Link>
                                {/* <Link to="how it works" className=" px-2 md:px-4 py-2 md:py-3 bg text-gray-900 text-xs md:text-xl font-semibold rounded-full hover:text-blue-700" href="#">Learn More</Link> */}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center mx-auto'>

                        <div className='mx-auto relative bottom-12 md:bottom-0 md:right-[100px] -z-20'>
                            <img className='text-red h-full  w-full'  src='/assets/illustration/Photo.svg' alt="" />
                            {/* <Photo  className='text-red h-full  w-full' /> */}

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
