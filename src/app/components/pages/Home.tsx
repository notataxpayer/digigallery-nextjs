import React from 'react'
import Section1 from './Home/Section1'
import Section2 from './Home/Section2'
import DualImageRow from '../elements/TransitionImg'
import Image from 'next/image'

const Home = () => {
  return (
    <div >
        <Section1/>
        <Section2/>
    </div>
  )
}

export default Home