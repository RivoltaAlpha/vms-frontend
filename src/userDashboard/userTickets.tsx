import React from 'react';
import { NavLink } from 'react-router-dom';
import ticketsAPI from '../features/tickets/ticketsAPI';
import Navigation from './navigation';
import { RiApps2AddFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { toast } from 'sonner';
import { SyncLoader } from 'react-spinners';


const UserTickets: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.userAuth);
  const user_id = user?.user_id;
  const { data: tickets, error, isLoading } = ticketsAPI.useGetUserTicketsQuery(user_id || 0);
  console.log(user_id);
  const [deleteTicket] = ticketsAPI.useDeleteTicketMutation();
  // handle cancel or delete ticket
  const handleCancelTicket = async (ticket_id: number) => {
    try {
      await deleteTicket(ticket_id).unwrap();
      toast.success('Ticket canceled successfully');
      console.log('Ticket canceled successfully');
    } catch (error) {
      toast.error('Error canceling ticket');
      console.error('Error canceling ticket:', error);
    }
  };

    // Conditional rendering for loading and error states
    if (isLoading) return <p>
    <SyncLoader
      color="#116696"
      loading={isLoading}
      size={20}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </p>;
  if (error) return <p>Error loading data.</p>;


  return (
    <div className='flex'>
      <Navigation />
      <div className="container mt-10 mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-5">My Tickets</h2>
        <div className=" p-4 rounded">
          {tickets && tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div key={ticket.ticket_id} className="mb-4 p-4 bg-cards border rounded">
                <p><strong>Subject:</strong> {ticket.subject}</p>
                <p><strong>Description:</strong> {ticket.description}</p>
                <p><strong>Status:</strong> {ticket.ticket_status}</p>
                <button
                  className="mt-2 bg-secondary text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => handleCancelTicket(ticket.ticket_id)}
                >
                  Cancel Ticket
                </button>
              </div>
            ))
          ) : (
            <p>No tickets found.</p>
          )}
        </div>
      <div className=" mt-10 flex ">
        <NavLink to ="/createTicket" className="bg-secondary text-white py-2 px-4 rounded-md hover:bg-blue-600 ">  <RiApps2AddFill /> New Ticket</NavLink>
        </div>
      </div>

    </div>
  );
};

export default UserTickets;
