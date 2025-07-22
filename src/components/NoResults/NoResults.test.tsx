import { render, screen, fireEvent } from "@testing-library/react";
import NoResults from "./NoResults";

describe("NoResults Component", () => {
  it("renders NoResults message", () => {
    render(<NoResults />);

    expect(screen.getByText("No articles found")).toBeInTheDocument();
    expect(
      screen.getByText("We couldn’t find any articles matching your filters.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Try adjusting or broadening your search criteria.")
    ).toBeInTheDocument();
  });
});