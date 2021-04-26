import { useParams } from "react-router-dom"
import useFetch from '../customHooks/useFetch';

const UserDetails=()=>{
  const {id} = useParams()
  const {data,error,ispending} = useFetch(`http://127.0.0.1:5000/user/details/${id}`)
  return(
    <>
      {ispending && <p>Loading...</p>}
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