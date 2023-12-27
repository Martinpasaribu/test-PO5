import React, { useState }from 'react'
import logo from '../img/Logo_main.png'
import axios from 'axios';

import { useNavigate } from "react-router-dom";


const Navbar = () => {
const navigate = useNavigate();
const [loggingOut, setLoggingOut] = useState(false);

const logout = async()  => {
  try {
      setLoggingOut(true);
      await axios.delete('https://server-po-5.vercel.app/logout');
      navigate('/');
  } catch (error) {
    console.log(error);
  }
  finally {
    setLoggingOut(false); // Set status loggingOut ke false setelah proses logout selesai
  }
}

  return (
    <nav class="navbar is-light " role="navigation" aria-label="main navigation">
        <div className="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
            <img src={logo} width="112" height="200" alt='logo'/>
        </a>
    
        <a href='/' role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a href='/' class="navbar-item">
            Home
          </a>

        </div>
    
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
            {loggingOut ? ( // Periksa status loading untuk menampilkan pesan loading atau data
            
            <div className="spinner is-centered"></div>
            
          ) : (
              <button onClick={logout} class="button is-light">
                Log Out
              </button>
          )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </nav>
  )
}

export default Navbar