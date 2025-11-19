import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Teammate, Match } from '../../types';

const AddMatchForm: React.FC = () => {
  const { matches, setMatches, setActiveView } = useAppContext();

  const [newMatch, setNewMatch] = useState<Omit<Match, 'id'>>({
    sport: '',
    category: '',
    date: '',
    time: '',
    venue: '',
    address: '',
    opponent: '',
    status: 'Upcoming',
    teammates: [] as Teammate[],
  });

  const handleSubmit = () => {
    if (!newMatch.sport || !newMatch.category || !newMatch.date || !newMatch.time || !newMatch.venue || !newMatch.opponent) {
      alert('Please fill all fields');
      return;
    }

    const id = matches.length ? Math.max(...matches.map(m => m.id)) + 1 : 1;
    setMatches([...matches, { ...newMatch, id }]);
    setActiveView('sports'); 
  };

  const handleCancel = () => {
    setActiveView('sports');
  };

  return (
    <div className="p-4 mb-6 bg-white rounded-2xl shadow-soft">
      <h3 className="font-bold mb-4 text-gray-800">Add New Match</h3>
      <input
        type="text"
        placeholder="Sport"
        className="w-full p-2 mb-2 border rounded"
        value={newMatch.sport}
        onChange={(e) => setNewMatch({ ...newMatch, sport: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        className="w-full p-2 mb-2 border rounded"
        value={newMatch.category}
        onChange={(e) => setNewMatch({ ...newMatch, category: e.target.value })}
      />
      <input
        type="text"
        placeholder="Date"
        className="w-full p-2 mb-2 border rounded"
        value={newMatch.date}
        onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
      />
      <input
        type="text"
        placeholder="Time"
        className="w-full p-2 mb-2 border rounded"
        value={newMatch.time}
        onChange={(e) => setNewMatch({ ...newMatch, time: e.target.value })}
      />
      <input
        type="text"
        placeholder="Venue"
        className="w-full p-2 mb-2 border rounded"
        value={newMatch.venue}
        onChange={(e) => setNewMatch({ ...newMatch, venue: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        className="w-full p-2 mb-2 border rounded"
        value={newMatch.address}
        onChange={(e) => setNewMatch({ ...newMatch, address: e.target.value })}
      />
      <input
        type="text"
        placeholder="Opponent"
        className="w-full p-2 mb-2 border rounded"
        value={newMatch.opponent}
        onChange={(e) => setNewMatch({ ...newMatch, opponent: e.target.value })}
      />

      <div className="flex gap-2 mt-3">
        <button
          className="bg-primary text-white py-2 px-4 rounded flex-1"
          onClick={handleSubmit}
        >
          Add Match
        </button>
        <button
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded flex-1"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddMatchForm;
