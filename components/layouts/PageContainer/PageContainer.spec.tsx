import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PageContainer } from "./PageContainer";

vi.mock("@core/hooks", () => {
  return {
    useTheme: () => "dark",
  };
});

describe("PageContainer layout component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render children correctly", () => {
    render(
      <PageContainer headTitle="test" description="testing PageContainer props">
        <span>Hello World</span>
      </PageContainer>
    );

    const dummyText = screen.getByText(/hello world/i);

    expect(dummyText).toBeInTheDocument();
  });
});
