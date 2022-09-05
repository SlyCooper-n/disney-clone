import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { VisuallyHidden } from "./VisuallyHidden";

describe("VisuallyHidden RadixUI component", () => {
  it("should render children correctly", () => {
    render(
      <VisuallyHidden>
        <span>I am hidden from you</span>
      </VisuallyHidden>
    );

    const hiddenPhrase = screen.getByText(/i am hidden from you/i);

    expect(hiddenPhrase).toBeInTheDocument();
  });
});
