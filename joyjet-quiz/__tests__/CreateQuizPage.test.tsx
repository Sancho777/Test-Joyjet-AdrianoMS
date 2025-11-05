// __tests__/CreateQuizPage.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import CreateQuizPage from "@/app/create/page";

// Mock useRouter from Next.js
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("CreateQuizPage", () => {
  it("renders and allows adding a question", () => {
    // Mock router.push
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { useRouter } = require("next/navigation");
    useRouter.mockReturnValue({ push: jest.fn() });

    render(
      <Provider store={store}>
        <CreateQuizPage />
      </Provider>
    );

    // Enter quiz title
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "My Quiz" } });
    expect(input).toHaveValue("My Quiz");

    // Add a question
    fireEvent.click(screen.getByText("Add Question"));

    // Verify question input appears
    expect(screen.getByPlaceholderText("Enter question text")).toBeInTheDocument();

    // Add an answer
    fireEvent.click(screen.getByText("Add Answer"));
    expect(screen.getByPlaceholderText("Answer 1")).toBeInTheDocument();

    // Mark the first answer as correct
    const correctRadio = screen.getByLabelText("Correct");
    fireEvent.click(correctRadio);
    expect(correctRadio).toBeChecked();
  });
});
