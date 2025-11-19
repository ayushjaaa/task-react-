
import React, { useState } from 'react';
import { Plane, Calendar, MapPin, Phone, Edit, Save } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { TravelInfo } from '../../types';

const TravelDetailsScreen = () => {
  const { travelInfo, updateTravelInfo } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<TravelInfo>(travelInfo);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    updateTravelInfo(formData);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Travel Itinerary</h1>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-primary font-medium text-sm">
            <Edit size={16} /> Edit
          </button>
        )}
      </div>

      {showSuccess && (
        <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
          <span className="block sm:inline">Travel info updated successfully.</span>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-soft p-6">
        <div className="mb-4">
          <label className="text-sm text-gray-500 block">Mode of Transport</label>
          {isEditing ? (
            <select name="mode" value={formData.mode} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md bg-white">
              <option>Flight</option>
              <option>Train</option>
              <option>Bus</option>
            </select>
          ) : (
            <p className="font-semibold text-gray-800 flex items-center gap-2"><Plane size={18} className="text-primary"/> {formData.mode}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-gray-500 block">Arrival</label>
            {isEditing ? (
              <input type="text" name="arrivalDateTime" value={formData.arrivalDateTime} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
            ) : (
              <p className="font-semibold text-gray-800 flex items-center gap-2"><Calendar size={18} className="text-primary"/> {formData.arrivalDateTime}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-gray-500 block">Departure</label>
            {isEditing ? (
              <input type="text" name="departureDateTime" value={formData.departureDateTime} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
            ) : (
              <p className="font-semibold text-gray-800 flex items-center gap-2"><Calendar size={18} className="text-primary"/> {formData.departureDateTime}</p>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="text-sm text-gray-500 block">Pickup & Drop Location</label>
          {isEditing ? (
            <input type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
          ) : (
            <p className="font-semibold text-gray-800 flex items-start gap-2"><MapPin size={18} className="text-primary flex-shrink-0 mt-1"/> {formData.pickupLocation}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="text-sm text-gray-500 block">Emergency Contact</label>
           {isEditing ? (
            <input type="tel" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md" />
          ) : (
            <p className="font-semibold text-gray-800 flex items-center gap-2"><Phone size={18} className="text-primary"/> {formData.emergencyContact}</p>
          )}
        </div>

        {isEditing && (
          <div className="flex gap-4 mt-6">
            <button onClick={() => { setIsEditing(false); setFormData(travelInfo); }} className="w-1/2 bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg">Cancel</button>
            <button onClick={handleSave} className="w-1/2 bg-primary text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2"><Save size={16} /> Save Changes</button>
          </div>
        )}
      </div>
    </div>
  );
};
// NOTE: For simplicity, this functionality can be linked from the Profile or Dashboard.
// In this prototype, we'll keep the component separate but it's not directly linked in the bottom nav.
// A real app might have a dedicated "Travel" tab or link to it from other sections.
export default TravelDetailsScreen;
