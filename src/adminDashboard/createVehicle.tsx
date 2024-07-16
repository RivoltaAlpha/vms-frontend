import React, { useState } from 'react';
import VspecAPI from "../features/Vspec/vspecAPI";
import VehiclesAPI from '../features/vehicles/vehicleAPI'; 
import { toast } from 'sonner';
import { NavLink } from 'react-router-dom';

const CreateVehicleForm = () => {
    const [createVehicle ] = VehiclesAPI.useCreatevehicleMutation();
    const { data: vspecs, isLoading: vspecLoading, isError: vspecError } = VspecAPI.useGetVspecQuery();
    const [formData, setFormData] = useState({
        vehicleSpec_id: '',
        rental_rate: 0,
        availability: true,
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
            const response = await createVehicle(formData).unwrap();
            console.log(response);
            toast.success('Vehicle created successfully');
            setFormData({
                vehicleSpec_id: '',
                rental_rate: 0,
                availability: true,
            });
        } catch (error) {
            console.error(error);
            toast.error('Failed to create vehicle');
        }
    };

    if (vspecLoading) return <p>Loading...</p>;
    if (vspecError) return <p>Error loading vehicle specifications.</p>;

    return (
        <div className="w-[900px] mx-auto mt-10 p-6 mb-12 bg-secondary text-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-5">Create Vehicle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="vehicleSpec_id" className="block mb-2">Vehicle Specification</label>
                    <select
                        id="vehicleSpec_id"
                        name="vehicleSpec_id"
                        value={formData.vehicleSpec_id}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    >
                        <option value="">Select a specification</option>
                        {vspecs?.map((vspec) => (
                            <option key={vspec.vehicleSpec_id} value={vspec.vehicleSpec_id}>
                                {vspec.manufacturer} {vspec.model} ({vspec.year})
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="rental_rate" className="block mb-2">Rental Rate</label>
                    <input
                        type="number"
                        id="rental_rate"
                        name="rental_rate"
                        value={formData.rental_rate}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="availability" className="block mb-2">Availability</label>
                    <select
                        id="availability"
                        name="availability"
                        value={formData.availability.toString()}
                        onChange={handleChange}
                        className="w-full text-black p-2 border rounded"
                        required
                    >
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                    </select>
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        Create
                    </button>
                    <NavLink to="/vehicles">
                        <button type="button" className="bg-base text-white py-2 px-4 rounded hover:bg-blue-600">
                            Back
                        </button>
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default CreateVehicleForm;
