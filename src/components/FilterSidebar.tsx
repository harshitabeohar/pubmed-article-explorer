import React, { useState } from "react";

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

  const handleApplyFilters = () => {
    onApplyFilters({ title, author, journal });
  };

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
          type="text"
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          className="w-full border px-3 py-2 rounded-md shadow-sm text-primary"
        />
      </div>
      <button
        onClick={handleApplyFilters}
        className="w-full bg-primary text-white font-medium py-2 rounded-md shadow hover:bg-hover hover:scale-105 active:scale-95"
        aria-label="Apply Selected Filters Button"
      >
        Apply Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
