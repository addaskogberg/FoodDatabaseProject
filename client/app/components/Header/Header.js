import React from 'react';

import { Link } from 'react-router-dom';

const winter = '../assets/img/footerStone.png';
const Header = () => (
  <header >
  <div style={{ width: '100%' ,backgroundImage: "url(" + winter + ")"}}>
    <h1 style={{marginTop: '30px'}} className="headerh1" > Mat i balans </h1>
    <br />
     
    <Link to="/">Hem</Link>
    <br />  
    </div>
  </header>
);

export default Header;

