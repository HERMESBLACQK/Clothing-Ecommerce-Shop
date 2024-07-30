import React from 'react';

const SectionTitle = ({ title, path }) => {
  return (
    <div className="section-title-div bg-gray-800 border-b border-gray-800">
      <h1 className="section-title-title text-3xl font-bold text-center text-white">{title}</h1>
      <p className="section-title-path text-lg text-center text-gray-600 ">{path}</p>
    </div>
  );
};

export default SectionTitle;