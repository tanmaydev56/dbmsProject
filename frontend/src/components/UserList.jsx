import  { useEffect, useState } from 'react';
import { fetchUsers } from '../services/UserService';

const UsersList = () => {
const [user,setUser] = useState([]);
useEffect(()=>{
  const getUser =  async ()=>{
    try{
      const users  =  await fetchUsers();
      setUser(users);

    }
    catch(error){
      console.error("Error loading products:", error);
    }
  };
  getUser();
},[])


 

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Username</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          {user.map(user => (
            <tr key={user.user_id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
