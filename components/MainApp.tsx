import React, { useState, useEffect } from 'react';
import { Home, Trophy, Users, BookMarked, User as ProfileIcon, Bell } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import DashboardScreen from './screens/DashboardScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import BookingsScreen from './screens/BookingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import MembersScreen from './screens/MembersScreen';
import { MainView } from '../types';
import EditProfile from './screens/EditProfile';
import LogoutPage from './screens/LogoutPage';
import RegistrationFlow from './screens/RegistrationFlow';
import LoginScreen from './screens/LoginScreen';
import AddMatchForm from './screens/AddMatchForm';

const DateTimeHeader = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timerId);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <header className="px-6 pt-12 pb-4 bg-secondary">
      <p className="text-sm font-medium text-gray-500">{formattedDate}</p>
      <p className="text-3xl font-bold text-primary">{formattedTime}</p>
    </header>
  );
};


const MainApp = () => {
  const { activeView, setActiveView } = useAppContext();


  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return <DashboardScreen />;
      case 'sports':
        return <ScheduleScreen />;
      case 'members':
        return <MembersScreen />;
      case 'bookings':
        return <BookingsScreen />;
      case 'profile':
        return <ProfileScreen />;
        case 'editprofile':
return <EditProfile/>
case 'logout':
  return <LogoutPage/>
  case'register':
  return <RegistrationFlow/>
  case 'login':
    return <LoginScreen/>
case 'addmatch':
  return <AddMatchForm/>

      default:
        return <DashboardScreen />;
    }
  };

  const NavItem = ({ view, icon: Icon, label }: { view: MainView, icon: React.ElementType, label: string }) => {
    const isActive = activeView === view;
    return (
      <button onClick={() => setActiveView(view)} className={`flex  flex-col items-center justify-center w-1/5 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-400'}`}>
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
        <span className={`text-xs mt-1 font-semibold ${isActive ? 'text-primary' : 'text-gray-500'}`}>{label}</span>
      </button>
    );
  };

  return (
    <div className="h-full flex flex-col bg-secondary">
      <DateTimeHeader />
       <main className="flex-grow overflow-y-auto pb-20">
        {renderActiveView()}
      </main>
      <footer className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200 flex items-center justify-evenly shadow-soft z-10 p-3 rounded-t-2xl">
  <NavItem view="home" icon={Home} label="Home" />
  <NavItem view="sports" icon={Trophy} label="Sports" />
  <NavItem view="members" icon={Users} label="Members" />
  <NavItem view="bookings" icon={BookMarked} label="Bookings" />
  <NavItem view="profile" icon={ProfileIcon} label="Profile" />
</footer>


    </div>
  );
};

export default MainApp;