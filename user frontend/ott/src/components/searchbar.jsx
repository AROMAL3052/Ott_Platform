import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Searchbar = ({onSearch,fetchMovies}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { title } = useParams(); 


  const fetchPosts = (title) => {
    const token = localStorage.getItem('token');
    console.log("title:", title); 

    axios
      .get(`http://127.0.0.1:8000/api/search/${title}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log("API Response:", response.data); 
        onSearch(response.data);
      

        
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      fetchPosts(searchTerm); // Fetch results if search term is not empty
    } else {
      fetchMovies(); // Restore original movies list if input is cleared
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      fetchMovies(); // Call fetchMovies to reload original list when cleared
    }
  };



  return (
    <div>
      <div className="search-box">
        <button className="btn-search" onClick={handleSearch} > <i className="bi bi-search"> </i> </button>
        <input type="text" className="input-search" placeholder="Type to Search..." value={searchTerm} onChange={handleInputChange} />
      </div>
    </div>
  );
};

export default Searchbar;
