import { useGetUsersQuery } from './usersAPI';
import { useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } from './usersAPI';
import { usersAPI } from './usersAPI';

const UserList = () => {
  const { data: users, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.fullname} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
