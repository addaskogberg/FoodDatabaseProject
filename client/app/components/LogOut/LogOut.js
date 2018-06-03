import React from 'react';
import { Link } from 'react-router-dom';

const stone = '../assets/img/stones.png';

const LogOut = () => (
  <div style={{color:'#bdb0c0', height: '90%',  position: 'absolute ', bottom:'0', width: '100%', backgroundImage: "url(" + stone + ")", backgroundSize: '1200px', backgroundRepeat: 'no-repeat', width: '1200px', overflow: 'hidden'}}>
  <h1 style={{marginLeft: '15px'}} >Du är utloggad!</h1>

  <Link style={{marginLeft: '15px'}} to="/">Hem</Link>
  </div>
);

export default LogOut;
