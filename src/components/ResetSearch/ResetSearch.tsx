import React from "react";

type Props = {
  onReset: () => void;
};

const ResetSearch: React.FC<Props> = ({ onReset }) => {
  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={onReset}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        aria-label="Reset Search and Filters"
      >
        Reset Search
      </button>
    </div>
  );
};

export default ResetSearch;
