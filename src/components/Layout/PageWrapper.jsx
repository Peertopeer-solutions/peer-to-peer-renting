import React from 'react'

const PageWrapper = ({children}) => {
  return (
    <div className='py-16 md:py-24 md:px-24 px-2 z-0'>
      {children}
    </div>
  )
}

export default PageWrapper
