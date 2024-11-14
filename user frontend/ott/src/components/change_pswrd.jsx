import React from 'react'
import Home_nav from './home_nav'
import axios from 'axios'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Change_pswrd = () => {

const navigate = useNavigate()
const [current_password, set_current_password] = useState("")
const [new_password, set_new_password] = useState("");
const [conf_password, set_conf_password] = useState("");
const [showCurrentPassword, setShowCurrentPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfPassword, setShowConfPassword] = useState(false);


const submitpassword = async (e) => {
   e.preventDefault()

    const user = {
        old_password: current_password,
        new_password: new_password,
        conf_password: conf_password
    };

    try {
        const token = localStorage.getItem('token');
        console.log("Token:", token);     
    
        const response = await axios.post(
            'http://127.0.0.1:8000/api/changepassword',
            user,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`,
                },

            }
        );
        
        toast.success("Password changed successfully");
        navigate('/login')
    } catch (error) {
        // Log the entire error for better debugging
        console.error("Full error response:", error);
        
        if (error.response) {
            console.error("Error response data:", error.response.data);
            
            
            if (error.response.data.detail) {
                toast.error(error.response.data.detail);
            } else if (error.response.data.old_password) {
                // If the old_password key exists, show the specific error message
                toast.error(error.response.data.old_password[0]); // Accessing the first error message
            }else if (error.response.data.conf_password){
                toast.error(error.response.data.conf_password[0])
            }
        }else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error message:", error.message);
            toast.error('An error occurred, please try again.');
        }
    }
       
};




  return (
    <div>
        <div className='changepswdimg w-100 ' style={{minHeight:'100vh',overflowX: 'hidden'}} >
        <Home_nav/>
        <ToastContainer position='top-center'/>
        <div className="mt-5" >
        <div className="row w-100 justify-content-center"> 
            <div className="col-12 col-sm-8 col-md-8 col-lg-6 col-xl-5"> 
                <div className="card bg-transparent border-0 p-4" style={{maxWidth:'100%'}}>
                    <div className="card-body forms">
                        <h2 className='text-white ml-3 changepswdtext'>Change Password</h2>
                        <form className='inputmt text-white' >
                            <div className="form-group mb-4">
                                <div className='passwordeyecontainer'>
                                <i className={`bi ${showCurrentPassword ? "bi-eye-slash" : "bi-eye"} inputs-icon`}onClick={() => setShowCurrentPassword(!showCurrentPassword)}></i>
                                <input type={showCurrentPassword?'text':'password'} className="form-control"  placeholder="Current Password" value={current_password} onChange={(e)=>set_current_password(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <div className='passwordeyecontainer'>
                                <i className={`bi ${showNewPassword ? "bi-eye-slash" : "bi-eye"} inputs-icon`}onClick={() => setShowNewPassword(!showNewPassword)}></i>
                                <input type={showNewPassword? 'text':'password'} className="form-control"  placeholder="New Password" value={new_password} onChange={(e)=>set_new_password(e.target.value)} />
                            </div>    
                            </div>
                            <div className="form-group mb-3">
                                <div className='passwordeyecontainer'>
                                <i className={`bi ${showConfPassword ? "bi-eye-slash" : "bi-eye"} inputs-icon`}onClick={() => setShowConfPassword(!showConfPassword)}></i>
                                <input type={showConfPassword? 'text':'password'} className="form-control"  placeholder="confirm Password" value={conf_password} onChange={(e)=>set_conf_password(e.target.value)}/>
                                </div>
                            </div>
                            <button type="submit" className="btn btnclr2 btn-block"onClick={submitpassword} >Submit</button>
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

export default Change_pswrd