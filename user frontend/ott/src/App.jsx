import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Landingpage from './components/landingpage';
import Signup from './components/signup';
import Login from './components/login';
import Conf_email from './components/confirm_email';
import Reset_pswrd from "./components/reset_pswrd";
import Change_pswrd from './components/change_pswrd';
import Subscribe from './components/subscribe';
import Userplan from './components/userplan';
import Home from './components/home';
import View from './components/view';
import Watchlater from './components/watchlater';
import WatchHistory from './components/watch_history';
import Searchbar from './components/searchbar';




function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landingpage/>} ></Route>
      <Route path='/signup' element={<Signup/>} ></Route>
      <Route path='/login' element={<Login/>} ></Route>
      <Route path='/conf_email' element={<Conf_email/>} ></Route>
      <Route path='/reset_pswrd' element={<Reset_pswrd/>} ></Route>
      <Route path='/change_pswrd' element={<Change_pswrd/>} ></Route>
      <Route path='/subscribe' element={<Subscribe/>} ></Route>
      <Route path='/userplan' element={<Userplan/>} ></Route>
      <Route path='/home' element={<Home/>} ></Route>
      <Route path='/view/:movieId' element={<View/>} ></Route>
      <Route path='/watchlist' element={<Watchlater/>} ></Route>
      <Route path='/watchhistory/' element={<WatchHistory/>} ></Route>
      <Route path='/search/:title' element={<Searchbar/>} ></Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App
