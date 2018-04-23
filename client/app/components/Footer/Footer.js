 import React from 'react';
 
//  const footerstyle = { backgroundImage:`url($(bg))`}
 /* const footerStyle ={color:'green', backgroundColor:'red', height:'330px', backgroundImage:`url($(bg))`}  
 */
 
const winter = 'assets/img/water.jpg';

const Footer = () => (
  <footer>
   
  <div style={{color:'green', backgroundColor:'red', height:'150px', position: 'absolute ', bottom:'0', width: '100%' ,backgroundImage: "url(" + winter + ")"}}> 

    <p>Fyll på här med innehåll för footer</p>  
 
   </div> 
  </footer>
);
 




export default Footer; 
