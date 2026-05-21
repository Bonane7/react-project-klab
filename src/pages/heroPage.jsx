import React from 'react'
import ImageHero from "../assets/images/bg-hero.jpg"


function HeroPage() {
  return (
    <>
    <div className='relative w-full h-[80vh] bg-blue-950'>
      <div className='absolute inset-0 ' style={{backgroundImage:`url(${ImageHero})`}}>
    
      </div>
      
    </div>
    
    
    
    </>
  )
}

export default HeroPage