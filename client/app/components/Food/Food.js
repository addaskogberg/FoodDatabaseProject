import React from 'react';
import { Link } from 'react-router-dom';

const stone = '../assets/img/stones.png';

const Food = ({match}) => (
  <div style={{color:'#bdb0c0', backgroundColor:'red', height: '90%',  position: 'absolute ', bottom:'0', width: '100%', backgroundImage: "url(" + '../../assets/img/stones.png' + ")"}}>
  <h1>Mat</h1>
  <p>{console.log('Vår parameter: ' + match.params.mat)}</p>
  <p>{match.params.mat}</p>

  <Link to="/">Hem</Link>
  </div>
);

export default Food;
