import { useState } from "react";
import { format } from "date-fns";
import { DateRange, Range } from "react-date-range";
import axios from "axios";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { FormData } from "../../types/FormTypes";

interface StepDatesProps {
  data: FormData;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  prevStep: () => void;
  setMessage: (msg: string) => void;
  setIsSuccess: (flag: boolean) => void;
  setStep: (step: number) => void;
}

const StepDates = ({ data, updateField, prevStep, setMessage, setIsSuccess, setStep }: StepDatesProps) => {
  const [range, setRange] = useState<Range[]>([{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }]);

  const handleSubmit = async () => {
    const startDate = range[0]?.startDate ?? new Date();
    const endDate = range[0]?.endDate ?? new Date();

    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');

    updateField("startDate", formattedStartDate);
    updateField("endDate", formattedEndDate);

    try {
      const response = await axios.post("http://localhost:5000/api/bookings", {
        ...data,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });

      setIsSuccess(true);
      setMessage("Booking submitted successfully!");
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setIsSuccess(false);
        setMessage(error.response.data.message);
      } else {
        setIsSuccess(false);
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setStep(5);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pick date range</h2>
      <DateRange
        editableDateInputs
        onChange={item => setRange([item.selection])}
        moveRangeOnFirstSelection={false}
        minDate={new Date()}
        ranges={range}
      />
      <div className="flex justify-between mt-6">
        <button className="text-gray-600" onClick={prevStep}>Back</button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default StepDates;