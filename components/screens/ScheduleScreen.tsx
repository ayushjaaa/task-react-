import React, { useState } from 'react';


import { ArrowLeft, MapPin, Calendar, Users, Trophy, Trash, Edit } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Match, MatchStatus, Teammate } from '../../types';

const ScheduleScreen = () => {
    const { matches, selectedMatch, setSelectedMatch ,setActiveView} = useAppContext();
    console.log(matches)
    const [showAddForm, setShowAddForm] = useState(false);

    if (selectedMatch) {
        return <MatchDetailView match={selectedMatch} onBack={() => setSelectedMatch(null)} />;
    }

    return (
        <div className="p-6 bg-secondary">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Sports & Matches</h1>
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                <FilterButton label="All Sports" active={true} />
                <FilterButton label="Today" />
                <FilterButton label="Upcoming" />
                <FilterButton label="Completed" />
            </div>
            <button onClick={()=>setActiveView('addmatch')} className="w-full bg-primary text-white font-semibold py-3 rounded-2xl shadow-md hover:bg-primary-dark mb-6">
                + Register for New Sport
            </button>
            <div className="space-y-4">
                {matches.map(match => (
                    <MatchCard  key={match.id} match={match} onClick={() => setSelectedMatch(match)} />
                ))}
            </div>
        </div>
    );
};

const FilterButton = ({ label, active }: { label: string, active?: boolean }) => (
    <button className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${active ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}>
        {label}
    </button>
);

const MatchCard: React.FC<{ match: Match, onClick: () => void }> = ({ match, onClick }) => {
    const statusStyles: { [key in MatchStatus]: string } = {
        Completed: 'bg-green-100 text-green-800',
        Upcoming: 'bg-orange-100 text-orange-800',
    };
    return (
        <button onClick={onClick} className="w-full bg-white p-4 rounded-2xl shadow-soft text-left ">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <p className="font-bold text-lg text-gray-800">{match.sport}</p>
                    <p className="text-sm text-gray-500">{match.category}</p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[match.status]}`}>{match.status}</span>
            </div>
            <div className="space-y-2 text-gray-600">
                <InfoRow icon={Calendar} text={`${match.date}, ${match.time}`} />
                <InfoRow icon={MapPin} text={match.venue} />
                <InfoRow icon={Trophy} text={`vs ${match.opponent}`} />
            </div>
        </button>
    );
};

const InfoRow = ({ icon: Icon, text }: { icon: React.ElementType, text: string }) => (
    <div className="flex items-center gap-3">
        <Icon size={16} className="text-primary" />
        <span className="text-sm">{text}</span>
    </div>
);


export const MatchDetailView = ({ match, onBack }: { match: Match; onBack: () => void; }) => {
  return (
    <div className="bg-secondary min-h-full">
      <div className="p-6">
        <div className="relative flex items-center justify-center mb-6">
            <button onClick={onBack} className="absolute left-0 text-gray-600"><ArrowLeft size={24} /></button>
            <h1 className="text-xl font-bold text-gray-800">Match Details</h1>
        </div>
      </div>
      
      <div className="bg-primary p-6 rounded-t-3xl text-white">
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-2xl font-bold">{match.sport}</h2>
                <p className="opacity-80">{match.category}</p>
            </div>
            <span className="bg-white/20 text-xs font-medium px-3 py-1 rounded-full">{match.status}</span>
        </div>
        <p className="text-center text-sm opacity-80 mt-6">Your Team vs</p>
        <p className="text-center text-3xl font-bold">{match.opponent}</p>
      </div>

      <div className="bg-white p-6 rounded-b-3xl -mt-4 shadow-soft">
        <div className="grid grid-cols-2 gap-4">
            <DetailItem icon={Calendar} label="Date & Time" value={`${match.date}, ${match.time}`} />
            <DetailItem icon={MapPin} label="Venue" value={match.address} />
        </div>
      </div>
      
      {match.teammates && (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2"><Users size={20}/> Team Members</h3>
                <span className="text-sm font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">{match.teammates.length}</span>
            </div>
            <div className="space-y-3">
                {match.teammates.map(member => <TeammateCard key={member.initials} member={member} />)}
            </div>
        </div>
      )}
      
      <div className="p-6 sticky bottom-0 bg-secondary">
        <div className="flex flex-col gap-3">
            <button className="w-full bg-primary text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2">
                <Edit size={18} /> Edit Match Details
            </button>
            <button className="w-full bg-red-500 text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2">
                <Trash size={18} /> Withdraw from Match
            </button>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string; }) => (
  <div className="bg-secondary p-4 rounded-2xl">
    <div className="flex items-center gap-2 text-gray-500 mb-1">
        <Icon size={16} />
        <p className="text-sm">{label}</p>
    </div>
    <p className="font-bold text-gray-800">{value}</p>
  </div>
);

const TeammateCard = ({ member }: { member: Teammate }) => (
    <div className="bg-white p-3 rounded-2xl shadow-soft flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary-light text-primary font-bold flex items-center justify-center">
            {member.initials}
        </div>
        <p className="font-semibold text-gray-800">{member.name}</p>
    </div>
);

export default ScheduleScreen;
