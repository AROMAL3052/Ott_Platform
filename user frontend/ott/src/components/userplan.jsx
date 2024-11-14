import React from 'react'
import Plancard from './plan card'
import Home_nav from './home_nav'
import CustomIcons from './pagination'

const Userplan = () => {
  return (
    <div className='planbody' style={{ minHeight: '100vh', overflow: 'hidden' }}>
        <Home_nav/>
    <div className='container'>
        <div className='d-flex justify-content-center mt-5'>
            <h1 className='text-white'style={{fontFamily:'monospace'}}>User Plans</h1>
        </div>
        <div className='row mt-4 justify-content-center'>
            <div className="col-12 col-md-12" style={{ minWidth: '400px', maxWidth: '600px' }}>
                <Plancard />
            </div>
            <div className="col-12 col-md-12 mt-5">
                <div className="d-flex justify-content-center">
                    <div className="rounded overflow-hidden shadow" style={{ maxWidth: '550px', width: '100%',fontFamily:'monospace' }}>
                        <table className="table table-hover table-striped text-center mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Date</th>
                                    <th>Plan</th>
                                </tr>
                            </thead>
                            <tbody className='table-dark'>
                                <tr>
                                    <td>12-06-24</td>
                                    <td>Base</td>
                                </tr>
                                <tr>
                                    <td>12-06-24</td>
                                    <td>Base</td>
                                </tr>
                                <tr>
                                    <td>12-06-24</td>
                                    <td>Base</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div className='d-flex justify-content-center my-5'><CustomIcons/></div>
        
    </div>
</div>



  )
}

export default Userplan