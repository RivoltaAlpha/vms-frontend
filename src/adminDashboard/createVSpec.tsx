import React, { useState } from 'react';
import VspecAPI from "../features/Vspec/vspecAPI";
import { toast } from 'sonner';
import { NavLink } from 'react-router-dom';

const CreateVspecForm = () => {
    const [createSpec] = VspecAPI.useCreateVspecMutation();
    const [formData, setFormData] = useState({
        color: '',
        engine_capacity: 0,
        fuel_type: '',
        manufacturer: '',
        model: '',
        seating_capacity: 0,
        transmission: '',
        features: [],
        year: 0,
        image_url: '',
    });

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
            const response = await createSpec(formData).unwrap();
            console.log(response);
            toast.success('Vehicle specification created successfully');
            setFormData({
                color: '',
                engine_capacity: 0,
                fuel_type: '',
                manufacturer: '',
                model: '',
                seating_capacity: 0,
                transmission: '',
                features: [],
                year: 0,
                image_url: '',
            });
        } catch (error) {
            console.error(error);
            toast.error('Failed to create vehicle specification');
        }
    };

    return (
        <div className="w-[900px] mx-auto mt-10 p-6 mb-12 bg-secondary  text-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-5">Create Vehicle Specification</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="color" className="block  mb-2">Color</label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="engine_capacity" className="block mb-2">Engine Capacity</label>
                    <input
                        type="number"
                        id="engine_capacity"
                        name="engine_capacity"
                        value={formData.engine_capacity}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="fuel_type" className="block mb-2">Fuel Type</label>
                    <input
                        type="text"
                        id="fuel_type"
                        name="fuel_type"
                        value={formData.fuel_type}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="manufacturer" className="block mb-2">Manufacturer</label>
                    <input
                        type="text"
                        id="manufacturer"
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="model" className="block mb-2">Model</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="seating_capacity" className="block mb-2">Seating Capacity</label>
                    <input
                        type="number"
                        id="seating_capacity"
                        name="seating_capacity"
                        value={formData.seating_capacity}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="transmission" className="block text-black mb-2">Transmission</label>
                    <input
                        type="text"
                        id="transmission"
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="features" className="block mb-2">Features</label>
                    <input
                        type="text"
                        id="features"
                        name="features"
                        value={formData.features}
                        onChange={handleChange}
                        className="w-full  text-black  text-blackp-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="year" className="block mb-2">Year</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block mb-2">Image</label>
                    <input
                        type="text"
                        id="image"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    />
                </div>
                <div className=' flex justify-between'>
                <button type="submit" className=" bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Create
                </button>
                <NavLink to="/admin/vspec">
                <button type="submit" className=" bg-base text-white py-2 px-4 rounded hover:bg-blue-600">
                    Back
                </button>
                </NavLink>
                </div>
            </form>
        </div>
    );
};

export default CreateVspecForm;
