import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';

const EditProfile: React.FC = () => {
  const { registrationData, setRegistrationData, setActiveView} = useAppContext();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    number: '',
  });

  const [errors, setErrors] = useState<any>({});

 
  useEffect(() => {
    if (registrationData) {
      setFormData({
        fullName: registrationData.fullName || '',
        email: registrationData.email || '',
        number: registrationData.number || ''
      });
    }
    console.log(formData)
  }, [registrationData]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };


  const validate = () => {
    const newErrors: any = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email address';

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.number.trim()) newErrors.number = 'Phone number is required';
    else if (!phoneRegex.test(formData.number)) newErrors.number = 'Invalid 10-digit phone number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = () => {
    if (!validate()) return;

    setRegistrationData({
      ...registrationData,
      ...formData
    });

    localStorage.setItem('formdata', JSON.stringify({
      ...registrationData,
      ...formData
    }));

    alert('Profile updated successfully!');
    setActiveView('profile')


  };

  return (
    <div className="p-6 bg-gray-50 h-screen overflow-auto max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h1>


      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Full Name</label>
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter full name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
      </div>


      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>


      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
        <input
          name="number"
          type="tel"
          value={formData.number}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full mt-4 bg-primary text-white font-semibold py-3 rounded-lg shadow-md hover:bg-primary-dark"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditProfile;
