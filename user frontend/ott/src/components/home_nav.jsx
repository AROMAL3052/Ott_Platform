import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home_nav = () => {

    const  navigate  = useNavigate()


    
        const Logout = async () => {
            try {
                const token = localStorage.getItem('token');
                const user_id = localStorage.getItem("user_id");
    
                const response = await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`
                    }
                });
    
                console.log("Logout response:", response.data);
                console.log("removeid", user_id);
                localStorage.removeItem('token');
                localStorage.removeItem("user_id");
                navigate('/login'); 
            } catch (error) {
                console.error('Logout failed', error);
            }
        };

  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light navbarbg">
            <a class="navbar-brand text-danger fs-2  fw-bold mx-4" href="#">StreamZ</a>
            <button class="navbar-toggler navbtnclr" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse " id="navbarNavAltMarkup">
                <div class="navbar-nav fs-5 " style={{fontFamily:'emoji'}}>
                    <a class="nav-item nav-link text-white homenavclr ms-3" href="#" onClick={()=>navigate('/home')}>Home</a>
                    <a class="nav-item nav-link text-white homenavclr ms-3" href="#" onClick={()=>navigate('/subscribe')}>Subscribe</a>
                    <a class="nav-item nav-link text-white homenavclr ms-3" href="#"onClick={()=>navigate('/userplan')}>Plans</a>
                    <a class="nav-item nav-link text-white homenavclr ms-3" href="#" onClick={()=>navigate('/change_pswrd')}>Change Password</a>
                    <a class="nav-item nav-link text-white homenavclr ms-3" href="#" onClick={()=>navigate('/watchlist')}>Watch List</a>
                    <a class="nav-item nav-link text-white homenavclr ms-3" href="#" onClick={()=>navigate('/watchhistory')}>Watch History</a>
                </div>
                <div className='ms-auto me-3 px-2'>
                    <button class="Btn">
                    <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                    <div class="text" onClick={Logout}>Logout</div>
                    </button>
                </div>
                        
            </div>
        </nav>

    </div>
  )
}

export default Home_nav