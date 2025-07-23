import React, { useState, useEffect } from "react";

type FilterSidebarProps = {
  filters: {
    title: string;
    author: string;
    journal: string;
  };
  onApplyFilters: (filters: {
    title: string;
    author: string;
    journal: string;
  }) => void;
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onApplyFilters,
}) => {
  const [title, setTitle] = useState(filters.title);
  const [author, setAuthor] = useState(filters.author);
  const [journal, setJournal] = useState(filters.journal);

  const isApplyFiltersDisabled = !title && !author && !journal;

  const handleApplyFilters = () => {
    onApplyFilters({ title, author, journal });
  };

  useEffect(() => {
    setTitle(filters.title);
    setAuthor(filters.author);
    setJournal(filters.journal);
  }, [filters]);

  return (
    <aside
      className="filter-sidebar space-y-4 p-4 bg-blue-200 h-full rounded-md"
      aria-label="Filter Sidebar"
    >
      <fieldset>
        <legend className="text-lg font-semibold mb-2 text-primary">
          Filters
        </legend>
      </fieldset>
      <div>
        <label htmlFor="title" className="block mb-1 text-lg text-primary">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded-md shadow-sm text-primary"
        />
      </div>
      <div>
        <label htmlFor="author" className="block mb-1 text-lg text-primary">
          Author
        </label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border px-3 py-2 rounded-md shadow-sm text-primary"
        />
      </div>
      <div>
        <label htmlFor="journal" className="block mb-1 text-lg text-primary">
          Journal
        </label>
        <input
          id="journal"
          type="text"
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          className="w-full border px-3 py-2 rounded-md shadow-sm text-primary"
        />
      </div>
      <button
        onClick={handleApplyFilters}
        disabled={isApplyFiltersDisabled}
        className={`w-full font-medium py-2 rounded-md shadow
          ${
            isApplyFiltersDisabled
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-primary text-white hover:bg-hover hover:scale-105 active:scale-95"
          }`}
      >
        Apply Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
