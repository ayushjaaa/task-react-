import React, { useState } from 'react';
import { View } from '../../types';
import { User, Plane, CreditCard, CheckCircle } from 'lucide-react';

interface RegistrationFlowProps {
  setView: (view: View) => void;
}

const RegistrationFlow: React.FC<RegistrationFlowProps> = ({ setView }) => {
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  // Step-1 form data state
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    email: "",
    address: "",
    state: "",
    sportCategory: "",
    photo: null as File | null
  });

  const [errors, setErrors] = useState({});


  // Universal input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    setErrors({...errors,[name]:""})
    console.log(formData)
  };


  const validateStep1 = () => {
    const newErrors: any = {};
  
    console.log(formData.fullName.trim())
    if(!formData.fullName.trim()){
      newErrors.fullName = "Full name is required";
    }
    if(!formData.age.trim()){
      newErrors.age = "Age is required";
    }
    if(!formData.gender.trim()){
      newErrors.gender = "Gender is required";
    }
    if(!formData.email.trim()){
      newErrors.email = "Email is required";
    }
    if(!formData.address.trim()){
      newErrors.address = "Address is required";
    }
    if(!formData.state.trim()){
      newErrors.state = "State is required";
    }
    if(!formData.sportCategory.trim()){
      newErrors.sportCategory = "Sport category is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; //
  };
  
  const nextStep = () => {
    if (step === 1) {
      if (!validateStep1()) return; 
    }
    setStep(step + 1); // ✔ Move to next
  };
  
  const prevStep = () => setStep(s => s - 1);

  const handlePaymentSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setView('main');
    }, 2000);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1Profile
            onNext={nextStep}
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case 2:
        return <Step2Travel onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <Step3Payment onPaymentSuccess={handlePaymentSuccess} onBack={prevStep} />;
      default:
        return (
          <Step1Profile
            onNext={nextStep}
            formData={formData}
            handleChange={handleChange}
          />
        );
    }
  };

  if (showSuccess) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-pastel-green">
        <CheckCircle className="text-primary" size={80} />
        <h2 className="text-2xl font-bold text-primary mt-4">Registration Successful 🎉</h2>
        <p className="text-lg text-gray-700 mt-2">Welcome to KhelKhud 2025!</p>
      </div>
    );
  }

  const steps = [
    { num: 1, icon: User, label: 'Profile' },
    { num: 2, icon: Plane, label: 'Travel' },
    { num: 3, icon: CreditCard, label: 'Payment' },
  ];

  return (
    <div className="p-6 bg-gray-50  h-screen overflow-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Player Registration</h1>

      <div className="flex items-center justify-between mb-8">
        {steps.map((s, index) => (
          <React.Fragment key={s.num}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors 
                ${step >= s.num ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                <s.icon size={20} />
              </div>
              <p className={`text-xs mt-1 font-medium 
                ${step >= s.num ? 'text-primary' : 'text-gray-500'}`}>
                {s.label}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-grow h-1 mx-2 transition-colors 
                  ${step > s.num ? 'bg-primary' : 'bg-gray-200'}`}>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {renderStep()}
    </div>
  );
};


// --------------------------------------------
// Generic Input Component (NO CHANGE)
// --------------------------------------------

const FormInput: React.FC<{ label: string; type?: string; placeholder?: string; required?: boolean; children?: React.ReactNode }> = ({ label, type = 'text', placeholder, required = true, children }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children ? children : (
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
    )}
  </div>
);


// --------------------------------------------
// ⭐ STEP 1 — WITH FULL CONTROLLED STATE
// --------------------------------------------

const Step1Profile = ({
  onNext,
  formData,
  handleChange,errors
}: {
  onNext: () => void,
  formData: any,
  handleChange: (e: any) => void
}) => (
  <div className="animate-fade-in">
    
    <h3 className="text-lg font-semibold mb-4 text-gray-700">Step 1: Profile Information</h3>

    <FormInput label="Full Name">
      <input
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="e.g., Rahul Kumar"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
      />
      {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
    </FormInput>

    <div className="grid grid-cols-2 gap-4">
      <FormInput label="Age">
        <input
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          placeholder="e.g., 24"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />  
        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
      </FormInput>

      <FormInput label="Gender">
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none"
        >
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select> 
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
      </FormInput>
    </div>

    <FormInput label="Email ID">
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="e.g., name@example.com"
        className="w-full p-3 border border-gray-300 rounded-lg"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
    </FormInput>

    <FormInput label="Address">
      <input
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Your current address"
        className="w-full p-3 border border-gray-300 rounded-lg"
      />
      {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
    </FormInput>

    <FormInput label="Province / State">
      <input
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="e.g., Karnataka"
        className="w-full p-3 border border-gray-300 rounded-lg"
      />
      {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
    </FormInput>

    <FormInput label="Sport & Category">
      <select
        name="sportCategory"
        value={formData.sportCategory}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg bg-white"
      >
        <option value="">Select</option>
        <option>Badminton / Individual</option>
        <option>Football / Team</option>
      </select>
      {errors.sportCategory && <p className="text-red-500 text-sm">{errors.sportCategory}</p>}
    </FormInput>

    <FormInput label="Upload Photo (Optional)" required={false}>
      <input
        name="photo"
        type="file"
        onChange={handleChange}
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full 
                   file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary 
                   hover:file:bg-primary/20"
      />
      {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
    </FormInput>

    <button
      type="button"
      onClick={onNext}
      className="w-full mt-4 mb-12 bg-primary text-white font-semibold py-3 rounded-lg shadow-md hover:bg-primary-dark"
    >
      Next
    </button>

  </div>
);


// --------------------------------------------
// STEP 2 — SAME AS ORIGINAL (NO CHANGE)
// --------------------------------------------

const Step2Travel = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => (
  <div className="animate-fade-in ">
    <h3 className="text-lg font-semibold mb-4 text-gray-700">Step 2: Travel Information</h3>

    <FormInput label="Mode of Transport ">
      <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white">
        <option>Bus</option>
        <option>Train</option>
        <option>Flight</option>
      </select>
    </FormInput>

    <div className="grid grid-cols-1 gap-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Date & Time</label>
        <input 
          type="datetime-local" 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-xs text-gray-500 mt-1">Select date and time</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date & Time</label>
        <input 
          type="datetime-local" 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-xs text-gray-500 mt-1">Select date and time</p>
      </div>
    </div>

    <FormInput label="Pickup / Drop Location" placeholder="e.g., Airport/Station Name" />
    <FormInput label="Emergency Contact" type="tel" placeholder="+91 99999 88888" />

    <div className="flex gap-4 mt-4 mb-12">
      <button type="button" onClick={onBack} className="w-1/2 bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-400">Back</button>
      <button type="button" onClick={onNext} className="w-1/2 bg-primary text-white font-semibold py-3 rounded-lg shadow-md hover:bg-primary-dark">Next</button>
    </div>
  </div>
);


// --------------------------------------------
// STEP 3 — SAME AS ORIGINAL (NO CHANGE)
// --------------------------------------------

const Step3Payment = ({ onPaymentSuccess, onBack }: { onPaymentSuccess: () => void, onBack: () => void }) => (
  <div className="animate-fade-in">
    <h3 className="text-lg font-semibold mb-4 text-gray-700">Step 3: Registration Fee Payment</h3>

    <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-200 mb-6">
      <h4 className="font-semibold text-gray-800 mb-4">Payment Summary</h4>

      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Player Name:</span>
        <span className="font-medium text-gray-800">Rahul Kumar</span>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Sport:</span>
        <span className="font-medium text-gray-800">Badminton</span>
      </div>

      <div className="border-t pt-4 flex justify-between items-center text-lg">
        <span className="font-semibold text-gray-600">Total Amount:</span>
        <span className="font-bold text-primary">₹ 5000.00</span>
      </div>
    </div>

    <p className="text-sm text-center text-gray-500 mb-4">
      You will be redirected to Razorpay for a secure payment. This is a simulated flow.
    </p>

    <div className="flex gap-4 mt-4">
      <button onClick={onBack} className="w-1/2 bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-400">Back</button>
      <button onClick={onPaymentSuccess} className="w-1/2 bg-primary text-white font-semibold py-3 rounded-lg shadow-md hover:bg-primary-dark">Pay with Razorpay</button>
    </div>
  </div>
);

export default RegistrationFlow;
