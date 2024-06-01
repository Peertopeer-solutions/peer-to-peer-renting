import React from 'react'
import Skeleton from './Skeleton'

const SkeletonSidePanel = () => {
  return (
    <div className="">
      <div className='flex justify-between'>
      <Skeleton classes="text width-30" />
      </div>
       <Skeleton classes="image "/>
       <Skeleton classes="image "/>
</div>
  )
}

export default SkeletonSidePanel
