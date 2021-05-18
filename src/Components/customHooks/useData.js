import  { useEffect,useState } from 'react';
import http from '../../services/httpServices';

const useData=(url)=>{
  const [data,setData]= useState('');
  const [emptyData,setEmptyData] = useState('')
  const [error,setError]= useState('');
  const [isPending,setIsPending] = useState(true)
  const [options,setOptions] = useState('')
  
  useEffect(()=>{
    const header = http.setJwtHeaders()
       http.get(url,header)
       .then((response)=>{
        
        if(!Array.isArray(response.data.message)){
          setEmptyData(response.data.message);
          setData('');
          setOptions('')
         }else{
           setData(response.data.message);
           setOptions(response.data.t)
           setEmptyData('')
         }
         setError('');
         setIsPending(false);
       })
       
      .catch (error=>{
        if(error.response !== undefined && error.status < 500  ){setError(error.response.data);
        }
        
        else if(error.message==='Network Error') {
          setError("Please check your network connection")
        }
        setData('');
        setEmptyData('')
        setOptions('')
        setIsPending(false)
      })
    },[url]);
  return {
    data,
    emptyData,
    error,
    isPending,
    options
  }
}

export default useData