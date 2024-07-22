import React from 'react';
import FleetsAPI from '../features/fleets/fleetsAPI'; // Assuming you have created FleetsAPI
import { NavLink } from 'react-router-dom';
import { RiApps2AddFill } from "react-icons/ri";
import Navigation from './navigation';
import { toast } from 'sonner';
import { SyncLoader } from 'react-spinners';

const FleetsTable: React.FC = () => {
  const { data: fleets, error, isLoading } = FleetsAPI.useGetFleetsQuery();
  const [deleteFleet] = FleetsAPI.useDeleteFleetMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteFleet(id).unwrap();
      toast.success('Fleet deleted successfully');
    } catch (error) {
      toast.error('Error deleting fleet');
    }
  };

  if (isLoading) return (
    <SyncLoader
          color="#116696"
          loading={isLoading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        />
  ); 
  if (error) return <p>Error loading fleets.</p>;

  return (
    <div className='flex bg-gray-100 gap-10'>
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl text-black font-bold mb-5">Fleets Data</h2>
        <table className="min-w-full bg-cards">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-300">ID</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Fleet Name</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Vehicle</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Acquisition Date</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Depreciation Rate</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Current Value</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Maintenance Cost</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Status</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fleets?.map((fleet) => (
              <tr key={fleet.fleet_id}>
                <td className="py-2 px-4 border-b">{fleet.fleet_id}</td>
                <td className="py-2 px-4 border-b">{fleet.fleet_name}</td>
                <td className="py-2 px-4 border-b">{fleet.vehicle.vehicleSpec.model}</td>
                <td className="py-2 px-4 border-b">{new Date(fleet.acquisition_date ).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{fleet.depreciation_rate}</td>
                <td className="py-2 px-4 border-b">{fleet.current_value}</td>
                <td className="py-2 px-4 border-b">{fleet.maintenance_cost}</td>
                <td className="py-2 px-4 border-b">{fleet.fleetManagement_status}</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">View Details</button>
                  <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-2"
                    onClick={() => handleDelete(fleet.fleet_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={9} className="py-2 px-4">
                {fleets?.length} {fleets?.length === 1 ? 'record' : 'records'}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="mt-10 flex">
          <NavLink to="/create-fleet" className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-blue-600">
            <RiApps2AddFill /> Add Fleet
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default FleetsTable;
