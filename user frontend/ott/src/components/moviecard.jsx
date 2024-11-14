import React, { Children } from 'react';
import { useNavigate} from 'react-router-dom';
// import { useState } from 'react';



const Moviecard = ({title, thumbnail,onWatchlaterClick,removelist,movieId,added,count , historyshowbtn=true }) => {
// const [added, setadded] = useState(true);
const  navigate  = useNavigate();
console.log("Received movieId:", movieId);


const handleViewClick = () => {
  navigate(`/view/${movieId}`); 
};


const handleButtonClick = () => {
  if (added) {
    // If the movie is already added, remove it from the watchlist
    removelist();
  } else {
    // If the movie is not added, add it to the watchlist
    onWatchlaterClick();
  }
};




  return (
    <div className='card border-black animate-card home' style={{ cursor: 'pointer' }}>
      <img src={thumbnail} alt={title} className="card-img img-fluid" onClick={handleViewClick} style={{height:'180px'}}/>
      <div className='card-body'>
       
        <h4 className='card-title text-light mb-0 fs-5 ' style={{fontFamily:'cursive'}}>{title}</h4>
        <div className='d-flex justify-content-between flex-wrap'>
          <div className=''>
            <p className='mt-2 mb-1 text-white' style={{fontFamily:'cursive'}}>Rating:</p>
          </div>
          {historyshowbtn && (<button href="#" className='btn text-white' onClick={ handleButtonClick}  >
            {added ? (<i class="bi bi-x-circle custom-icon"></i>):(<i class="bi bi-plus-circle custom-icon"></i>)
          }</button>)}
          
        </div>
        {count !== undefined && <p className='text-white'style={{fontFamily:'cursive'}}>views: {count}</p>}
      </div>
    </div>
  );
}

export default Moviecard;
