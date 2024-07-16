import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { NavLink } from 'react-router-dom';
import Navigation from './navigation';

export default function AdminProfile() {
    const { user } = useSelector((state: RootState) => state.userAuth);

    return (
    <div className='flex  gap-10'>
       <Navigation/> 
        <div className="max-w-2xl mx-auto p-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6 w-[600px]">
                    <div className="flex items-center justify-center mb-6">
                        <img 
                            src={'./images/Social media-cuate.png'} 
                            alt="User Profile" 
                            className="w-[300px] h-[300px] object-cover"
                        />
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-center">User Details</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-100 p-3 rounded">
                            <span className="font-semibold">Name:</span> {user?.first_name} {user?.last_name}
                        </div>
                        <div className="bg-gray-100 p-3 rounded">
                            <span className="font-semibold">Email:</span> {user?.email}
                        </div>
                        <div className="bg-gray-100 p-3 rounded">
                            <span className="font-semibold">ID:</span> {user?.user_id}
                        </div>
                        <div className="bg-gray-100 p-3 rounded">
                            <span className="font-semibold">Phone:</span> {user?.contact_phone}
                        </div>
                        <div className="bg-gray-100 p-3 rounded">
                            <span className="font-semibold">Address:</span> {user?.address}
                        </div>
                    </div>
                    <div className="mt-6 flex flex-row justify-between" >
                        <div className="mt-6 ">
                            <NavLink to="/edit-profile" className="px-4 py-2 bg-secondary text-white rounded mr-2">Edit Profile</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );

}