import React from 'react';
import Home_nav from './home_nav';
import Searchbar from './searchbar';
import Moviecard from './moviecard';
import CustomIcons from './pagination';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Watchlater = () => {

  const [movies, setmovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentpage, setcurrentpage] = useState(1)
  const pagesize = 2;
 


  useEffect(()=> {

    const fetchMovies =async ()=> {

      try{

        const token = localStorage.getItem("token");
        console.log("Token:", token);

        
        const response = await axios.get('http://127.0.0.1:8000/api/watchlist', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          }
        });
        console.log("watclist" ,response.data);
        setmovies(response.data.data);

        
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



  /////////////////////////////////////////////////////////////////////////////////////////////////////

  const startindex =(currentpage-1) * pagesize;
  const endindex= startindex + pagesize;
  const currentMovies = movies.slice(startindex, endindex);
  const totalpages = Math.ceil(movies.length/pagesize)

  const handlepage=(event,value)=>{
    setcurrentpage(value)
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////





  const removelist = async (movieId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://127.0.0.1:8000/api/removelist/${movieId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        }
      });
      setmovies(prevMovies => prevMovies.filter(movie => movie.movie.id !== movieId));
      toast.dark(response.data.message);
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
      setErrorMessage(error.response?.data?.message || 'Failed to remove from watchlist');
    }
  };



  

  return (
    <div className='homebody vw-100 vh-100'>

      
      <div className='homenavstyle'>
        <Home_nav />
      </div>
<ToastContainer position='top-center'/>
      <div className='container'>
        <div className='row align-items-center homesearchmargin'>
          <div className='col-6 col-md-6 col-lg-6'>
            <h1 className='text-white'style={{fontFamily:'monospace'}}>My Watchlist</h1>
          </div>

         
        </div>

       
          <div className='row'>
            {currentMovies.length > 0 ? (
              currentMovies.map(movie => (
                <div className='col-lg-3 col-md-4 col-sm-6 col-6 mb-4' key={movie.id}>
                  <Moviecard 
                    title={movie.movie.title}
                    movieId={movie.movie.id}
                    thumbnail={`http://127.0.0.1:8000${movie.movie.thumbnail}`}
                    removelist={()=>removelist(movie.movie.id)}
                    added={true}
                  />
                </div>
              ))
            ) : (
              <p className="text-white text-center w-100 mt-5">Your watchlist is empty.</p>
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

export default Watchlater;
