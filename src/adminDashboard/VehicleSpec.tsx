import { NavLink } from "react-router-dom";
import VspecAPI from "../features/Vspec/vspecAPI";
import Navigation from "./navigation";
import {  toast } from 'sonner';
import { RiApps2AddFill } from "react-icons/ri";
import { SyncLoader } from "react-spinners";

const VehicleSpec = () => {
    const { data: Vspec, isLoading, isError } = VspecAPI.useGetVspecQuery();
    const [deleteBooking] = VspecAPI.useDeleteVspecMutation();

    console.log("Vspec: ", Vspec);

    const handleDelete = async (id: number) => {
        try {
            await deleteBooking(id).unwrap();
            toast.success('Booking deleted successfully');
          } catch (error) {
              toast.error('Error deleting booking');
          }
      };
   
      if (isLoading) return <p>
      <SyncLoader
            color="#116696"
            loading={isLoading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
      </p>;
    if (isError) return <p>Error loading vehicle specifications.</p>;

    return (
        <div className='flex bg-gray-100  gap-10'>
       <Navigation/> 
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Vehicle Specifications</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Vspec?.map((spec) => (
                    <div key={spec.vehicleSpec_id} className="bg-secondary text-white shadow-md rounded-lg p-4 border">
                        <p className="text-gray-100 mb-2"><strong>Color:</strong> {spec.color}</p>
                        <p className="text-gray-100 mb-2"><strong>Engine Capacity:</strong> {spec.engine_capacity}</p>
                        <p className="text-gray-100 mb-2"><strong>Fuel Type:</strong> {spec.fuel_type}</p>
                        <p className="text-gray-100 mb-2"><strong>Manufacturer:</strong> {spec.manufacturer}</p>
                        <p className="text-gray-100 mb-2"><strong>Model:</strong> {spec.model}</p>
                        <p className="text-gray-100 mb-2"><strong>Seating Capacity:</strong> {spec.seating_capacity}</p>
                        <p className="text-gray-100 mb-2"><strong>Transmission:</strong> {spec.transmission}</p>
                        <p className="text-gray-100 mb-2"><strong>Features:</strong> {spec.features}</p>
                        <p className="text-gray-100 mb-2"><strong>Year:</strong> {spec.year}</p>
                        <div className="flex justify-end mt-4">
                        </div>
                        <button className="bg-red-500 text-white mt-4 py-2 px-3 rounded hover:bg-blue-600  "
                           onClick={() => handleDelete(spec.vehicleSpec_id)}>Delete </button>

                    </div>
                ))}
            </div>
            <div className="flex mt-10">
            <NavLink to ="/addVspec" className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-blue-600 "> 
             <RiApps2AddFill /> Create Specification</NavLink>
            </div>
        </div>
    </div>
    );
};

export default VehicleSpec;
