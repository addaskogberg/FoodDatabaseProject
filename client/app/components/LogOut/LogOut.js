import React from 'react';
import { Link } from 'react-router-dom';

const stone = '../assets/img/stones.png';

const LogOut = () => (
  <div style={{color:'#bdb0c0', backgroundColor:'red', height: '90%',  position: 'absolute ', bottom:'0', width: '100%', backgroundImage: "url(" + stone + ")"}}>
  <h1>Du är utloggad!</h1>

  <Link to="/">Hem</Link>
  </div>
);

export default LogOut;
