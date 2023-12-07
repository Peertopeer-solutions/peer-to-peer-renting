import React from 'react'

const PageWrapper = ({children}) => {
  return (
    <div className='pt-16 md:pt-24 md:px-24 px-2'>
      {children}
    </div>
  )
}

export default PageWrapper
