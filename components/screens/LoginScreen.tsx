
import React, { useState } from 'react';
import { View } from '../../types';
import { useAppContext } from '@/context/AppContext';

interface LoginScreenProps {
  setView: (view: View) => void;
  setMobileNumber: (num: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ setView, setMobileNumber }) => {
  const [number, setNumber] = useState('');
  const { registrationData ,setRegistrationData} = useAppContext();
  const handleSendOTP = () => {
    if (number.length === 10) {
      setMobileNumber(number);
      setRegistrationData({...registrationData,number:number,})
      console.log(registrationData)
      setView('otp');
    } else {
      alert('Please enter a valid 10-digit mobile number.');
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-between p-6 bg-primary-light">
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-primary mb-2">KhelKhud</h1>
        <p className="text-gray-600 mb-12">by VarnueAI</p>

        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Player Login</h2>
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                <span className="px-3 text-gray-500">+91</span>
                <input
                  type="tel"
                  id="mobile"
                  value={number}
                  onChange={(e) => setNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full p-3 focus:outline-none"
                  placeholder="98765 43210"
                />
            </div>
          </div>

          <button
            onClick={handleSendOTP}
            className="w-full bg-primary text-white font-semibold py-3 rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-300"
          >
            Send OTP
          </button>
        </div>
      </div>
      
      <footer className="text-center text-gray-500 text-sm">
        <p>Powered by VarnueAI</p>
        <p>www.varnueai.com</p>
      </footer>
    </div>
  );
};

export default LoginScreen;
