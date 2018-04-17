import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1 className="headerh1" > Mat i balans </h1>
    <Link to="/">Hem</Link>

   {/*  <nav>
      <Link to="LogOut/LogOut">Logga Ut</Link>
    </nav> */}

    <hr />
  </header>
);

export default Header;
