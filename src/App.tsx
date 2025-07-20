import { useState } from 'react'
import './App.css'
import FilterSidebar from './components/FilterSidebar'
import Header from './components/Header';
import ResultsTable from './components/ResultsTable';
import { Article } from './types/pubmed';
import ArticlePreview from './components/ArticlePreview';
import { searchPubMed } from './api/pubmed';

function App() {
  const [filters, setFilters] = useState<{ title: string; author: string; journal: string; }>({
    title: '',
    author: '',
    journal: '',
  });
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);

  const handleApplyFilters = async (newFilters: { title: string; author: string; journal: string; }) => {
    setFilters(newFilters);
    setLoading(true);
    // console.log('Applied Filters:', newFilters);
    try {
       const data = await searchPubMed(newFilters, 10)
      setArticles(data)
    } catch (err) {
      console.error('Failed to fetch articles:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
     <div className="sticky top-0 z-50 w-full" role='banner'>
        <Header appTitle="Article Filter Application" />
      </div>
    <div className="App flex h-screen bg-gray-100">
      <aside className='w-64 bg-white p-4 shadow-md' aria-label='Filter Sidebar with search filters'>
      <FilterSidebar filters={filters} onApplyFilters={handleApplyFilters} />
      </aside>
      <main className="flex-1 p-4" role='main' aria-label={selectedArticle ? 'Article Preview' : 'Results Table'}>
        {loading ? (
          <p className="text-center text-gray-500" role='status' aria-label='polite'>Loading articles...</p>
        ) : !selectedArticle ? (
          <ResultsTable articles={articles} onArticleClick={setSelectedArticle} />
          ) : (
          <ArticlePreview article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      )}
      </main>
    </div>
    </>
  )
}

export default App
