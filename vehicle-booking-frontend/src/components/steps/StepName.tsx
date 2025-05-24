import { useState } from "react";
import { StepProps } from "../../types/FormTypes";

const StepName = ({ data, updateField, nextStep }: StepProps) => {
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (!data.firstName.trim() || !data.lastName.trim()) {
      setError(true);
      return;
    }
    setError(false);
    nextStep?.();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-indigo-600">What’s your name?</h2>
      <p className="text-sm text-gray-500">Please enter your full name to continue.</p>

      <input
        type="text"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="First Name"
        value={data.firstName}
        onChange={(e) => updateField("firstName", e.target.value)}
      />
      <input
        type="text"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Last Name"
        value={data.lastName}
        onChange={(e) => updateField("lastName", e.target.value)}
      />

      {error && <p className="text-red-500 text-sm">Both fields are required.</p>}

      <button
        className="bg-indigo-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default StepName;
