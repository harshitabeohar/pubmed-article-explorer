import { useState } from "react";
import "./App.css";
import FilterSidebar from "./components/FilterSidebar/FilterSidebar";
import Header from "./components/Header/Header";
import ResultsTable from "./components/ResultsTable/ResultsTable";
import { Article } from "./types/pubmed";
import ArticlePreview from "./components/ArticlePreview/ArticlePreview";
import { searchPubMed } from "./api/pubmed";
import WelcomePanel from "./components/WelcomePanel/WelcomePanel";
import NoResults from "./components/NoResults/NoResults";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

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
  const [hasSearched, setHasSearched] = useState(false);
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
    setHasSearched(true);
    await fetchArticles(newFilters, 1);
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    if (nextPage * articlesPerPage < totalCount) {
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

  const handleResetSearch = () => {
    setFilters({ title: "", author: "", journal: "" });
    setArticles([]);
    setSelectedArticle(null);
    setHasSearched(false);
    setPage(0);
    setTotalCount(0);
  };

  const showWelcome = !selectedArticle && !hasSearched;
  const showNoResults = !selectedArticle && hasSearched && articles.length === 0;
  const showResults = !selectedArticle && hasSearched && articles.length > 0;
  const totalPages = Math.ceil(totalCount / articlesPerPage);

  return (
    <>
      <div className="sticky top-0 z-50 w-full" role="banner">
        <Header
          appTitle="PubMed Article Explorer App"
          onResetSearch={handleResetSearch}
        />
      </div>
      <div className="App flex h-screen">
        <aside
          className="w-64 bg-background p-4 shadow-md ransition-all duration-500 transform translate-x-0"
          aria-label="Filter Sidebar with search filters"
        >
          <FilterSidebar
            filters={filters}
            onApplyFilters={handleApplyFilters}
          />
        </aside>
        <main
          className="flex-1 p-4 opacity-0 animate-fade-in-slow"
          role="main"
          aria-label={selectedArticle ? "Article Preview" : "Results Table"}
        >
          {loading ? (
            <LoadingSpinner />
          ) : showWelcome ? (
            <WelcomePanel />
          ) : showNoResults ? (
            <NoResults />
          ) : showResults ? (
            <ResultsTable
              articles={articles}
              onArticleClick={setSelectedArticle}
              currentPage={page}
              totalCount={totalCount}
              pageSize={articlesPerPage}
              handleNext={handleNextPage}
              handlePrevious={handlePreviousPage}
              totalPages={totalPages}
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
