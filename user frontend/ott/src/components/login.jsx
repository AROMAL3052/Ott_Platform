import React, { useState } from 'react'
import Navbar from './navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    var [email, setemail] = useState("")
    var [password, setpassword] = useState("")
    var [showPassword, setShowPassword] = useState(false);
    const  navigate  = useNavigate()

    function attemptLogin(event) {
        event.preventDefault()

        var user={
            email: email,
            password: password,
                }

        axios.post('http://127.0.0.1:8000/api/login',user, {headers: { "Content-Type": "application/json" }}).then(response => {
            const token = response.data.token; 
            const user_id = response.data.id;

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('user_id', user_id);
                console.log('Token saved to localStorage', token);
                console.log('User ID saved to localStorage', user_id);
                toast.success('login successfull!');
                navigate('/home');
            } else {
                toast.error('Token not received');
            }
        }).catch(error => {
            console.log("Full error response:", error.response);
        
            if (error.response && error.response.data) {
                const errorData = error.response.data;
        
                const errorMessages = Object.values(errorData).join(' '); 
                
                if (errorMessages) {
                    toast.error(errorMessages);
                } else {
                    toast.error("An unexpected error occurred, please try again.");
                }
            } else {
                toast.error("Unexpected response, please try again.");
            }
        });
        
    }

  return (
    <div>
        <div className="loginimg">
    <Navbar/>
    <ToastContainer position='top-center'/>
    <div className=" d-flex justify-content-center align-items-center mt-5" >
    <div className="row w-100 justify-content-center"> 
        <div className="col-12 col-sm-8 col-md-8 col-lg-6 col-xl-5"> 
            <div class="card bg-transparent border-0 p-4">
                <div class="card-body forms">
                    <h2 className='text-white ml-3 logintext'>LOGIN</h2>
                    <form className='inputmt text-white'>
                        <div class="form-group mb-4">
                            <input type="email" class="form-control"  placeholder="Enter email" value={email} onChange={(event)=>setemail(event.target.value)}/>
                        </div>
                        <div class="form-group mb-3">
                            <div className='passwordeyecontainer'>
                            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} inputs-icon`}onClick={() => setShowPassword(!showPassword)}></i>
                            <input type={showPassword? 'text':'password'} class="form-control"  placeholder="Enter password" value={password} onChange={(event)=> setpassword(event.target.value)}/>
                            </div>
                        </div>
                        <button type="submit" class="btn btnclr2 btn-block " onClick={attemptLogin}>Submit</button>
                        <div class="form-group anchortag">
                            <a href='' className='anchor' onClick={()=>navigate('/conf_email')}>Forget Password?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>




</div>

    </div>
  )
}

export default Login