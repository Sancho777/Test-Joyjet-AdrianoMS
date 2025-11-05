import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

describe("Navbar", () => {
  it("renders links correctly", () => {
    render(
      <MemoryRouterProvider>
        <Navbar />
      </MemoryRouterProvider>
    );

    expect(screen.getByText("Joyjet Quiz")).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
    expect(screen.getByText("Play")).toBeInTheDocument();
  });
});
