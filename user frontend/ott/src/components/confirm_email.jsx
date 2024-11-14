import React from 'react'
import Navbar2 from './navbar'
import { useNavigate } from 'react-router-dom'

const Conf_email = () => {

const  navigate  = useNavigate()

  return (
    <div className='confemailbody'>
    
        <div className='confemailimg'>
        <Navbar2/>
        <div className="d-flex justify-content-center align-items-center">
        <div className="row w-100 justify-content-center"> 
            <div className="col-12 col-sm-8 col-md-8 col-lg-6 col-xl-5 mt-4"> 
                <div className="card bg-transparent border-0 p-4">
                    <div className="card-body forms">
                        <h2 className='text-white ml-3 confemailtext'>Confirm Email</h2>
                        <form className='inputmt text-white'>
                            <div className="form-group mb-4">
                                <input type="email" className="form-control" id="email" placeholder="Enter email"/>
                            </div>
                            <button type="submit" className="btn btnclr2 btn-block" onClick={()=>navigate('/reset_pswrd')}>Submit</button>
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

export default Conf_email