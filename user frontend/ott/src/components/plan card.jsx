import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'



const Plancard = () => {
  return (
    <div className="container">
    <div className="row justify-content-center">
        <div className=" col-12" > 
            <div className="card plancard" style={{fontFamily:'monospace'}}>
                <div className="card-body">
                    <h5 className="card-title text-white text-start mx-3">Basic</h5>
                    
                    <ul className="list-unstyled mt-3 mx-3 text-white">
                        <li className="d-flex align-items-center card-text">
                            <h6 className=" mt-3 mb-3  display-6 text-white text-start">$9.99</h6>
                        </li>
                        <li className="d-flex align-items-center card-text">
                            <i className="bi bi-check-circle-fill text-success me-3 mb-2"></i> 
                            1 Month
                        </li>
                        <li className="d-flex align-items-center card-text">
                            <i className="bi bi-check-circle-fill text-success me-3"></i>
                            24/7 support & Limitted content
                        </li>
                        
                    </ul>
                    <div className="text-start mx-3">
                        <a href="#" className="btn planbtn  mt-3">Get Started</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>





  )
}

export default Plancard