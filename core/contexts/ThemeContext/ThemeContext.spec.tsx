import { render, screen } from "@testing-library/react";
        import { describe, expect, it } from "vitest";
        import { ThemeProvider } from "./ThemeContext";

        describe("ThemeContext context", () => {
          it("should render children correctly", () => {
            render(
              <ThemeProvider>
                <span>Hello World</span>
              </ThemeProvider>
            );

            const dummyText = screen.getByText(/hello world/i);

            expect(dummyText).toBeInTheDocument();
          });
        });
        
