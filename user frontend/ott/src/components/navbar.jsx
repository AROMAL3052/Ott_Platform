import React, { useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { useState } from 'react';


const Navbar = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const [text, setText] = useState('sign In')

  useEffect(() => {
    if (location.pathname === '/signup') {
      setText('Sign In');
    } else if (location.pathname === '/login') {
      setText('Sign Up');
    } else {
      setText('Sign In'); 
    }
  }, [location.pathname]);


  const handleButtonClick = (e) => {
      e.preventDefault(); 
      if (location.pathname === '/login') {
        navigate("/signup"); 
      } else {
        navigate("/login"); 
      }
  };

  return (
    <div>
  <nav class="navbar navbar-light navbarbg">
  <div class="container-fluid">
    <a class="navbar-brand streamztext fs-2 fw-bold mx-4">StreamZ</a>
    <form class="d-flex">
      <button class="btn btnclr mx-4" type="submit" onClick={handleButtonClick}>{text}</button>
    </form>
  </div>
</nav>
    </div>
  )
}

export default Navbar;