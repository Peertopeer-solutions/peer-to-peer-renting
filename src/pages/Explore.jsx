import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../../public/assets/data'
import { useParams } from 'react-router-dom'
import Listingitem from '../components/Listingitem'
import SkeletonPost from '../components/Skeletons/SkeletonPost'
import Wrapper from '../components/Layout/PageWrapper'
import ContentWrapper from '../components/Layout/ContentWrapper'

const Explore = ({ listings, isLoading, error }) => {

  console.log(listings)
  const params = useParams()



  if (error) {
    return <div>Error: {error.message}</div>;
  }
  // if(isLoading){
  //   return <div className='bg-red-500'>..loading</div>
  // }

  return (
    <>
    <ContentWrapper>
    <div className="">
        <main className='flex flex-col'>
          <div>
            <div className='  mt-12 mb-12'>
              <p className="text-2xl text-gray-800 md:text-[35px]  mb-5  uppercase">Categories</p>
              <div className='grid gap-[16px] md:place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 ' >
                {categories.map((data) => (
                  <div className=' w-full bg-white drop-shadow-lg rounded-lg ' key={data.name}>
                    <Link to={`category/${data.name}`}  >
                      <div key={data.name} className='mx-auto w-full border rounded-full'>
                        <div className='flex item-center'>
                          <img src={data.image} loading="lazy" alt="" className="rounded-tl-lg rounded-tr-lg h-24 w-full object-cover md:h-36 " />

                        </div>
                        <div className='rounded-lg h-12 flex   items-center bg-white'>
                          <p className=" text-[16px] md:text-lg w-[100%] p-1 text-center ">{data.name}</p>

                        </div>

                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className='mx-auto mt-12 mb-12'>
              <>
                <main className=''>
                  <h1 className='text-2xl text-gray-800 md:text-[35px]  mb-5 mt-5  uppercase  '>Trending products</h1>
                  <div className=''>
                    {
                      isLoading ? (
                          <div className='grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2 md:p-3 '>
                          { [...Array(10).keys()].map(i => (
                          <SkeletonPost/> 
                          ))}
                          </div>
                          
                       
                        
                      ) :
                        (<div className="grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2 md:p-3 ">
                          {listings.map((listing) => listing.data.listingEnabled && (

                            <Listingitem
                              listing={listing.data}
                              id={listing.id}
                              keyId={listing.id}

                            />
                            
                          )
                          )}
                        </div>)}
                  </div>



                </main>



              </>

            </div>
          </div>

        </main>
      </div>
    </ContentWrapper>
    
    </>

  )
}

export default Explore