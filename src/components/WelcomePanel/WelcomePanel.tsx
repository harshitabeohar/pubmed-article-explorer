import React from "react";
import { FaSearch } from "react-icons/fa";

const WelcomePanel: React.FC = () => {
  return (
    <div className="text-center text-gray-700 mt-20 px-6 max-w-xl mx-auto">
      <FaSearch
        className="mx-auto mb-4 h-12 w-12 text-blue-500"
        aria-hidden="true"
        data-testid="welcome-icon"
      />
      <h2 className="text-2xl font-semibold mb-2">
        Welcome to PubMed Article Explorer
      </h2>
      <p className="mb-4">
        Enter one or more filters in the sidebar and click <b>Apply Filters</b>{" "}
        to search articles.
      </p>
      <p className="text-sm text-gray-500">
        Try searching by title, author, or journal.
      </p>
    </div>
  );
};

export default WelcomePanel;
