import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { vi } from "vitest";
import ArticlePreview from "./ArticlePreview";
import { Article } from "../types/pubmed";

describe("ArticlePreview Component", () => {
  const mockArticle: Article = {
    title: "Sample Article",
    authors: ["Author One", "Author Two"],
    journal: "Sample Journal",
    year: "2023",
    doi: "10.1234/sample.doi",
    pages: "1-10",
  };

  it("renders article preview with correct data", () => {
    render(<ArticlePreview article={mockArticle} onClose={() => {}} />);

    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.authors.join(", "))).toBeInTheDocument();
    expect(screen.getByText(mockArticle.journal)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.year)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.doi)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.pages)).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const mockOnClose = vi.fn();
    render(<ArticlePreview article={mockArticle} onClose={mockOnClose} />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
