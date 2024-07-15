// components/UsersTable.tsx
import React from 'react';
import usersAPI from '../features/users/usersAPI';
import { TUser } from '../types/types';
import { NavLink } from 'react-router-dom';
import { FaBackwardFast } from 'react-icons/fa6';
import Navigation from './navigation';

const UsersTable: React.FC = () => {
  const { data: users, error, isLoading } = usersAPI.useGetUsersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;

  return (
    <div className='flex  gap-10'>
       <Navigation/> 
      <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-5">Users Data</h2>
        <table className="min-w-[90%] bg-base">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-300">ID</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Name</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Email</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user:TUser) => (
              <tr key={user.user_id}>
                <td className="py-2 px-4 border-b">{user.user_id}</td>
                <td className="py-2 px-4 border-b">{user.username}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">View Details</button>
                  <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-2">Delete</button>
                </td>
                <td>

                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7} className="text-right py-2 px-4 border-t">
                <NavLink to="/admin-dashboard" className="px-4 py-2 mr-10  m-10 text-white rounded ">
                <FaBackwardFast size={20} />
                </NavLink>
                {users?.length} {users?.length === 1 ? 'record' : 'records'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
