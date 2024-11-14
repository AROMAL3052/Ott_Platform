import React from 'react'
import Plancard from './plan card'
import Home_nav from './home_nav'

const Subscribe = () => {
  return (
    <div className='subscribebody'  style={{fontFamily:'monospace'}}>
        <Home_nav/>

    <div className='text-center justify-content-center d-flex py-5'>
        <h1 className='text-white '>Subscribe</h1>
    </div>
    <div className='row mx-3'>
        <div className='col-12 col-md-4 col-lg-4 mb-4 '>
            <Plancard />
        </div>
        <div className='col-12 col-md-4 col-lg-4 mb-4'>
            <Plancard />
        </div>
        <div className='col-12 col-md-4 col-lg-4 mb-4'>
            <Plancard />
        </div>
    </div>
</div>

  )
}

export default Subscribe