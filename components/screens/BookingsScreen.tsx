import React, { useState } from 'react';
import { BedDouble, MapPin, Edit, UserPlus, Utensils, Clock, CheckCircle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Roommate, MenuItem } from '../../types';

const BookingsScreen = () => {
    const [view, setView] = useState<'lodging' | 'food'>('lodging');

    return (
        <div className="p-6 bg-secondary min-h-full">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">{view === 'lodging' ? 'Lodging Details' : 'Food Menu'}</h1>
            
            <div className="flex bg-white rounded-full p-1 mb-6 shadow-soft">
                <button onClick={() => setView('lodging')} className={`w-1/2 py-2.5 rounded-full text-sm font-semibold transition-all ${view === 'lodging' ? 'bg-primary text-white shadow' : 'text-gray-600'}`}>Lodging</button>
                <button onClick={() => setView('food')} className={`w-1/2 py-2.5 rounded-full text-sm font-semibold transition-all ${view === 'food' ? 'bg-primary text-white shadow' : 'text-gray-600'}`}>Food</button>
            </div>
            
            {view === 'lodging' ? <LodgingView /> : <FoodView />}
        </div>
    );
};

const LodgingView = () => {
    const { lodgingInfo } = useAppContext();
    return (
        <div>
            <div className="bg-orange-400 text-white p-6 rounded-2xl shadow-lg mb-6">
                <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                        <BedDouble size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{lodgingInfo.hotelName}</h2>
                        <p className="opacity-80">Room {lodgingInfo.roomNumber}</p>
                    </div>
                </div>
            </div>
            
            <InfoCard>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-semibold text-gray-800">{lodgingInfo.address}</p>
            </InfoCard>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <InfoCard>
                    <p className="text-sm text-gray-500">Check-in</p>
                    <p className="font-semibold text-gray-800">{lodgingInfo.checkIn}</p>
                </InfoCard>
                <InfoCard>
                    <p className="text-sm text-gray-500">Check-out</p>
                    <p className="font-semibold text-gray-800">{lodgingInfo.checkOut}</p>
                </InfoCard>
            </div>

            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Roommates</h3>
                <span className="text-sm font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">{lodgingInfo.roommates.length} people</span>
            </div>
            <div className="space-y-3 mb-6">
                {lodgingInfo.roommates.map(mate => <RoommateCard key={mate.initials} roommate={mate} />)}
            </div>
            
         <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">

  <button className="w-full bg-primary text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md hover:bg-primary-dark transition-colors duration-300">
    <Edit size={18} /> Edit Lodging Info
  </button>

  
  <button className="w-full bg-white text-primary border-2 border-primary font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 shadow-md hover:bg-primary hover:text-white transition-colors duration-300">
    <UserPlus size={18} /> Assign Player
  </button>
</div>
        </div>
    );
}

const FoodView = () => {
    const { foodMenu } = useAppContext();
    const [day, setDay] = useState<'today' | 'tomorrow'>('today');
    const menu = day === 'today' ? foodMenu.today : foodMenu.tomorrow;

    return (
         <div>
            <div className="bg-white p-6 rounded-2xl shadow-soft mb-6 flex items-center gap-4">
                <div className="bg-primary-light p-4 rounded-xl">
                    <Utensils size={28} className="text-primary" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Daily Meals</h2>
                    <p className="text-gray-500">All meals included</p>
                </div>
            </div>
             <div className="flex bg-white rounded-full p-1 mb-6 shadow-soft">
                <button onClick={() => setDay('today')} className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-all ${day === 'today' ? 'bg-primary-light text-primary' : 'text-gray-600'}`}>Today</button>
                <button onClick={() => setDay('tomorrow')} className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-all ${day === 'tomorrow' ? 'bg-primary-light text-primary' : 'text-gray-600'}`}>Tomorrow</button>
            </div>
            <div className="space-y-4">
                {menu.map(item => <FoodCard key={item.name} item={item} />)}
            </div>
             <button className="w-full mt-6 bg-white text-primary font-bold py-3 rounded-2xl shadow-soft">
                + Request Special Meal
            </button>
         </div>
    )
}

const InfoCard: React.FC<{children: React.ReactNode}> = ({children}) => (
    <div className="bg-white p-4 rounded-2xl shadow-soft mb-4">
        {children}
    </div>
);

const RoommateCard = ({ roommate }: { roommate: Roommate }) => (
    <div className="bg-white p-3 rounded-2xl shadow-soft flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary-light text-primary font-bold flex items-center justify-center">
            {roommate.initials}
        </div>
        <p className="font-semibold text-gray-800">{roommate.name}</p>
    </div>
);

const FoodCard = ({ item }: { item: MenuItem }) => {
    const isAvailable = item.status === 'Available Now';
    return (
        <div className="bg-white p-4 rounded-2xl shadow-soft">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                    {item.status}
                </span>
            </div>
            <p className="text-sm text-gray-500 flex items-center gap-2 mb-3"><Clock size={14}/> {item.time}</p>
            <div className="border-t pt-3 flex flex-wrap gap-2">
                {item.items.map(food => <span key={food} className="bg-secondary text-gray-700 px-3 py-1 text-sm rounded-full">{food}</span>)}
            </div>
        </div>
    )
};


export default BookingsScreen;
