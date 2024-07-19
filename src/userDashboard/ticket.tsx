import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ticketsAPI from '../features/tickets/ticketsAPI';
import Navigation from './navigation';

const CreateTicket: React.FC = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [createTicket] = ticketsAPI.useGenerateTicketMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTicket = { subject, description };
      await createTicket(newTicket).unwrap();
      navigate('/tickets'); // Navigate to tickets page after successful creation
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
            <label className="block text-gray-700">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 block w-full rounded border-gray-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded border-gray-300"
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
