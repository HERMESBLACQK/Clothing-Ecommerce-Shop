import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FaCalendarDay } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

const FormDatePicker = ({ name, label, className }) => {
  const [startDate, setStartDate] = useState(null);

  return (
    <div className={`form-control ${className}`}>
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="w-full p-2 border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        id={name}
        name={name}
        placeholderText="Select a date"
        showPopperArrow={false}
        customInput={<CustomInput />}
      />
    </div>
  );
};

// Custom input component for DatePicker
const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <button
    className="w-full flex items-center p-2 border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
    onClick={onClick}
    ref={ref}
  >
    {value || "Select a date"}
    <FaCalendarDay className="ml-2" />
  </button>
));

export default FormDatePicker;
