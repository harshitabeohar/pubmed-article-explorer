import { useState } from "react";
import "./App.css";
import FilterSidebar from "./components/FilterSidebar";
import Header from "./components/Header";
import ResultsTable from "./components/ResultsTable";
import { Article } from "./types/pubmed";
import ArticlePreview from "./components/ArticlePreview";
import { searchPubMed } from "./api/pubmed";

function App() {
  const [filters, setFilters] = useState<{
    title: string;
    author: string;
    journal: string;
  }>({
    title: "",
    author: "",
    journal: "",
  });
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const articlesPerPage = 10;

  const fetchArticles = async (
    filters: { title: string; author: string; journal: string },
    pageNum: number
  ) => {
    setLoading(true);
    try {
      const offset = (pageNum - 1) * articlesPerPage;
      const { articles, totalCount } = await searchPubMed(
        filters,
        articlesPerPage,
        offset
      );
      setArticles(articles);
      setTotalCount(totalCount);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = async (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(0);
    await fetchArticles(newFilters, 1);
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    if ((nextPage) * articlesPerPage < totalCount) {
      setPage(nextPage);
      fetchArticles(filters, nextPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      const prevPage = page - 1;
      setPage(prevPage);
      fetchArticles(filters, prevPage + 1);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50 w-full" role="banner">
        <Header appTitle="PubMed Article Explorer App" />
      </div>
      <div className="App flex h-screen bg-gray-100">
        <aside
          className="w-64 bg-white p-4 shadow-md"
          aria-label="Filter Sidebar with search filters"
        >
          <FilterSidebar
            filters={filters}
            onApplyFilters={handleApplyFilters}
          />
        </aside>
        <main
          className="flex-1 p-4"
          role="main"
          aria-label={selectedArticle ? "Article Preview" : "Results Table"}
        >
          {loading ? (
            <p
              className="text-center text-gray-500"
              role="status"
              aria-label="polite"
            >
              Loading articles...
            </p>
          ) : !selectedArticle ? (
            <ResultsTable
              articles={articles}
              onArticleClick={setSelectedArticle}
              currentPage={page}
              totalCount={totalCount}
              pageSize={articlesPerPage}
              handleNext={handleNextPage}
              handlePrevious={handlePreviousPage}
            />
          ) : (
            <ArticlePreview
              article={selectedArticle}
              onClose={() => setSelectedArticle(null)}
            />
          )}
        </main>
      </div>
    </>
  );
}

export default App;
