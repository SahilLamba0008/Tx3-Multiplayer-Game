import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home-container'>
      <div className='title'>
        <h1>Welcome to Tic Tac Toe</h1>
      </div>
      <div className="giphy">
        <img className="main-img" src="/assets/blue-background-background.gif" alt='animated gif'/>
      </div>
      <Link to="/tictactoe">
        <button className='button'>
          Start Game
        </button>
      </Link>
    </div>
  )
}

export default Home;