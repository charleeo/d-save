const validate =(element,lengthProp='',lengthValue=0, lengthProp2 ='', lengthValue2=10)=>{
  var  error=false;
  
  if( (element.trim()).length <1){
    error = true
  }
  if(lengthProp && (lengthProp.trim()).length <lengthValue){
    error=true
  }
  if(lengthProp2 && (lengthProp2.trim()).length >lengthValue2){
   error=true
 }
  return error
 }

export  const formatNumber = inputNumber => {
  let formetedNumber=(Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  let splitArray=formetedNumber.split('.');
  if(splitArray.length>1){
    formetedNumber=splitArray[0];
  }
  return(formetedNumber);
};


export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export const compareDates =(givenDate,currentDate= new Date())=>{
  let isDue = false;
  if(currentDate >= new Date(givenDate))isDue = true;
    
  else  isDue=false;
  return isDue;
}

export const getMonths =(dateDue,startDate)=>{
  const dateObject = new Date(dateDue);
  const startDateObject = new Date(startDate)
  return dateObject.getMonth() - startDateObject.getMonth()
}

export const getMonthsLeft =(date,currentDate=new Date())=>{
  const dateObject = new Date(date);
  return dateObject.getMonth() - currentDate.getMonth()
}
export default validate