import { cleanup, render, screen } from "@testing-library/react";
import { afterAll, describe, expect, it } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar component", () => {
  afterAll(() => {
    cleanup();
  });

  it.skip("should render image", async () => {
    render(
      <Avatar
        src="https://picsum.photos/200"
        placeholder="https://picsum.photos/200"
      />
    );

    expect(await screen.findByRole("img")).toBeInTheDocument();
  });

  it("should render a fallback", () => {
    render(
      <Avatar src="invalidUrl.error" placeholder="https://picsum.photos/200" />
    );

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
