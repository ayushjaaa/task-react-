import React from 'react';
import { useAppContext } from '@/context/AppContext';

const LogoutPage: React.FC = () => {
  const { setRegistrationData, setActiveView} = useAppContext();

  const handleLogout = () => {
   
    setRegistrationData(null);


    localStorage.removeItem('formdata');

    alert('You have been logged out successfully! ✅');
    setActiveView('login')
    


  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Are you sure you want to log out?</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition-colors"
      >
        Log Out
      </button>
    </div>
  );
};

export default LogoutPage;
