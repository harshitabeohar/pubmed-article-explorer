import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div
        className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
        role="status"
        aria-label="Loading spinner"
        data-testid="loading-spinner"
      ></div>
    </div>
  );
};

export default LoadingSpinner;
