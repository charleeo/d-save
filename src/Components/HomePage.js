import React from 'react';
const  HomePage=()=>{
  
  return (
    <>    
    <main >
    <section className="main-hero">

      <div>
        <h1 id="hero-business-name">
          kolo-vest mobile wallet
        </h1>
        <p id="business-highlight">
          
          investments redefined for a brighter and secured financial future
        </p>
        <div className="how-it-works">
          <a href="#how-it-works" className="my-btn learn-more-btn">learn more</a >
        </div>
      </div>
    </section>
      
    <section id="how-it-works" className='p-5'>
      <div className='work-wrapper  p-5 shadow-lg '>
      <h2>How it works</h2>
       <p className=''>
         <b>Kolo Invets</b> is a savings platform where you can make either daily, weekly, monthly savings. After a period of time, you get a percentage return on investment(ROI) plus your capital.
        We have three savings categories which are 
       </p>
       <ul className=''>
        <li className=' text-center'>Bronze</li>
        <li className=' text-center'>Silver</li>
        <li className='text-center'>Gold</li>
      </ul>
      <p>
        The Bronze category option simply requires you to save your money and also have the ability to withdraw it at anytime of choice, while, the Silver option, you save for a fixed period of time(six months) minimum and you get up to 10 percent for your return on investment (ROI). For the GOLD plan, you get 15% return on investment(ROI) for a perion of 8 month
      </p>
       </div>
    </section>
    </main>
   
    </>
  )
}
export default HomePage;