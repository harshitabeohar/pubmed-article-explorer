import { useState } from 'react'
import './App.css'
import FilterSidebar from './components/FilterSidebar'
import Header from './components/Header';

function App() {
  const [filters, setFilters] = useState<{ title: string; author: string; journal: string; year: number }>({
    title: '',
    author: '',
    journal: '',
    year: 2025
  });

  const handleApplyFilters = (newFilters: { title: string; author: string; journal: string; year: number }) => {
    setFilters(newFilters);
    console.log('Applied Filters:', newFilters);
  }
  return (
    <>
     <div className="sticky top-0 z-50 w-full">
        <Header appTitle="Article Filter Application" />
      </div>
    <div className="App flex h-screen bg-gray-100">
      <div className='w-64 bg-white p-4 shadow-md'>
      <FilterSidebar filters={filters} onApplyFilters={handleApplyFilters} />
      </div>
    </div>
    </>
  )
}

export default App
