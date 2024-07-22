import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ticketsAPI from '../features/tickets/ticketsAPI';
import Navigation from './navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useDispatch } from 'react-redux';
import { clearTicket } from '../features/tickets/ticketSlice';

const CreateTicket: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.userAuth);
  const user_id = user?.user_id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [createTicket] = ticketsAPI.useGenerateTicketMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTicket = {user_id, subject, description };
      await createTicket(newTicket).unwrap();
      dispatch(clearTicket());
      navigate('/user-tickets'); // Navigate to tickets page after successful creation
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };


  return (
    <div className='flex'>
      <Navigation />
      <div className="container mt-10 mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-5">Create New Ticket</h2>
        <form onSubmit={handleSubmit} className="bg-cards p-4 rounded">
          <div className="mb-4">
            <label className="block text-black">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 block w-full text-black rounded border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full text-black rounded border-gray-300"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-secondary text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
