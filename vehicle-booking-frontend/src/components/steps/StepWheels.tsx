import { StepProps } from "../../types/FormTypes";

const StepWheels = ({ data, updateField, nextStep, prevStep }: StepProps) => {
  const wheelsOptions = ["2", "4"];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">How many wheels?</h2>
      <div className="flex gap-4">
        {wheelsOptions.map((w) => (
          <label key={w} className="flex items-center gap-2">
            <input
              type="radio"
              name="wheels"
              value={w}
              checked={data.wheels === w}
              onChange={() => updateField("wheels", w)}
            />
            {w} Wheels
          </label>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button className="text-gray-600" onClick={prevStep}>Back</button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={nextStep}
          disabled={!data.wheels}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepWheels;
