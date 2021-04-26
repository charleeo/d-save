import { Link } from "react-router-dom";

const Users =({users})=>{
  return(
    <div className="card border-0">
      <div className="card-body  shadow-lg">
      
        <ul className="list-unstyled">
       {users.map((user)=>(
         <Link key={user.id} to={`user/${user.id}`}>
         <li key={user.id}>{user.email}
         </li>
         </Link>
       ))}
        </ul>
      </div>
    </div>
  )
}

export default Users;