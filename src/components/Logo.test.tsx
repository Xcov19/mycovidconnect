import { render, screen } from "@testing-library/react";
import React from "react";
import Logo from "./Logo";
describe("Logo tests", () => {
  test("Logo should render a link", () => {
    render(<Logo />);
    expect(screen.getByRole("link")).toBeDefined();
  });
});
