import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import locationsAPI from '../features/locations/locationsAPI'; 
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { removeLocation } from '../features/locations/locationSlice';

const UpdateLocationForm: React.FC = () => {
    const navigate = useNavigate();
    const location_id = JSON.parse(localStorage.getItem('selectedlocation') || '{}').location_id;
    console.log('Location ID:', location_id);
    const { data: location, isLoading: isLoadingLocation, isError: isErrorLocation } = locationsAPI.useGetLocationQuery(location_id);
    console.log('Location:', location);
    const [updateLocation] = locationsAPI.useUpdateLocationMutation();
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        address: '',
        contact_phone: '',
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (location) {
            setFormData({
                name: location.name,
                city: location.city,
                address: location.address,
                contact_phone: location.contact_phone,
            });
        }
    }, [location]);

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
            const response = await updateLocation({ location_id: location_id, 
                data: formData
            }).unwrap();
            console.log(response);
            toast.success('Location updated successfully');
            dispatch (removeLocation());
            navigate('/branches'); // Redirect to locations list after successful update
        } catch (error) {
            console.error(error);
            toast.error('Failed to update location');
        }
    };

    if (isLoadingLocation) return <p>Loading location...</p>;
    if (isErrorLocation) return <p>Error loading location data.</p>;

    return (
        <div className="w-[900px] mx-auto mt-10 p-6 mb-12 bg-secondary text-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-5">Update Location</h2>
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
                        Update
                    </button>
                    <button
                        type="button"
                        className="bg-base text-white py-2 px-4 rounded hover:bg-blue-600"
                        onClick={() => navigate('/locations')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateLocationForm;
