import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Home page", () => {
  it.skip("should render default title", () => {
    // render(<Home />);

    const title = screen.getByText(/next.js app with bash scripts/i);
    const paragraph = screen.getByText(/hello there/i);

    expect(title).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });
});
