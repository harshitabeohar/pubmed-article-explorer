import { Article } from "../types/pubmed";

type ResultsTableProps = {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
  handleNext: () => void;
  handlePrevious: () => void;
};

const ResultsTable: React.FC<ResultsTableProps> = ({
  articles,
  onArticleClick,
  currentPage,
  pageSize,
  totalCount,
  handleNext,
  handlePrevious,
}) => {
  return (
    <div className="overflow-auto rounded border bg-white shadow">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-blue-100 text-gray-800">
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
              <td className="border-t px-4 py-2 text-blue-600 underline">
                {article.title}
              </td>
              <td className="border-t px-4 py-2">
                {article.authors.join(", ")}
              </td>
              <td className="border-t px-4 py-2">{article.journal}</td>
              <td className="border-t px-4 py-2">{article.year}</td>
              <td className="border-t px-4 py-2">{article.doi || "-"}</td>
              <td className="border-t px-4 py-2">{article.pages || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between p-4">
        <button
          className="px-4 py-1 rounded bg-blue-200 hover:bg-blue-300 disabled:bg-gray-300"
          onClick={handlePrevious}
          disabled={currentPage === 0}
          aria-label="Previous Page Button"
        >
          Previous Page
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          className="px-4 py-1 rounded bg-blue-200 hover:bg-blue-300"
          onClick={handleNext}
          disabled={totalCount === 0 || (currentPage + 1) * pageSize >= totalCount}
          aria-label="Next Page Button"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default ResultsTable;
