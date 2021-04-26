import React from  'react';

export const Footer=()=>{
  return(
    <>
    <hr/>
    <div className='footer'>
    <div className="row ">
      <div className="col-md-6">
        <p>Quick Links</p>
         <ul>
           <li>Home</li>
           <li>About</li>
         </ul>
      </div>
      <div className="col-md-6">
      <p>Quick Links</p>
         <ul>
           <li>Home</li>
           <li>About</li>
         </ul>
      </div>
    </div>
    <footer>&copy; {new Date().getFullYear()}</footer>
    </div>
    </>
  )
}