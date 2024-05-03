import React from "react";

const FormSelectSize = ({ sizeList, selectedSize, onSelectSize }) => {
  return (
    <select
      className="mt-2 input input-bordered input-sm w-full max-w-xs text-accent-content"
      value={selectedSize}
      onChange={(e) => onSelectSize(e.target.value)}
    >
      {sizeList.map((sizeOption) => (
        <option key={sizeOption} value={sizeOption}>
          {sizeOption}
        </option>
      ))}
    </select>
  );
};

export default FormSelectSize;
