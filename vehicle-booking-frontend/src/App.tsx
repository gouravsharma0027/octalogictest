import { useState } from "react";
import Header from "./components/Header";
import StepName from "./components/steps/StepName";
import StepWheels from "./components/steps/StepWheels";


interface FormData {
  firstName: string;
  lastName: string;
  wheels: string
}

const App = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    wheels: ""
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const steps = [
    <StepName data={formData} updateField={updateField} nextStep={nextStep} key="step1" />,
    <StepWheels data={formData} updateField={updateField} nextStep={nextStep} prevStep={prevStep} key="step2" />
  ];

 return (
  <>
    <Header />
    <div className="h-[calc(100vh-72px)] flex items-center justify-center p-4 bg-gray-100 overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 overflow-y-auto max-h-full">
        {steps[step]}
      </div>
    </div>
  </>
);

};

export default App;
