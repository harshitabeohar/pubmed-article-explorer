import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WelcomePanel from "./WelcomePanel";

it("renders WelcomePanel with welcome message", () => {
  render(<WelcomePanel />);

  expect(
    screen.getByText("Welcome to PubMed Article Explorer")
  ).toBeInTheDocument();
  expect(screen.getByText(/Enter one or more filters/i)).toBeInTheDocument();
  expect(
    screen.getByText("Try searching by title, author, or journal.")
  ).toBeInTheDocument();

  const icon = screen.getByTestId("welcome-icon");
  expect(icon).toHaveClass("h-12 w-12 text-blue-500");
});
