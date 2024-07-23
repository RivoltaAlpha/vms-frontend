import React, { useState } from 'react';
import locationsAPI from '../features/locations/locationsAPI'; 
import { toast } from 'sonner';
import { NavLink, useNavigate } from 'react-router-dom';

const CreateLocationForm: React.FC = () => {
    const [createLocation] = locationsAPI.useCreateLocationMutation();
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        address: '',
        contact_phone: '',
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await createLocation(formData).unwrap();
            console.log(response);
            toast.success('Location created successfully');
            setFormData({
                name: '',
                city: '',
                address: '',
                contact_phone: '',
            });
            navigate('/admin/branches');
        } catch (error) {
            console.error(error);
            toast.error('Failed to create location');
        }
    };

    return (
        <div className="w-[900px] mx-auto mt-10 p-6 mb-12 bg-secondary text-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-5">Create Location</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-2">Location Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city" className="block mb-2">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
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
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Create
                    </button>
                    <NavLink to="/users/branches">
                        <button
                            type="button"
                            className="bg-base text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Back
                        </button>
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default CreateLocationForm;
