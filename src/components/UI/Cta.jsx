import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';

const Cta = () => {
  
    return  (
        <>
            <div className="w-full  md:container  md:flex  ">

                <div className=" md:flex" >
                    <div className=" flex relative lg:left-[50px] text-left  md:p-3  ">
                        <div >
                            <h2 className="container  xl:w-3/4  sm:text-5xl font-semibold text-gray-800 md:text-5xl lg:text-7xl tracking-wide ">Rent <span className="text-indigo-600 text-4xl sm:text-6xl md:text-6xl lg:text-8xl">anything</span> from people around you</h2>
                            <p className=" text-2xl my-6 text-gray-500 md:text-lg lg:text-2xl  tracking-wider  ">Begin your adventure, let the world be your playground!</p>
                            <Search/>
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
	);
};

export default Cta;
