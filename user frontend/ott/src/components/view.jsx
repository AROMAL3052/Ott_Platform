
import Home_nav from './home_nav';
import Rating from './rating';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const View = () => {
  const [error, setError] = useState()
  const [views, setviews] = useState({
    title: '',
    video: '',    
    thumbnail: '',   
    description: '', 
  });
  

  var {movieId} = useParams()


  useEffect(() => {
    
    const token = localStorage.getItem('token');
   
    axios.get(`http://127.0.0.1:8000/api/view/${movieId}/`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
    })
    .then(response => {
        console.log("Fetched movie details:", response.data);
        setviews(response.data.movie_id);
        console.log("view", response.data)
    })
    .catch(error => {
        setError("Failed to fetch movie details.");
        
    });
}, [movieId]);




  return (
    <div className='viewcard d-flex flex-column' style={{ overflowX: 'hidden' }}>
      <Home_nav />

      <div className='container my-5 border border-dark p-3 flex-grow-1'>
        <div className='row align-items-center'>
          <div className='col-lg-6 d-flex justify-content-end'>
            <video
              className='w-100'
              style={{ height: '400px', objectFit: 'cover' }}
              src={`http://127.0.0.1:8000${views.video}`}
              type="video/mp4"
              controls
            />
          </div>
          <div className='col-lg-6 d-flex justify-content-start pt-1'>
            <img
              src={`http://127.0.0.1:8000${views.thumbnail}`}
              className='w-100'
              style={{ height: '400px', objectFit: 'cover' }}
              alt="Movie Poster"
            />
          </div>
        </div>
      </div>

      <div className='container text-light' style={{ fontFamily: 'math' }}>
        <h4 className='mt-4 fs-1 fs-md-2 fs-lg-3'>{views.title}</h4>
        <h5 className='mt-3'>
          {views.description}
        </h5>
        <h5 className='mt-3'>Rating :</h5>
        <div className='mt-3 mb-3'><Rating /></div>
      </div>
    </div>
  );
};

export default View;
