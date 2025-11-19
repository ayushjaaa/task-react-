import React from 'react';
import { Calendar, BedDouble, Utensils, User, Trophy, BookMarked, Bell } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const DashboardScreen = () => {
    const { setActiveView, lodgingInfo } = useAppContext();
    const upcomingMatch = { time: "2:30 PM" }; // dummy data from mockup
    const todaysMeal = { name: "Breakfast", time: "7-9 AM" }; // dummy data

    

    return (
        <div className="p-6 bg-secondary">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800"></h1>
                    <p className="text-gray-600">Welcome back, Athlete!</p>
                </div>
                <div className="relative">
                    <Bell className="text-gray-600" size={26} />
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-secondary"></div>
                </div>
            </header>

            <main>
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Today's Overview</h2>
                        <button className="text-sm font-medium text-primary">View All Reports</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <OverviewCard icon={Calendar} title="Next Match" value={upcomingMatch.time} />
                        <OverviewCard icon={BedDouble} title="Your Room" value={lodgingInfo.roomNumber} />
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-soft flex items-center gap-4">
                        <div className="bg-primary-light p-3 rounded-full">
                            <Utensils className="text-primary" size={22} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Today's Meal</p>
                            <p className="font-bold text-gray-800 text-lg">{todaysMeal.name}: {todaysMeal.time}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Access</h2>
                    <div className="space-y-3">
                       <QuickAccessCard 
                            icon={User} 
                            title="My Profile" 
                            subtitle="View and edit your details" 
                            onClick={() => setActiveView('profile')}
                            highlighted={true}
                        />
                       <QuickAccessCard 
                            icon={Trophy} 
                            title="My Sports & Matches" 
                            subtitle="View schedule and results" 
                            onClick={() => setActiveView('sports')}
                        />
                       <QuickAccessCard 
                            icon={BedDouble} 
                            title="Lodging Details" 
                            subtitle="Room info and roommates" 
                            onClick={() => setActiveView('bookings')}
                        />
                       <QuickAccessCard 
                            icon={Utensils} 
                            title="Food Menu" 
                            subtitle="Daily meal schedule" 
                            onClick={() => setActiveView('bookings')}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

interface OverviewCardProps {
    icon: React.ElementType;
    title: string;
    value: string;
}
const OverviewCard: React.FC<OverviewCardProps> = ({ icon: Icon, title, value }) => (
    <div className="bg-white p-4 rounded-2xl shadow-soft">
        <div className="flex items-center gap-3 mb-2">
            <Icon size={16} className="text-gray-500" />
            <p className="text-sm text-gray-500">{title}</p>
        </div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
);

interface QuickAccessCardProps {
    icon: React.ElementType;
    title: string;
    subtitle: string;
    onClick: () => void;
    highlighted?: boolean;
}
const QuickAccessCard: React.FC<QuickAccessCardProps> = ({ icon: Icon, title, subtitle, onClick, highlighted }) => (
    <button 
        onClick={onClick}
        className={`w-full p-4 rounded-2xl shadow-soft flex items-center gap-4 text-left ${highlighted ? 'bg-primary text-white' : 'bg-white text-gray-800'}`}
    >
        <div className={`p-3 rounded-full ${highlighted ? 'bg-white/20' : 'bg-primary-light'}`}>
            <Icon size={24} className={highlighted ? 'text-white' : 'text-primary'} />
        </div>
        <div>
            <p className={`font-semibold ${highlighted ? 'text-white' : 'text-gray-800'}`}>{title}</p>
            <p className={`text-sm ${highlighted ? 'text-white/80' : 'text-gray-500'}`}>{subtitle}</p>
        </div>
    </button>
);


export default DashboardScreen;
