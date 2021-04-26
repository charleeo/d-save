import React from 'react';
const  HomePage=()=>{
  
  return (
    <>    
    <main >
    <section className="main-hero">

      <div>
        <h1 id="hero-business-name">
          dsave mobile wallet
        </h1>
        <p id="business-highlight">
          thinking about how you are going to pay those bills, like "house rent, school fees and the rest"? <span style={{color:'#12345'}}>DSave</span> is your best plung
        </p>
        <div className="how-it-works">
          <a href="#how-it-works" className="my-btn learn-more-btn">learn more</a >
        </div>
      </div>
    </section>
      
    <section id="how-it-works">
      <div className='work-wrapper card mt-5'>
        <div className='card-body'>

      <h2>How it works</h2>
       <p>
         <b>D-SAVE</b> is a savings platform where you can make either daily, weekly, monthly savings. After a period of time, you get a percentage return on investment(ROI) plus your capital.
       </p>
       <hr/>
       <div>
          <p>
          We have three savings categories which are 
          </p><hr/>
          <ul className='list-group'>
            <li className='list-group-item'>Bronze</li>
            <li className='list-group-item'>Silver</li>
            <li className='list-group-item'>Gold</li>
          </ul>
          <hr/>
          <p>
            The Bronze category option simply requires you to save your money and also have the ability to withdraw it at anytime of choice, while, the Silver option, you save for a fixed period of time(six months) minimum and you get up to 10 percent for your return on investment (ROI). For the 
          </p>
        </div>
      </div>
       </div>
    </section>
    </main>
   
    </>
  )
}
export default HomePage;