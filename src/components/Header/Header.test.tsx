import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Header from "./Header";

describe("Header Component", () => {
  it("renders the header with title and buttons", () => {
    const mockResetSearch = vi.fn();

    render(<Header appTitle="Test Title" onResetSearch={mockResetSearch} />);

    // App title
    expect(screen.getByText("Test Title")).toBeInTheDocument();

    // Login button
    expect(
      screen.getByRole("button", { name: /login to your account/i })
    ).toBeInTheDocument();

    // Reset button
    const resetButton = screen.getByRole("button", { name: /reset search/i });
    expect(resetButton).toBeInTheDocument();

    resetButton.click();
    expect(mockResetSearch).toHaveBeenCalledTimes(1);
  });
});
