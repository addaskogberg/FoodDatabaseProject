 import React from 'react';

 
const winter = '../assets/img/footerStone.png';

const Footer = () => (
  <footer>
   
  <div style={{color:'#bdb0c0', height:'100px', position: 'absolute ', width: '1200px' ,backgroundImage: "url(" + winter + ")", bottom: '0'}}> 
    <p>Den här sidan är ett MERN projekt och ingår som en leverans i kursen 1dv430 på LinnéUniversitetet.</p>  
    <p>Skapad av Adda Skogberg,  <a style={{color:'#bdb0c0'}} href="https://github.com/addaskogberg">  Länk till mitt GitHub repo</a> </p> 
 
   </div> 
  </footer>
);
 




export default Footer; 
