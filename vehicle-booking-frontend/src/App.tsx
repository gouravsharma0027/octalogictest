import { useState } from "react";
import StepName from "./components/steps/StepName";
import StepWheels from "./components/steps/StepWheels";
import StepType from "./components/steps/StepType";
import StepModel from "./components/steps/StepModel";
import StepDates from "./components/steps/StepDates";
import StepComplete from "./components/steps/StepComplete";
import Header from "./components/Header";
import { FormData } from "./types/FormTypes";

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  wheels: "",
  typeId: "",
  vehicleId: 0,
  startDate: "",
  endDate: "",
};

const App = () => {
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const resetForm = () => {
    setFormData(initialFormData);
    setMessage("");
    setIsSuccess(false);
    setStep(0);
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const steps = [
    <StepName data={formData} updateField={updateField} nextStep={nextStep} />,
    <StepWheels data={formData} updateField={updateField} nextStep={nextStep} prevStep={prevStep} />,
    <StepType data={formData} updateField={updateField} nextStep={nextStep} prevStep={prevStep} />,
    <StepModel data={formData} updateField={updateField} nextStep={nextStep} prevStep={prevStep} />,
    <StepDates
      data={formData}
      updateField={updateField}
      prevStep={prevStep}
      setIsSuccess={setIsSuccess}
      setMessage={setMessage}
      setStep={setStep}
    />,
  ];

  const currentStepComponent = step < steps.length
    ? steps[step]
    : <StepComplete data={formData} message={message} isSuccess={isSuccess} resetForm={resetForm} />;

  return (
    <>
      <Header />
      <div className="h-[calc(100vh-72px)] flex items-center justify-center p-4 bg-gray-100 overflow-hidden">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 overflow-y-auto max-h-full">
          {currentStepComponent}
        </div>
      </div>
    </>
  );
};

export default App;