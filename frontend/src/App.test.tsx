import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  localStorage.setItem("dark-mode", "true");
  render(<App />);
  screen.getAllByText(/filter/i);
  // expect(linkElement).toBeInTheDocument();
});
