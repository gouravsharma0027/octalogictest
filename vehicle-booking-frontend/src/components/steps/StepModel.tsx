import { useEffect, useState } from "react";
import axios from "axios";
import { StepProps } from "../../types/FormTypes";

interface VehicleModel {
  id: number;
  name: string;
}

interface VehicleTypeWithModels {
  id: number;
  name: string;
  vehicles: VehicleModel[];
}

const StepModel = ({ data, updateField, nextStep, prevStep }: StepProps) => {
  const [models, setModels] = useState<VehicleModel[]>([]);

  useEffect(() => {
    if (data.wheels && data.typeId) {
      axios
        .get(`http://localhost:5000/api/vehicles?wheel=${data.wheels}`)
        .then((res) => {
          const types: VehicleTypeWithModels[] = res.data || [];
          const selectedType = types.find(
            (type) => type.id === Number(data.typeId)
          );
          setModels(selectedType?.vehicles || []);
        })
        .catch((err) => {
          console.error("Error fetching models:", err);
          setModels([]);
        });
    }
  }, [data.wheels, data.typeId]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Choose a specific model</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {models.map((model) => (
          <label
            key={model.id}
            className={`border rounded p-4 flex gap-4 items-center cursor-pointer ${
              data.vehicleId === model.id ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="model"
              value={model.id}
              checked={data.vehicleId === model.id}
              onChange={() => updateField("vehicleId", model.id)}
              className="hidden"
            />
            <img
              src="https://via.placeholder.com/80x50?text=Model"
              alt={model.name}
              className="w-20 h-auto rounded"
            />
            <span className="font-medium">{model.name}</span>
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
          disabled={!data.vehicleId}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepModel;
