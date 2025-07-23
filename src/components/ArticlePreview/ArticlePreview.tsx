import { Article } from '../../types/pubmed'

type ArticlePreviewProps = {
  article: Article | null;
  onClose: () => void;
};

const ArticlePreview: React.FC<ArticlePreviewProps> = ({
  article,
  onClose,
}) => {
  if (!article) return null;

  return (
    <div
      className="bg-gray-100 p-6 shadow-md rounded h-full overflow-y-auto"
      role="region"
      aria-label="Article Details Preview"
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl text-primary font-bold" tabIndex={0}>
          {article.title}
        </h2>
        <button
          onClick={onClose}
          className="bg-primary text-white px-3 py-1 rounded hover:bg-hover hover:scale-105 active:scale-95"
          aria-label="Close Article Preview"
        >
          Close
        </button>
      </div>

      <div className="space-y-2 text-sm text-primary">
        <p>
          <strong>Authors:</strong> {article.authors.join(", ")}
        </p>
        <p>
          <strong>Journal:</strong> {article.journal}
        </p>
        <p>
          <strong>Year:</strong> {article.year}
        </p>
        {article.doi && (
          <p>
            <strong>DOI:</strong> {article.doi}
          </p>
        )}
        {article.pages && (
          <p>
            <strong>Pages:</strong> {article.pages}
          </p>
        )}
      </div>

      <section className="mt-6" aria-labelledby="abstract-heading">
        <h3
          className="text-xl text-primary font-semibold mb-2"
          id="Abstract-heading"
        >
          Abstract
        </h3>
        <p className="text-primary text-sm whitespace-pre-wrap leading-relaxed">
          {article.abstract || "No abstract available."}
        </p>
      </section>
    </div>
  );
};

export default ArticlePreview;
