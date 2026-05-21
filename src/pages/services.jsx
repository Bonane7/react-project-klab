import React from 'react'
import { Link } from 'react-router-dom'

function Services() {
  return (
    <>
    <div className='underline'>Our Services Services</div>
    <div>
      <ul>
        <li><Link to="/meny">Coocking</Link></li>
        <li>Deliver</li>
        <li>Camping</li>
      </ul>
    </div>
    </>
  )
}

export default Services