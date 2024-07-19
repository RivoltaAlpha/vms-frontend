import React from 'react';
import ticketsAPI from '../features/tickets/ticketsAPI';
import Navigation from './navigation';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { Tickets } from '../types/types';
import { setTicket } from '../features/tickets/ticketSlice';

const Tickets: React.FC = () => {
  const { data: tickets, error, isLoading } = ticketsAPI.useGetTicketsQuery();
  console.log(tickets);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReview = (ticket: Tickets) => {
    dispatch(setTicket(ticket));
    localStorage.setItem('selectedticket', JSON.stringify(ticket));
    navigate(`/ticketReview/${ticket.ticket_id}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading tickets.</p>;

  return (
    <div className='flex'>
       <Navigation/> 
      <div className="container mt-10  mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-5">Customer Support Tickets </h2>
        <table className="min-w-full bg-cards">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-300">ticket Id</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">User</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">subject</th>
              <th className="py-2 px-4 border-b-2 border-gray-300">Description </th> 
              <th className="py-2 px-4 border-b-2 border-gray-300">Status </th> 
              <th className="py-2 px-4 border-b-2 border-gray-300">Action </th> 
            </tr>
          </thead>
          <tbody>
            {tickets?.map((ticket: Tickets) => (
              <tr key={ticket.ticket_id}>
                <td className="py-2 px-4 border-b">{ticket.ticket_id}</td>
                <td className="py-2 px-4 border-b">{ticket.user.username}</td>
                <td className="py-2 px-4 border-b">{ticket.subject}</td>
                <td className="py-2 px-4 border-b">{ticket.description}</td>
                <td className="py-2 px-4 border-b">{ticket.ticket_status}</td>
                <td className="py-2 px-4 border-b">        
                    <button className="bg-secondary text-white py-1 px-3 border-b  rounded hover:bg-blue-600"
                    onClick={() => handleReview(ticket)} >Review Ticket</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7} className=" py-4 px-4 ">
                {tickets?.length} {tickets?.length === 1 ? 'record' : 'records'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Tickets;
