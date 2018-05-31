 import React from 'react';

 
const winter = '../assets/img/footerStone.png';

const Footer = () => (
  <footer>
   
  <div style={{color:'#bdb0c0', height:'100px', position: 'absolute ', bottom:'0', width: '100%' ,backgroundImage: "url(" + winter + ")"}}> 
    <p>Den här sidan är ett MERN projekt och ingår som en leverans i kursen 1dv430 på LinnéUniversitetet.</p>  
    <p>Skapad av Adda Skogberg,  <a style={{color:'#bdb0c0'}} href="https://github.com/1dv430/as224wq-project">  Link to my GitHub repo</a> </p> 
 
   </div> 
  </footer>
);
 




export default Footer; 
