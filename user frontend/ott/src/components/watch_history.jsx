import React from 'react';
import Home_nav from './home_nav';
import Moviecard from './moviecard';
import CustomIcons from './pagination';
import axios from "axios";
import { useState,useEffect } from 'react';


const WatchHistory = () => {
  

  const [movies, setmovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentpage, setcurrentpage] = useState(1)
  const pagesize = 2;
  


  useEffect(()=> {

    const fetchMovies =async ()=> {

      try{

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem('user_id');
        
        
        const response = await axios.get(`http://127.0.0.1:8000/api/history/${userId}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          }
        });
        
        setmovies(response.data);
        console.log("watchhistt" ,response.data);
        
      }

      catch(error){
        if(error.response){
          
          setErrorMessage(error.response.data.message);
        }
        else{
            setErrorMessage('failed to fetch movies')
          }
        }

    };
    fetchMovies();

  },[])


  ///////////////////////////////////////////////////////////////////////////////////////////

  const startindex =(currentpage-1) * pagesize;
  const endindex= startindex + pagesize;
  const currentMovies = movies.slice(startindex, endindex);
  const totalpages = Math.ceil(movies.length/pagesize)

  const handlepage=(event,value)=>{
    setcurrentpage(value)
  };

  //////////////////////////////////////////////////////////////////////////////////////////////


  return (
    <div className='homebody vw-100 vh-100'>
      <div className='lightning flashit strike'></div>
      
      <div className='homenavstyle'>
        <Home_nav />
      </div>

      <div className='container'>
        <div className='row align-items-center homesearchmargin'>
          <div className='col-6 col-md-6 col-lg-6'>
            <h1 className='text-white'style={{fontFamily:'monospace'}}>My Watch History</h1>
          </div>
        </div>


<div className='row'>
  {currentMovies.length > 0 ? (
    currentMovies.map(movie => (
      <div key={movie.id} className='col-lg-3 col-md-4 col-sm-6 col-6 mb-4'>
        <h5 className='mb-3 text-white' style={{ fontFamily: 'monospace' }}>
          {movie.date_time}
        </h5>
        <Moviecard 
          title={movie.title}
          movieId={movie.movie_id}
          thumbnail={`http://127.0.0.1:8000${movie.thumbnail}`}
          count={movie.count}
          historyshowbtn={false}
        />
      </div>
    ))
  ) : (
    <p className="text-white text-center w-100 mt-5">Your watch history is empty.</p>
  )}
</div>


        <div className='mb-5'><CustomIcons
        count={totalpages}
        page={currentpage}
        onChange={handlepage}
        /></div>
      </div>
    </div>
  );
};

export default WatchHistory;
