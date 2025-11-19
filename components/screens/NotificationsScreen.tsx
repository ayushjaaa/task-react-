
import React from 'react';
import { Bell } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const NotificationsScreen = () => {
  const { notifications, setActiveView } = useAppContext();

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h1>
      <div className="space-y-4">
        {notifications.map(notif => (
          <button
            key={notif.id}
            onClick={() => setActiveView(notif.linkTo)}
            className={`w-full text-left bg-white p-4 rounded-2xl shadow-soft flex items-start gap-4 transition-opacity ${notif.read ? 'opacity-60' : ''}`}
          >
            <div className={`p-3 rounded-full flex-shrink-0 ${notif.read ? 'bg-gray-100' : 'bg-primary-light'}`}>
              <Bell className={notif.read ? 'text-gray-500' : 'text-primary'} size={24} />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">{notif.title}</p>
                <p className="text-xs text-gray-400">{notif.timestamp}</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
            </div>
            {!notif.read && <div className="w-2.5 h-2.5 bg-primary rounded-full flex-shrink-0 mt-1.5"></div>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NotificationsScreen;
