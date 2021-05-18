import React from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from './customHooks/useDocumentTitle';
const  HomePage=()=>{
  useDocumentTitle('Kolo-invest: Home page')
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
      <h2>Brief Description</h2> <hr/>
       <p className=''>
         <b>Kolo Vest</b> is a savings platform where you can make either daily, weekly, monthly savings. After a period of time, you get a percentage return on investment(ROI) plus your capital.
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
    <section className='px-5'> 
      <div className='row justify-content-center py-5'>
        <div className='col-md-6 col-sm-8 shadow-lg p-3'>
          <h2 >How It Works</h2> <hr/>
          <p>
            The operation is simple and straight forward. <br/>
            All you have to do is simply sign up and click on the <Link to='/reserve-account'>Reserve Account</Link> menu  where you can generate a virtual personal account number. Whenever you want to make any savings or investment, you make payment into that number just like you would do to everyother bank account number.
          </p>
          <p><b>NOTE:</b> You can't use it over the bank counter, you can only transfer money into the generated bank account number using USSD and anyother mobile banking App</p>
        </div>
      </div>
    </section>
    </main>
   
    </>
  )
}
export default HomePage;