// components/UsersTable.tsx
import React from 'react';
import usersAPI from '../features/users/usersAPI';
import { TUser } from '../types/types';

const UsersTable: React.FC = () => {
  const { data: users, error, isLoading } = usersAPI.useGetUsersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-5">Users Data</h2>
      <table className="min-w-full bg-base">
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
      </table>
    </div>
  );
};

export default UsersTable;
