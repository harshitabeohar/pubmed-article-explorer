import { Article } from "../../types/pubmed";

type ResultsTableProps = {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  totalPages: number;
};

const ResultsTable: React.FC<ResultsTableProps> = ({
  articles,
  onArticleClick,
  currentPage,
  pageSize,
  totalCount,
  handleNext,
  handlePrevious,
  totalPages
}) => {
  return (
    <div className="overflow-auto rounded border bg-background shadow inline-block align-middle">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-blue-200 text-primary">
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Authors</th>
            <th className="px-4 py-2">Journal</th>
            <th className="px-4 py-2">Year</th>
            <th className="px-4 py-2">DOI</th>
            <th className="px-4 py-2">Pages</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, i) => (
            <tr
              key={article.id || i}
              onClick={() => onArticleClick(article)}
              className="cursor-pointer hover:bg-blue-50"
            >
              <td className="border-t px-4 py-2 text-blue-600 underline white-space-nowrap">
                {article.title}
              </td>
              <td className="border-t px-4 py-2 text-primary white-space-nowrap">
                {article.authors.join(", ")}
              </td>
              <td className="border-t px-4 py-2 text-primary white-space-nowrap">
                {article.journal}
              </td>
              <td className="border-t px-4 py-2 text-primary white-space-nowrap">
                {article.year}
              </td>
              <td className="border-t px-4 py-2 text-primary white-space-nowrap">
                {article.doi || "-"}
              </td>
              <td className="border-t px-4 py-2 text-primary white-space-nowrap">
                {article.pages || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-wrap justify-center gap-4 mt-6 p-4">
        <button
          className="px-4 py-2 rounded-lg text-white bg-primary hover:bg-hover disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition hover:-translate-x-1 duration-200"
          onClick={handlePrevious}
          disabled={currentPage === 0}
          aria-label="Previous Page Button"
        >
          Previous Page
        </button>
        <span className="px-4 py-2 text-sm text-primary">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          className="px-4 py-2 rounded-lg text-white bg-primary hover:bg-hover disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition hover:-translate-x-1 duration-200"
          onClick={handleNext}
          disabled={
            totalCount === 0 || (currentPage + 1) * pageSize >= totalCount
          }
          aria-label="Next Page Button"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default ResultsTable;
