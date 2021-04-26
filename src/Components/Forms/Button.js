import React from 'react';

const Button=({type,label,styl,status})=>{
  return(
    <div className="form-group justify-content-center">
      <button type={type} className={styl} disabled={status} >{label}</button>
    </div>
  );
}
const renderBTN = (label, styl, status=false,type='submit',)=>{
   return( <Button
     label={label}
     type={type}
     styl={styl}
     status={status}
    />
   )
}

export default renderBTN