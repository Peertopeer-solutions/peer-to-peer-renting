import React from 'react';
import { Link } from 'react-router-dom';

const Cta = () => {
	return (
		<>
			<div className='w-5/6 py-3 pt-24 mx-auto md:container md:mx-auto md:flex md:px-6 '>
				<div className='mx-auto md:flex'>
					<div className=' flex relative lg:left-[50px] text-left  md:p-3 z-10 '>
						<div>
							<h2 className='container text-3xl font-semibold tracking-wide text-gray-800 xl:w-3/4 sm:text-4xl md:text-5xl lg:text-7xl '>
								Rent{' '}
								<span className='text-4xl text-indigo-600 sm:text-5xl md:text-6xl lg:text-8xl'>
									anything
								</span>{' '}
								from people around you
							</h2>
							<p className='my-6 text-lg leading-loose tracking-wider text-gray-500  md:text-lg lg:text-2xl'>
								Begin your adventure, let the world be your playground!
							</p>
							<div className='container flex items-center p-1 text-sm bg-gray-100 rounded-full shadow-xl lg:text-lg lg:my-6 lg:h-16'>
								<input
									type='text'
									placeholder='Camera, shoes, riding jacket '
									className='w-full p-2 ml-3 bg-gray-100 rounded-l-full  md:p-2 xl:w-3/4 h-9'
								/>
								<button className='w-2/6 p-2 text-white bg-blue-700 rounded-full shadow-lg lg:p-3'>
									Search
								</button>
							</div>
							<div className='items-center justify-start hidden mt-6 md:flex'>
								<p className='mr-3'>Or</p>
								<Link
									to='/create-listing'
									className='p-2 text-sm font-semibold text-gray-200 bg-blue-700 rounded-full md:px-3 md:py-3 md:text-sm hover:bg-blue-800'
									href='#'
								>
									List an item
								</Link>
								{/* <Link to="how it works" className="px-2 py-2 text-xs font-semibold text-gray-900 rounded-full  md:px-4 md:py-3 bg md:text-xl hover:text-blue-700" href="#">Learn More</Link> */}
							</div>
						</div>
					</div>
					<div className='flex flex-col items-center mx-auto'>
						<div className='mx-auto relative bottom-12 md:bottom-0 md:right-[100px] -z-20'>
							<img
								className='w-full h-full text-red'
								src='/assets/illustration/Photo.svg'
								alt=''
							/>
							{/* <Photo  className='w-full h-full text-red' /> */}
						</div>
						<div className='flex items-center justify-start md:hidden '>
							<p className='mr-3'>Or</p>
							<Link
								to='/create-listing'
								className='p-2 text-sm font-semibold text-gray-200 bg-blue-700 rounded-full md:px-3 md:py-3 md:text-sm hover:bg-blue-800'
								href='#'
							>
								List an item
							</Link>
							{/* <Link to="how it works" className="px-2 py-2 text-xs font-semibold text-gray-900 rounded-full  md:px-4 md:py-3 bg md:text-xl hover:text-blue-700" href="#">Learn More</Link> */}
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
