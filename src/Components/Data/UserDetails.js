import { useParams } from "react-router-dom"
import useFetch from '../customHooks/useFetch';
import http from '../../services/httpServices'

const UserDetails=()=>{
  const url = http.setURL();
  const {id} = useParams()
  const {data,error,ispending} = useFetch(`${url}/user/details/${id}`)
  return(
    <>
      {ispending && <p className='loader'></p>}
      {data && <div>
        <h1>{data.name}</h1>
        <h2>{data.email}</h2>
      </div>
      }
      {error && <p>{error}</p>}
    </>
  )
}
export default UserDetails