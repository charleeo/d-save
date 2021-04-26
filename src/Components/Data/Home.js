import Users from './users';
import useFetch from './../customHooks/useFetch';

const Home=()=>{
  const {data:users,ispending,error} = useFetch('http://127.0.0.1:5000/user/all')
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
      {ispending && <p>Loading...</p>}
       {users && <Users users={users} title='No title'/>}
      {error && <p>{error}</p>}
      </div>
    </div>
  )
}
export default Home