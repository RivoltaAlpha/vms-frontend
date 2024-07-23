// components/CreateUserForm.tsx
import React, { useState } from 'react';
import usersAPI from '../features/users/usersAPI';
import { toast } from 'sonner';
import { NavLink } from 'react-router-dom';
import { User } from '../types/types';



const CreateUserForm = () => {
    const [createUser] = usersAPI.useCreateUserMutation();
    const [formData, setFormData] = useState<User>({
        first_name: '',
        last_name: '',
        username: '',
        contact_phone: '',
        email: '',
        address: '',
        password: '',
        role: 'admin',
        image_url: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await createUser({ ...formData }).unwrap();
            console.log(response);
            toast.success('User created successfully');
            setFormData({
                first_name: '',
                last_name: '',
                username: '',
                contact_phone: '',
                email: '',
                address: '',
                password: '',
                role: 'admin',
                image_url: '',
            });
        } catch (error) {
            console.error(error);
            toast.error('Failed to create user');
        }
    };

    return (
        <div className="w-[900px] mx-auto mt-10 p-6 mb-12 bg-secondary text-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-5">Create Admin User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="first_name" className="block mb-2">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="last_name" className="block mb-2">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="username" className="block mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="contact_phone" className="block mb-2">Contact Phone</label>
                    <input
                        type="text"
                        id="contact_phone"
                        name="contact_phone"
                        value={formData.contact_phone}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block mb-2">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    />
                </div>
                <div className='flex justify-between'>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Create
                    </button>
                    <NavLink to="/admin/users">
                        <button type="button" className="bg-base text-white py-2 px-4 rounded hover:bg-blue-600">
                            Back
                        </button>
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default CreateUserForm;
