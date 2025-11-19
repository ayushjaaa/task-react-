import React from 'react';
import { LogOut, Edit, Phone, Mail, Award, Calendar, QrCode, Lock } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const ProfileScreen = () => {
    const { playerData, setActiveView ,registrationData} = useAppContext();
    console.log(registrationData)

    return (
        <div className="p-6 bg-secondary min-h-full">
            <h1 className="text-2xl text-center font-bold text-gray-800 mb-6">My Profile</h1>

            <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                    <div className="w-28 h-28 rounded-full bg-gray-300 border-4 border-white shadow-md">
                        {/* Placeholder for profile picture */}
                    </div>
                </div>
                <h2 className="text-xl font-bold text-gray-800">{registrationData.fullName}</h2>
                <p className="text-gray-500">{`${registrationData.sportCategory} • ${playerData.category}`}</p>
                <button  onClick={()=>setActiveView('editprofile')} className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary bg-white px-4 py-2 rounded-full shadow-soft">
                    <Edit size={16} /> Edit Profile
                </button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-soft p-6 mb-4">
                <InfoItem label="Phone Number" value={registrationData.number} />
                <InfoItem label="Email Address" value={registrationData.email} />
                <InfoItem label="Sport & Category" value={`${playerData.sport} - ${playerData.category}`} />
            </div>

            <div className="bg-white rounded-2xl shadow-soft p-4">
                <ActionItem icon={Calendar} label="View My Schedule" onClick={() => setActiveView('sports')} />
                <ActionItem icon={QrCode} label="My QR Code" onClick={() => {}} />
                <ActionItem icon={Lock} label="Change Password" onClick={() => {}} />
            </div>
            
            <button onClick={()=>setActiveView('logout')} className="w-full mt-6 bg-red-100 text-red-600 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-200">
                <LogOut size={18} /> Logout
            </button>
        </div>
    );
};

const InfoItem = ({ label, value }: { label: string, value: string }) => (
    <div className="mb-4 last:mb-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
    </div>
);

const ActionItem = ({ icon: Icon, label, onClick }: { icon: React.ElementType, label: string, onClick: () => void }) => (
    <button onClick={onClick} className="w-full flex items-center gap-4 p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
        <Icon size={20} />
        <span className="font-semibold">{label}</span>
    </button>
)

export default ProfileScreen;
