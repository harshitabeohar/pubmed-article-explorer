import React, { useState } from 'react';

type Props = {
    filters: {
        title: string;
        author: string;
        journal: string;
        year?: number;
    }
    onApplyFilters: (filters: { title: string; author: string; journal: string; year: number }) => void;
}

const FilterSidebar: React.FC<Props> = ({filters, onApplyFilters}) => {
    const [title, setTitle] = useState(filters.title);
    const [author, setAuthor] = useState(filters.author);
    const [journal, setJournal] = useState(filters.journal);
    const [year, setYear] = useState(filters.year);

    const handleApplyFilters = () => {
        onApplyFilters({ title, author, journal, year : year ?? 2025 });
    };

    return (
        <aside className="filter-sidebar space-y-4 p-4" aria-label='Filter Sidebar'>
            <fieldset>
                <legend className='text-lg font-bold mb-2 text-blue-700'>Filters</legend>
            </fieldset>
            <div>
                 <label htmlFor="title" className='block font-medium'>Title</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border px-2 py-1 mt-1 rounded"
                />
            </div>
            <div>
                 <label htmlFor="author" className='block font-medium'>Author</label>
                <input 
                    type="text" 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full border px-2 py-1 mt-1 rounded"
                />
            </div>
            <div>
                 <label htmlFor="journal" className='block font-medium'>Journal</label>
                <input 
                    type="text" 
                    value={journal} 
                    onChange={(e) => setJournal(e.target.value)}
                    className="w-full border px-2 py-1 mt-1 rounded"
                />
            </div>
             <div>
                 <label htmlFor="year" className='block font-medium'>Year</label>
                <input 
                    type="text" 
                    value={year ?? '2025'} 
                    onChange={(e) => setYear(e.target.value === '' ? undefined : Number(e.target.value))}
                    className="w-full border px-2 py-1 mt-1 rounded"
                />
            </div>
            <button onClick={handleApplyFilters}
                    className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600" aria-label='Apply Selected Filters Button'>
            Apply Filters
            </button>
        </aside>
    );
};

export default FilterSidebar;
