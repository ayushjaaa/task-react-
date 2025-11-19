
import React, { useState, useRef, useEffect } from 'react';
import { View } from '../../types';
import { ArrowLeft } from 'lucide-react';

interface OTPScreenProps {
  setView: (view: View) => void;
  mobileNumber: string;
  onVerifySuccess: () => void;
}

const OTPScreen: React.FC<OTPScreenProps> = ({ setView, mobileNumber, onVerifySuccess }) => {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    // Focus next input
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);


  const handleVerify = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp === '1234') {
      onVerifySuccess();
    } else {
      alert('Invalid OTP. Please try again.');
      setOtp(new Array(4).fill(''));
      inputsRef.current[0]?.focus();
    }
  };

  return (
    <div className="min-h-full flex flex-col p-6 bg-primary-light">
       <button onClick={() => setView('login')} className="absolute top-6 left-6 text-gray-600">
        <ArrowLeft size={24} />
      </button>

      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">OTP Verification</h2>
        <p className="text-gray-600 mb-8">Enter the OTP sent to +91 {mobileNumber}</p>
        
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((data, index) => {
            return (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
            
                ref={(el) => { inputsRef.current[index] = el; }}
                className="w-14 h-14 text-center text-2xl font-semibold border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            );
          })}
        </div>

        <button
          onClick={handleVerify}
          className="w-full max-w-sm bg-primary text-white font-semibold py-3 rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-300"
        >
          Verify & Continue
        </button>
        <p className="text-sm text-gray-500 mt-4">Dummy OTP for testing: 1234</p>
      </div>
    </div>
  );
};

export default OTPScreen;
