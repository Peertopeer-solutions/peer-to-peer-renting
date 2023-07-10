import React from 'react'
import Cta from '../components/Cta'
import Features from '../components/Features'
import Footer from '../components/Footer'
import Explore from './Explore'

const Home = () => {
  return (
    <div className='h-full' >
      <Cta/>
      <Features />
      <Explore/>
    </div>
  )
}

export default Home
