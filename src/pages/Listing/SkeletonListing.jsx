import React from 'react'
import Skeleton from '../../components/Skeletons/Skeleton'


const SkeletonListing = () => {
  return (
    <div className='h-[1000px] '>
      <div className="grid grid-cols-1 gap-96 md:grid-cols-2 mx-auto  md:py-[5rem] md:gap-16 xl:px-24
     xl:gap-6  mt-1">
        <section className='h-[300px] md:h-[400px]'>
        <Skeleton classes="image width-100 height-100"/>
        <div className='flex justify-between h-16 m-3'>
        <Skeleton classes="image width-20 height-100"/>
        <Skeleton classes="image width-20 height-100"/>
        <Skeleton classes="image width-20 height-100"/>
        <Skeleton classes="image width-20 height-100"/>
        </div>
        <div className='p-3'>
          <Skeleton classes="text width-100" />
        <Skeleton classes="text width-50" />
        <Skeleton classes="text width-50" />
       
        <Skeleton classes="map width-full" />

        </div>
        


        </section>
        <section className='m-3'>
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-100" />
        <Skeleton classes="text width-50" />
        <Skeleton classes="map width-full" />


        </section>
      </div>
      
    </div>
  )
}

export default SkeletonListing
