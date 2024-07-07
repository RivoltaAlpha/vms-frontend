// components/ProfilePage.tsx
import React, { useState } from 'react';

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const ProfilePage: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/path-to-profile-image.jpg" 
              alt="User Profile" 
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              <input
                type="tel"
                name="phone"
                value={userDetails.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="address"
                value={userDetails.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded">Save</button>
              <button type="button" className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;