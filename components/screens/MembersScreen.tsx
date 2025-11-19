import React from 'react';
import { Users } from 'lucide-react';

const MembersScreen = () => {
  return (
    <div className="p-6 bg-secondary min-h-full flex flex-col items-center justify-center text-center">
      <Users size={48} className="text-gray-400 mb-4" />
      <h1 className="text-2xl font-bold text-gray-800">Members</h1>
      <p className="text-gray-500 mt-2">This section is under construction.</p>
      <p className="text-gray-500">You'll soon be able to see and manage team members here.</p>
    </div>
  );
};

export default MembersScreen;
