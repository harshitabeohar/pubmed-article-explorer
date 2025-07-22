import React from "react";

const NoResults: React.FC = () => {
  return (
    <div className="text-center text-gray-600 mt-20 px-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">No articles found</h2>
      <p className="mb-2">
        We couldn’t find any articles matching your filters.
      </p>
      <p className="text-sm text-gray-500">
        Try adjusting or broadening your search criteria.
      </p>
    </div>
  );
};

export default NoResults;
