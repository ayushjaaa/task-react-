
import React, { useState } from 'react';
import LoginScreen from './components/screens/LoginScreen';
import OTPScreen from './components/screens/OTPScreen';
import RegistrationFlow from './components/screens/RegistrationFlow';
import MainApp from './components/MainApp';
import { View } from './types';
import { AppProvider } from './context/AppContext';

export default function App() {
  const [view, setView] = useState<View>('login');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleLoginSuccess = () => {
  
    setView('registration');
  };

  const renderView = () => {
    switch (view) {
      case 'login':
        return <LoginScreen setView={setView} setMobileNumber={setMobileNumber} />;
      case 'otp':
        return <OTPScreen setView={setView} mobileNumber={mobileNumber} onVerifySuccess={handleLoginSuccess} />;
      case 'registration':
        return <RegistrationFlow setView={setView} />;
      case 'main':
        return <MainApp />;
      default:
        return <LoginScreen setView={setView} setMobileNumber={setMobileNumber} />;
    }
  };

  // FIX: Resolved a TypeScript error where the `children` prop was reported as missing on AppProvider.
  // By moving the AppProvider to wrap only the components that require its context,
  // we ensure correct component structure and resolve the type inference issue.
  return (
    <div className="bg-gray-800 min-h-screen w-full flex items-center justify-center p-4 ">
      <div className="w-[402px] h-screen w-[calc(100vh*(5/10))] bg-black rounded-[60px] border-[14px] border-black shadow-2xl  overflow-hidden relative ">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-2xl z-20 flex justify-center items-center">
          <div className="w-16 h-2 bg-gray-700 rounded-full"></div>
        </div>
        <div className="w-full h-full bg-white">
          <AppProvider>
            {renderView()}
          </AppProvider>
        </div>
      </div>
    </div>
  );
}
