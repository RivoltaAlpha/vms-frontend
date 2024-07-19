import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ticketsAPI from '../features/tickets/ticketsAPI';
import Navigation from './navigation';
import { useDispatch } from 'react-redux';
import { clearTicket,  updateTicket } from '../features/tickets/ticketSlice';

const TicketReview: React.FC = () => {
  const navigate = useNavigate();
  const ticket_id = JSON.parse(localStorage.getItem('selectedticket') || '{}').ticket_id;
  const { data: ticket, error, isLoading } = ticketsAPI.useGetTicketByIdQuery(ticket_id);
  const [reviewTicket] = ticketsAPI.useReviewTicketMutation();
  const [ticketStatus, setTicketStatus] = useState(ticket?.ticket_status || '');
  const dispatch = useDispatch();

  useEffect(() => {
    if (ticket) {
      setTicketStatus(ticket.ticket_status);
    }
  }, [ticket]);

  // Handle update ticket status
  const data = JSON.parse(localStorage.getItem('selectedticket') || '{}');
  console.log('Data:', data);

  const handleUpdate = async () => {
  try{    
  const updatedTicket = { ...data, ticket_status: ticketStatus };
    const response = await dispatch(updateTicket(updatedTicket as any | null));
    console.log('Response:', response);
    reviewTicket(updatedTicket as any | null);
    // console.log('Ticket Status:', reviewTicket);
    dispatch( clearTicket());
    navigate('/tickets');
  }catch (error) {
    console.log('Error updating ticket:', error);
  }
  };


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading ticket.</p>;

  return (
    <div className='flex'>
      <Navigation />
      <div className="container m-[100px] px-4 py-8"> 
        <h2 className="text-2xl font-bold mb-5">Review Ticket</h2>
        <div className="bg-cards p-8 rounded">
          <p className='py-4'><strong>Ticket ID:</strong> {ticket?.ticket_id}</p>
          <p className='py-4'><strong>User ID:</strong> {ticket?.user?.username}</p>
          <p className='py-4'><strong>Subject:</strong> {ticket?.subject}</p>
          <p className='py-4'><strong>Description:</strong> {ticket?.description}</p>
          <label className="block mt-4">
            <span className="text-black font-bold">Status</span>
            <select
              value={ticketStatus}
              onChange={(e) => setTicketStatus(e.target.value)}
              className="mt-1 block py-4 w-full rounded border-gray-300"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </label>
          <button
            className="mt-4 bg-secondary text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleUpdate}
          >
            Update Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketReview;
