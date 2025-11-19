import React, { useState } from 'react';
import { View } from '../../types';
import { User, Plane, CreditCard, CheckCircle } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh"
];

interface RegistrationFlowProps {
  setView: (view: View) => void;
}

const RegistrationFlow: React.FC<RegistrationFlowProps> = ({ setView }) => {
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);


const [formData, setFormData] = useState({
  fullName: "",
  age: "",
  gender: "",
  email: "",
  address: "",
  state: "",
  sportCategory: "",
  photo: null as File | null,


  modeOfTransport: "",
  arrivalDate: "",
  arrivalTime: "",
  departureDate: "",
  departureTime: "",
  pickupLocation: "",
  emergencyContact: ""
});

  const [errors, setErrors] = useState({});



  // const [userdetail, setuserdetail] = useState(() => {
  //   const saved = localStorage.getItem("formdata");
  //   return saved ? JSON.parse(saved) : {
  //     fullName: "",
  //     age: "",
  //     gender: "",
  //     email: "",
  //     address: "",
  //     state: "",
  //     sportCategory: "",
  //     photo: null,
  //     modeOfTransport: "",
  //     arrivalDate: "",
  //     arrivalTime: "",
  //     departureDate: "",
  //     departureTime: "",
  //     pickupLocation: "",
  //     emergencyContact: ""
  //   };
  // });
  

  const { registrationData ,setRegistrationData} = useAppContext();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    setErrors({...errors,[name]:""})
    // console.log(formData)
  };


  const validateStep1 = () => {
    const newErrors: any = {};
  
    // FULL NAME VALIDATION
    const nameRegex = /^[A-Za-z ]+$/; // only alphabets & space
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (!nameRegex.test(formData.fullName)) {
      newErrors.fullName = "Only alphabets allowed (no numbers/special chars)";
    } else if (formData.fullName.includes("  ")) {
      newErrors.fullName = "No double spaces allowed";
    } else {
      // Auto Capitalize
      formData.fullName =
        formData.fullName
          .trim()
          .split(" ")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join(" ");
    }
  
    // AGE VALIDATION
    const ageNum = Number(formData.age);
    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    } else if (isNaN(ageNum)) {
      newErrors.age = "Age must be a number";
    } else if (ageNum < 15) {
      newErrors.age = "Age must be greater than 15";
    } else if (ageNum > 100) {
      newErrors.age = "Maximum age limit is 100";
    }
  
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const tempDomains = ["tempmail", "10minutemail", "mailinator", "guerrillamail"];
  
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    } else {
      const emailDomain = formData.email.split("@")[1];
      if (tempDomains.some(temp => emailDomain.includes(temp))) {
        newErrors.email = "Temporary emails are not allowed";
      }
    }
  

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 5) {
      newErrors.address = "Address must be at least 5 characters";
    }
  

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    } else if (!indianStates.includes(formData.state)) {
      newErrors.state = "Please select a valid Indian state";
    }
  

    if (!formData.sportCategory.trim()) {
      newErrors.sportCategory = "Sport category is required";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  

  const validateStep2 = () => {
    const newErrors: any = {};
  
    // Mode of Transport
    if (!formData.modeOfTransport.trim()) {
      newErrors.modeOfTransport = "Transport mode is required";
    }
  
    // Arrival
    if (!formData.arrivalDate.trim()) {
      newErrors.arrivalDate = "Arrival date & time is required";
    }
  
    // Departure
    if (!formData.departureDate.trim()) {
      newErrors.departureDate = "Departure date & time is required";
    }
  
    // Compare Date-Time
    if (formData.arrivalDate && formData.departureDate) {
      const arrival = new Date(formData.arrivalDate);
      const departure = new Date(formData.departureDate);
  
      if (arrival >= departure) {
        newErrors.departureDate = "Departure must be after arrival";
      }
    }
  

    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = "Pickup location is required";
    } else if (formData.pickupLocation.trim().length < 3) {
      newErrors.pickupLocation = "Minimum 3 characters required";
    }
  

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = "Emergency contact required";
    } else if (!phoneRegex.test(formData.emergencyContact)) {
      newErrors.emergencyContact = "Enter valid 10-digit mobile number";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  
  const nextStep = () => {
    if (step === 1) {
      // if (!validateStep1()) return; 
      console.log(registrationData)
    }
    if (step === 2) {
      
      // if (!validateStep2()) return;
      setRegistrationData({...registrationData,...formData})
      localStorage.setItem("formdata", JSON.stringify(registrationData));
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
            setFormData={setFormData}
            errors={errors}
          />
        );
        case 2:
          return (
            <Step2Travel
              onNext={nextStep}
              onBack={prevStep}
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          );
        
      case 3:
  return <Step3Payment 
                userdetail={registrationData || userdetail} 
                onPaymentSuccess={handlePaymentSuccess} 
                onBack={prevStep} 
             />;

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
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
  handleChange,setFormData,errors
}: {
  onNext: () => void,
  formData: any,
  handleChange: (e: any) => void,
  setFormData:any,
  errors: any
}) => 
{
  const [filteredStates, setFilteredStates] = useState<string[]>([]);
const [showStateDropdown, setShowStateDropdown] = useState(false);

 return (
  <div className="animate-fade-in">
    
    <h3 className="text-lg font-semibold mb-4 text-gray-700">Step 1: Profile Information</h3>

    <FormInput label="Full Name">
      <input
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="e.g., Rahul Kumar"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />  
        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
      </FormInput>

      <FormInput label="Gender">
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white  focus:outline-none focus:ring-2 focus:ring-primary"
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
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
    </FormInput>

    <FormInput label="Address">
      <input
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="address: street city state"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
      />
      {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
    </FormInput>
    <FormInput label="Province / State">
  <div className="relative">
    <input
      name="state"
      value={formData.state}
      onChange={(e) => {
        handleChange(e);

        const val = e.target.value.toLowerCase();

        if (!val.trim()) {
          setFilteredStates([]);
          setShowStateDropdown(false);
          return;
        }

        const filtered = indianStates.filter((st) =>
          st.toLowerCase().includes(val)
        );

        setFilteredStates(filtered);
        setShowStateDropdown(true);
      }}
      placeholder="e.g., Karnataka"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
    />

    {/* Dropdown */}
    {showStateDropdown && filteredStates.length > 0 && (
      <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-md">
        {filteredStates.map((st) => (
          <li
            key={st}
            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              setFormData((prev: any) => ({ ...prev, state: st }));
              setShowStateDropdown(false);
            }}
          >
            {st}
          </li>
        ))}
      </ul>
    )}
  </div>

  {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
</FormInput>


    <FormInput label="Sport & Category">
      <select
        name="sportCategory"
        value={formData.sportCategory}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
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

}
// --------------------------------------------
// STEP 2 — SAME AS ORIGINAL (NO CHANGE)
// --------------------------------------------

const Step2Travel = ({
  onNext,
  onBack,
  formData,
  handleChange,
  errors
}: any) => (
  <div className="animate-fade-in ">
    <h3 className="text-lg font-semibold mb-4 text-gray-700">Step 2: Travel Information</h3>

    <FormInput label="Mode of Transport ">
      <select
        name="modeOfTransport"
        value={formData.modeOfTransport}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
      >
        <option value="">Select</option>
        <option>Bus</option>
        <option>Train</option>
        <option>Flight</option>
      </select>
      {errors.modeOfTransport && <p className="text-red-500 text-sm">{errors.modeOfTransport}</p>}
    </FormInput>

    <div className="grid grid-cols-1 gap-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Date</label>
        <input
          name="arrivalDate"
        type="datetime-local"
          value={formData.arrivalDate}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.arrivalDate && <p className="text-red-500 text-sm">{errors.arrivalDate}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
        <input
          name="departureDate"
            type="datetime-local"
          value={formData.departureDate}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.departureDate && <p className="text-red-500 text-sm">{errors.departureDate}</p>}
      </div>
    </div>

    <FormInput label="Pickup / Drop Location">
      <input
        name="pickupLocation"
        value={formData.pickupLocation}
        onChange={handleChange}
        placeholder="e.g., Airport"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {errors.pickupLocation && <p className="text-red-500 text-sm">{errors.pickupLocation}</p>}
    </FormInput>

    <FormInput label="Emergency Contact">
      <input
        name="emergencyContact"
        type="tel"
        value={formData.emergencyContact}
        onChange={handleChange}
        placeholder="+91 99999 88888"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {errors.emergencyContact && <p className="text-red-500 text-sm">{errors.emergencyContact}</p>}
    </FormInput>

    <div className="flex gap-4 mt-4 mb-12">
      <button type="button" onClick={onBack} className="w-1/2 bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-400">Back</button>
      <button type="button" onClick={onNext} className="w-1/2 bg-primary text-white font-semibold py-3 rounded-lg shadow-md hover:bg-primary-dark">Next</button>
    </div>
  </div>
);



// --------------------------------------------
// STEP 3 — SAME AS ORIGINAL (NO CHANGE)
// --------------------------------------------

const Step3Payment = ({ onPaymentSuccess, onBack, userdetail }: { onPaymentSuccess: () => void, userdetail: any, onBack: () => void }) => (
  <div className="animate-fade-in">
    <h3 className="text-lg font-semibold mb-4 text-gray-700">Step 3: Registration Fee Payment</h3>

    <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-200 mb-6">
      <h4 className="font-semibold text-gray-800 mb-4">Payment Summary</h4>

      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Player Name:</span>
        <span className="font-medium text-gray-800">{userdetail?.fullName}</span>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Sport:</span>
        <span className="font-medium text-gray-800">{userdetail?.sportCategory}</span>
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
