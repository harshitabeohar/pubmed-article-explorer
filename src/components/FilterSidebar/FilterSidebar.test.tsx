import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterSidebar from './FilterSidebar';
import { vi } from 'vitest';

describe("FilterSidebar", () => {
  const mockApplyFilters = vi.fn();

  const initialFilters = {
    title: "",
    author: "",
    journal: "",
  };

  beforeEach(() => {
    mockApplyFilters.mockClear();
  });

  it("renders input fields and apply button", () => {
    render(
      <FilterSidebar filters={initialFilters} onApplyFilters={mockApplyFilters} />
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/journal/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /apply filters/i })).toBeDisabled();
  });

  it("enables the button when at least one field has a value", () => {
    render(
      <FilterSidebar filters={initialFilters} onApplyFilters={mockApplyFilters} />
    );

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: "Cancer" } });

    expect(screen.getByRole("button", { name: /apply filters/i })).toBeEnabled();
  });

  it("calls onApplyFilters with the entered values", () => {
    render(
      <FilterSidebar filters={initialFilters} onApplyFilters={mockApplyFilters} />
    );

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Diabetes" },
    });
    fireEvent.change(screen.getByLabelText(/author/i), {
      target: { value: "Mike" },
    });
    fireEvent.change(screen.getByLabelText(/journal/i), {
      target: { value: "Nature" },
    });

    fireEvent.click(screen.getByRole("button", { name: /apply filters/i }));

    expect(mockApplyFilters).toHaveBeenCalledWith({
      title: "Diabetes",
      author: "Mike",
      journal: "Nature",
    });
  });
});
