import React from 'react'
import Navbar from './navbar'
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

var [username,setusername] = useState("")
var [email,setemail] = useState("")
var [password,setpassword] = useState("")
var [confpassword,setconfpassword] = useState("")
const [showPassword, setShowPassword] = useState(false);
const [showConfPassword, setShowConfPassword] = useState(false);
const  navigate = useNavigate()




function signupuser(event)
{
    event.preventDefault()


var user={
    username: username,
    email: email,
    password1: password,
    password2: confpassword
    }

axios.post("http://127.0.0.1:8000/api/signup",user, {headers: { "Content-Type": "application/json" }}).then(response=>{
   
    toast.success('Signed up successfully!');
    navigate('/login')
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
    <div className='signupbody'>
        
        <div className='signupimg'>
        <Navbar/>
        <ToastContainer position='top-center'/>
        <div class="d-flex justify-content-center align-items-center full-height">
        <div class="row w-100 justify-content-center"> 
            <div class="col-12 col-sm-8 col-md-8 col-lg-6 col-xl-5"> 
                <div class="card bg-transparent border-0 p-4 mt-5">
                    <div class="card-body forms">
                        <h2 class="text-white ml-3 signuptext">Sign Up </h2>
        
                        <form class="inputmt text-white">
                            <div class="form-group mb-4">
                                <input type="text" class="form-control"  placeholder="Enter Username" value={username} onChange={(event)=>setusername(event.target.value)}/> 
                            </div>
                            <div class="form-group mb-4">
                                <input type="email" class="form-control"  placeholder="Enter email" value={email} onChange={(event)=>setemail(event.target.value)}/>
                            </div>
                            <div class="form-group mb-3">
                            <div className='passwordeyecontainer'>
                            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} inputs-icon`}onClick={() => setShowPassword(!showPassword)}></i>
                                <input type={showPassword ? 'text':'password'} class="form-control"  placeholder="Enter password" value={password} onChange={(event)=>setpassword(event.target.value)}/>
                            </div>
                            </div>
                            <div class="form-group mb-4">
                            <div className='passwordeyecontainer'>
                            <i className={`bi ${showConfPassword ? "bi-eye-slash" : "bi-eye"} inputs-icon`}onClick={() => setShowConfPassword(!showConfPassword)}></i>
                                <input type={showConfPassword? 'text':'password'} class="form-control"  placeholder="Confirm Password" value={confpassword} onChange={(event)=>setconfpassword(event.target.value)}/>
                            </div>
                            </div>
                            <button type="submit" class="btn btnclr2 signupbtn btn-block" onClick={signupuser}>Submit</button>
                           
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

export default Signup