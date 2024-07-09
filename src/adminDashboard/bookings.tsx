const BookingsTable = () => {
  // Sample data - replace with actual data fetching logic
  const bookings = [
    { id: 2, table: 'TBL-1', capacity: '1 - 4', location: 'Main Dining Room', type: 'Square - Medium', seats: 5 },
    // ... more bookings
  ];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <h2 className="text-xl font-semibold p-4">User Bookings</h2>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {['ID', 'Table', 'Capacity', 'Location', 'Type', 'Seats', 'Actions'].map((header) => (
              <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="px-6 py-4 whitespace-nowrap">{booking.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.table}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.capacity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.location}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.seats}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;