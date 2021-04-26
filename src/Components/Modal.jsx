import React from 'react';

const Modal = ({title, content,handleClose,handleShow,showModal})=>{
  
return (
  <>
   <div className={showModal?'display-block':'display-none'}>
     <div className="row justify-content-center my-modal mt-5" >
       <div className="col-md-8 col-sm-12">
         <div className="card mt-5">
           <div className="card-header">
             <div className="row">
               <div className="col-md-4 offset-md-5">
                {title} 
               </div>
               <div className="col-md-2 col-sm-2 d-flex justify-content-end">
                {handleClose}
               </div>
             </div>
           </div>
           <div className="card-body">
              {content}
          </div>
          <div className="card-footer d-flex justify-content-end">
            {handleClose} 
          </div>
         </div>
       </div>
     </div>
    </div>
      {handleShow} 
    </>
   )
}

export default Modal