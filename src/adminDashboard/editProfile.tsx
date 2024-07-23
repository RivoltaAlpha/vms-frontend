import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { usersAPI } from '../features/users/usersAPI';
import { setUserDetails } from "../features/registration/userAuthSlice";
import { toast } from 'sonner';
import { NavLink, useNavigate } from 'react-router-dom';

export  const AdminProfileEdit = () => {
  const { user } = useSelector((state: RootState) => state.userAuth);
  const [formData, setFormData] = useState({
    id: user?.user_id || 0,
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    username: user?.username || '',
    email: user?.email || '',
    contact_phone: user?.contact_phone || '',
    address: user?.address || '',
    image_url: user?.image_url || '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUser, { isLoading }] = usersAPI.useUpdateUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data on Change:', formData); // Log form data on change
    if (user?.user_id !== undefined){
      try {
        const updatedUser = await updateUser({ id: user.user_id, data: formData }).unwrap();
        console.log('API response:', updatedUser);
        dispatch(setUserDetails(updatedUser));
        toast.success('Profile updated successfully');
        navigate('/admin/profile');
      } catch (error) {
        console.error(error);
        toast.error('Error updating profile');
      }
    }
    else {
      console.error('Error updating profile');
      toast.error('Error updating profile');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
          <img 
                            src={formData.image_url}
                            alt="User Profile" 
                            className="w-32 h-32 rounded-full object-cover"
                        />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-2 bg-slate-900 border rounded"
              />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full bg-gray-900 p-2 border rounded"
              />
              <input
                type="text"
                name="udername"
                value={formData.username}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full  bg-gray-900 p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full  bg-gray-900 p-2 border rounded"
              />
              <input
                type="tel"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full  bg-gray-900 p-2 border rounded"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full bg-gray-900 p-2 border rounded"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <NavLink to="/admin/profile" type="button"  className="px-4 py-2 bg-secondary text-white rounded">Back</NavLink>
              <button type="submit" disabled={isLoading} className="px-4 py-2 bg-base text-white rounded" >
                {isLoading ? 'Saving...' : 'Save'}
                </button>
              <button type="button" className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminProfileEdit;
