import React from 'react'
import Navbar2 from './navbar'
import { useNavigate } from 'react-router-dom'

const Reset_pswrd = () => {

    const  navigate  = useNavigate()

  return (
    <div>
        <div className='resetpswdimg'>
        <Navbar2/>
        <div className="d-flex justify-content-center align-items-center full-height">
        <div className="row w-100 justify-content-center"> 
            <div className="col-12 col-sm-8 col-md-8 col-lg-6 col-xl-5 mt-4"> 
                <div className="card bg-transparent border-0 p-4">
                    <div className="card-body forms">
                        <h2 className='text-white ml-3 resetpswrdtext'>Reset Password</h2>
                        <form className='inputmt text-white'>
                            <div className="form-group mb-4">
                                <input type="email" className="form-control"  placeholder="New Password"/>
                            </div>
                            <div className="form-group mb-3">
                                <input type="password" className="form-control"  placeholder="Confirm password"/>
                            </div>
                            <button type="submit" className="btn btnclr2 btn-block" onClick={()=> navigate('/login')}>Submit</button>
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

export default Reset_pswrd