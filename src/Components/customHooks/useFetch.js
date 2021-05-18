import { useEffect,useState } from 'react';
import http from '../../services/httpServices';

const useFetch=(url,options=null)=>{
  const [data,setData] = useState(null)
  const [ispending,setIspending] = useState(false)
  
  const [error,setError] = useState(null)
  useEffect(()=>{
    const header = http.setJwtHeaders()
    const abortController = new AbortController();
    setIspending(true)
    fetch(url, header, {signal:abortController.signal},  options)
    .then(res=>{
      if(!res.ok)throw new Error('There was an error. Please retry')
      return res.json()
    })
    .then(result=>{
    
      setData(result)
      setIspending(false)
      setError(null)
    })
    .catch(error=>{
        if(error.name==="AbortError"){
          console.log('fetch aborted')
        }else{
          setIspending(false)
          setData(null)
          setError(error.message)
        }
      })
      return ()=>abortController.abort()
  },[url,options]);

return {data,ispending,error}
}
export default useFetch