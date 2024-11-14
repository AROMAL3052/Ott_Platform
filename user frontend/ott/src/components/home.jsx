import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home_nav from './home_nav';
import Searchbar from './searchbar';
import Moviecard from './moviecard';
import CustomIcons from './pagination';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [movies, setMovies] = useState([]); // to set movies
  const [watchlater, setWatchlater] = useState(new Set()); 
  const pagesize=5;
  const [currentpage,setcurrentpage] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  
  
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/home', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          }
        });
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Failed to fetch movies');
        }
      }
    };
    useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/watchlist', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          }
        });

        const watchlistIds = new Set(response.data.data.map(movie => movie.movie.id));
        setWatchlater(watchlistIds); // Initialize watchlater with fetched IDs
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };

   
    fetchWatchlist();
    
  }, []);


  ////////////////////////////////////////////////////////////////////////////////////////////////////

  const startindex =(currentpage-1) * pagesize;
  const endindex= startindex + pagesize;
  const currentMovies = movies.slice(startindex, endindex);
  const totalpages = Math.ceil(movies.length/pagesize)

  const handlepage=(event,value)=>{
    setcurrentpage(value)
  };

  useEffect(() => {
    fetchMovies(currentpage);
  }, [currentpage]);

///////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleSearchResults = (searchedMovies) => {

    
    setMovies((prevMovies) => {
      // Add the searched movies at the top and ensure no duplicates
      const updatedMovies = [
        ...searchedMovies,
        ...prevMovies.filter(movie => !searchedMovies.some(searchedMovie => searchedMovie.id === movie.id)),
      ];
      return updatedMovies;
    });
  };


 



  const watchlatersubmit = async (movieId) => {
    try {
      const token = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');

     
      const response = await axios.post('http://127.0.0.1:8000/api/watchlater', 
        { movie_id: movieId, user_id }, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          }
        }
      );

      // Update the watchlater state to include the new movie ID
      setWatchlater(prev => new Set(prev).add(movieId)); 
      console.log("Added to watchlist:", response.data);
    } catch (error) {
      console.error("Error adding movie to watchlist:", error);
      setErrorMessage(error.response?.data?.message || 'Failed to add to watchlist');
    }
  };

  const removelist = async (movieId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://127.0.0.1:8000/api/removelist/${movieId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        }
      });

      // Remove the movie ID from the watchlater state
      setWatchlater(prev => {
        const updatedWatchlater = new Set(prev);
        updatedWatchlater.delete(movieId);
        return updatedWatchlater;
      });
      console.log("Removed from watchlist:", response.data);
      toast.error("Removed from watchlist");
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
      setErrorMessage(error.response?.data?.message || 'Failed to remove from watchlist');
    }
  };

  return (
    <div className='homebody vw-100 vh-100'>
      <div className='homenavstyle'>
        <Home_nav />
        <ToastContainer position='top-center'/>
      </div>

      <div className='container'>
        <div className='row align-items-center homesearchmargin'>
          <div className='col-6 col-md-6 col-lg-6'>
            <h1 className='text-white' style={{ fontFamily: 'sanserif' }}>Movies</h1>
          </div>

          <div className='col-6 col-md-6 col-lg-6 d-flex justify-content-end'>
            <Searchbar onSearch={handleSearchResults} fetchMovies={fetchMovies}  />
          </div>
        </div>

        <div className='row'>
          {currentMovies.length > 0 ? (
            currentMovies.map(movie => (
              <div className='col-lg-3 col-md-4 col-sm-6 col-6 mb-4' key={movie.id}>
                <Moviecard 
                  title={movie.title}
                  thumbnail={`http://127.0.0.1:8000${movie.thumbnail}`}
                  movieId={movie.id}
                  onWatchlaterClick={() => watchlatersubmit(movie.id)}
                  removelist={() => removelist(movie.id)}
                  added={watchlater.has(movie.id)} // Check if the movie is in the watchlist
                />
              </div>
            ))
          ) : (
            <p className="text-white text-center w-100 mt-5">No movies available.</p>
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

export default Home;
