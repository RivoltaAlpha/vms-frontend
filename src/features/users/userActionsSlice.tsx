import { usersAPI } from './usersAPI';
import { Toaster, toast } from 'sonner'
import { TIUser } from '../../types/types';

// Query All users
export const ListUsers = () => {
    const { data: users, isLoading,isError } = usersAPI.useGetUsersQuery();
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading users</div>;
    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users?.map((user) => (
                    <li key={user.user_id}>{user.first_name} - {user.email}</li>
                ))}

            </ul>
        </div>
    );
}

// Query Single user
export const GetUser = () => {
    const { data: user, error, isLoading } = usersAPI.useGetUserQuery(1);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading user</div>;
    return (
        <div>
            <h2>User 1</h2>
            <ul>
                <li>{user?.first_name} - {user?.email}</li>
            </ul>
        </div>
    );
}


// Delete user
export const UsersTable = () => {
    const { data: users, isLoading,isError } = usersAPI.useGetUsersQuery();
    const [updateUser ] = usersAPI.useUpdateUserMutation();
    const [deleteUser ] = usersAPI.useDeleteUserMutation();

    const handleDelete = async (id: number) => {
        try {
            await deleteUser(id).unwrap();
            toast.success('User deleted successfully');
        } catch (error) {
            toast.error('Error deleting user');
        }
    }

    const handleUpdate = async (id: number, data: Partial<TIUser>) => {
        try {
            await updateUser({ id, data }).unwrap();
            toast.success('User updated successfully');
        } catch (error) {
            toast.error('Error updating user');
        }
    }

    return (
        <>
            <Toaster
                toastOptions={{
                    classNames: {
                        error: 'bg-red-400',
                        success: 'text-green-400',
                        warning: 'text-yellow-400',
                        info: 'bg-blue-400',
                    },
                }}
            />
            <div className="overflow-x-auto text-base-content bg-gray-800 rounded-lg p-4">
                <h1 className='text-xl my-4'>Users Data</h1>
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>first name</th>
                            <th>last name</th>
                            <th>email</th>
                            <th>phone</th>
                            <th>address</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={7}>Loading...</td></tr>
                        ) : isError ? (
                            <tr><td colSpan={7}>Error loading users</td></tr>
                        ) : (
                            users && users.map((user) => (
                                <tr key={user.user_id}>
                                    <th>{user.user_id}</th>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.contact_phone}</td>
                                    <td>{user.address}</td>
                                    <td className='flex gap-2'>
                                        <button className='btn btn-sm btn-outline btn-info' onClick={() => handleUpdate(user.user_id, user)}>Update</button>
                                        <button className='btn btn-sm btn-outline btn-warning' onClick={() => handleDelete(user.user_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                    <tfoot>
                        <tr><td colSpan={7}>{users ? `${users.length} records` : '0 records'}</td></tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}

export default UsersTable;