export interface FormData {
  firstName: string;
  lastName: string;
  wheels: string;
  typeId: string;
  vehicleId: number;
  startDate: string;
  endDate: string;
}

export interface StepProps {
  data: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  nextStep?: () => void;
  prevStep?: () => void;
  goToStep?: (step: number) => void;
}

export interface VehicleType {
  id: number;
  name: string;
}

export interface VehicleModel {
  id: number;
  name: string;
}

export interface VehicleTypeWithModels extends VehicleType {
  vehicles: VehicleModel[];
}
