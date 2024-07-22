import React from 'react';
import locationsAPI from '../features/locations/locationsAPI';
import Navigation from './navigation';
import { useNavigate } from 'react-router-dom';
import { RiApps2AddFill } from 'react-icons/ri';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setLocation } from '../features/locations/locationSlice';
import { TLocation } from '../types/types';
import { SyncLoader } from 'react-spinners';

const LocationsTable: React.FC = () => {
  const { data: locations, error, isLoading } = locationsAPI.useGetLocationsQuery();
  console.log('Location ID:', locations);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //handle update location by setting it to local storage
  const handleUpdate = (location: TLocation) => {
    dispatch (setLocation( location as any));
    localStorage.setItem('selectedlocation', JSON.stringify(location));
    navigate(`/updateBranch/${location.location_id}`);
  };

  // handle delete location
  const [deleteLocation ] = locationsAPI.useDeleteLocationMutation();
  const handleDelete = async (location_id: number) => {
    try {
      await deleteLocation(location_id).unwrap();
      toast.success('Location deleted successfully');
    } catch (error) {
      toast.error('Error deleting location');
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
  if (error) return <p>Error loading locations.</p>;

  return (
    <div className='flex'>
       <Navigation/> 
      <div className="container mt-10 p-[200px]  mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-5">Locations Data</h2>
        <table className="min-w-full  bg-cards">
          <thead>
            <tr>

              <th className="py-2 px- border-b-2 border-gray-300"> Location ID </th>
              <th className="py-2 px- border-b-2 border-gray-300">Location Name</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">City</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Address</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Contact Phone</th> 
              <th className="py-2 px-4 border-b-2 border-gray-300">Actions</th> 

            </tr>
          </thead>
          <tbody>
            {locations?.map((location) => (
              <tr key={location.location_id}>
                <td className="py-2 px-4 border-b">{location.location_id}</td>
                <td className="py-2 px-4 border-b">{location.name}</td>
              <td className="py-2 px-4 border-b">{location.city}</td>
                <td className="py-2 px-4 border-b">{location.address}</td>
                <td className="py-2 px-4 border-b">{location.contact_phone}</td>
                <td className="py-2 px-4 border-b flex gap-4">
                  <button
                    className="bg-secondary text-white py-3 gap-2 px-3 flex  rounded hover:bg-blue-600"
                    onClick={() => handleUpdate(location)}>
                   Update
                  </button>
                  <button
                    className="bg-rose-600 text-white py-3 gap-2 px-3 flex  rounded hover:bg-blue-600"
                    onClick = {() => handleDelete(location.location_id)}
                  >
                    Delete
                  </button>
                </td> 
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7} className=" py-4 px-4 ">
                {locations?.length} {locations?.length === 1 ? 'record' : 'records'}
              </td>
            </tr>
          </tfoot>
        </table>
        <button className="bg-secondary mt-10 text-white py-3 gap-2 px-3 flex  rounded hover:bg-blue-600"
        onClick={() => navigate('/addBranch')} >  <RiApps2AddFill /> New branch</button>
      </div>
    </div>
  );
};

export default LocationsTable;
