import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultsTable from './ResultsTable';
import { vi } from 'vitest';

describe("ResultsTable", () => {
  const mockArticles = [
    {
      id: "1",
      title: "Sample Article 1",
      authors: ["Author One", "Author Two"],
      journal: "Sample Journal",
      year: 2023,
      doi: "10.1234/sample1.doi",
      pages: "1-10",
    },
    {
      id: "2",
      title: "Sample Article 2",
      authors: ["Author Three"],
      journal: "Another Journal",
      year: 2022,
      doi: "10.1234/sample2.doi",
      pages: "11-20",
    },
  ];

  const baseProps = {
    currentPage: 0,
    totalCount: 2,
    pageSize: 10,
    totalPages: 1,
    handleNext: vi.fn(),
    handlePrevious: vi.fn(),
  };

  it("renders the table with articles", () => {
    render(
      <ResultsTable
        {...baseProps}
        articles={mockArticles}
        onArticleClick={() => {}}
      />
    );

    expect(screen.getByText("Sample Article 1")).toBeInTheDocument();
    expect(screen.getByText("Author One, Author Two")).toBeInTheDocument();
    expect(screen.getByText("Sample Journal")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("10.1234/sample1.doi")).toBeInTheDocument();
    expect(screen.getByText("1-10")).toBeInTheDocument();

    expect(screen.getByText("Sample Article 2")).toBeInTheDocument();
    expect(screen.getByText("Author Three")).toBeInTheDocument();
    expect(screen.getByText("Another Journal")).toBeInTheDocument();
    expect(screen.getByText("2022")).toBeInTheDocument();
    expect(screen.getByText("10.1234/sample2.doi")).toBeInTheDocument();
    expect(screen.getByText("11-20")).toBeInTheDocument();
  });
});
