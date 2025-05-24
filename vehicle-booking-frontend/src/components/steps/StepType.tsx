import { useEffect, useState } from "react";
import axios from "axios";
import { StepProps } from "../../types/FormTypes";

interface VehicleType {
  id: number;
  name: string;
}

const StepType = ({ data, updateField, nextStep, prevStep }: StepProps) => {
  const [types, setTypes] = useState<VehicleType[]>([]);

  useEffect(() => {
    if (data.wheels) {
      axios
        .get(`http://localhost:5000/api/vehicles?wheel=${data.wheels}`)
        .then((res) => setTypes(res.data || []))
        .catch((err) => {
          console.error("Error fetching vehicle types:", err);
          setTypes([]);
        });
    }
  }, [data.wheels]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Select vehicle type</h2>

      <div className="flex flex-col gap-2">
        {types.map((type) => (
          <label
            key={type.id}
            className={`flex items-center gap-2 p-3 border rounded cursor-pointer ${
              Number(data.typeId) === type.id ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="type"
              value={type.id}
              checked={Number(data.typeId) === type.id}
              onChange={() => updateField("typeId", String(type.id))}
              className="hidden"
            />
            {type.name}
          </label>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button className="text-gray-600" onClick={prevStep}>
          Back
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={nextStep}
          disabled={!data.typeId}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepType;
