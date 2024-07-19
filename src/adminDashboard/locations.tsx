import React from 'react';
import locationsAPI from '../features/locations/locationsAPI';
import Navigation from './navigation';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { Location } from '../types/types';

const LocationsTable: React.FC = () => {
  const { data: locations, error, isLoading } = locationsAPI.useGetLocationsQuery();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleViewDetails = (location: Location) => {
//     dispatch(setLocation(location));
//     localStorage.setItem('selectedLocation', JSON.stringify(location));
//     navigate(`/location/${location.location_id}`);
//   };

  if (isLoading) return <p>Loading...</p>;
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
        <button className="bg-secondary mt-10 text-white py-1 px-3 rounded hover:bg-blue-600"
                >Add Location</button>
      </div>
    </div>
  );
};

export default LocationsTable;
