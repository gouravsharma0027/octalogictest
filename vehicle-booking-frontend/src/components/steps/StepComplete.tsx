interface StepCompleteProps {
  data: {
    firstName: string;
    lastName: string;
    vehicleId: number;
    startDate: string;
    endDate: string;
  };
  message: string;
  isSuccess: boolean;
  resetForm: () => void;
}

const StepComplete = ({ data, message, isSuccess, resetForm }: StepCompleteProps) => {
  console.log(isSuccess,'isSuccess',data);
  
  return (
    <div className="space-y-4 max-w-md">
      <h2 className={`text-2xl font-semibold ${isSuccess ? "text-green-600" : "text-red-600"}`}>
        {isSuccess ? "Booking Confirmed!" : "Booking Failed"}
      </h2>

      <div className={`p-4 border rounded ${isSuccess ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
        <p>{message}</p>
        <p>
          <strong>{data.firstName} {data.lastName}</strong>
        </p>
        <p>Vehicle ID: <strong>{data.vehicleId}</strong></p>
        <p>Dates: <strong>{data.startDate}</strong> to <strong>{data.endDate}</strong></p>
      </div>

      <button
        onClick={resetForm}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Book Another Ride
      </button>
    </div>
  );
};

export default StepComplete;
