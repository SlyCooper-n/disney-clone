import { cleanup, render, screen } from "@testing-library/react";
import { afterAll, describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card component", () => {
  afterAll(() => {
    cleanup();
  });

  it("should render 'brand' variant", () => {
    render(<Card variant="brand" />);

    expect(screen.getByTestId("brand-card-link")).toContainElement(
      screen.getByTestId("brand-card-video")
    );
  });
});
