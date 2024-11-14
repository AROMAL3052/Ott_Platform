import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import Navbar from './navbar'


 function Landingpage() {

  const navigate = useNavigate()



  return (
    <div>
      <div className='img'>
        <Navbar/>
           <div className='display-1 fw-bold landingtext1 leFadeIn text-center'>Unlimited <span>Movies And More</span> </div>
           <h4 className='landingtext2 text-center fw-bold'>Ready to Watch Movies , Create Your Membership.</h4>
           <div className='d-flex justify-content-center align-items-center full-height mt-5'>
           <button type="submit" className='text-white landingbtn btn' onClick={()=>navigate('/signup')}>SignUp</button>
           </div> 
      </div>
      
    </div>
  )
}

export default Landingpage