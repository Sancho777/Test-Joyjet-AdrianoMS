// __tests__/PlayQuizPage.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import PlayQuizPage from "@/app/play/[quizId]/page";
import { addQuiz } from "@/store/quizSlice";

// Mock useParams from Next.js
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

describe("PlayQuizPage", () => {
  it("shows quiz and allows selecting an answer", () => {
    // Add quiz to the store
    store.dispatch(
      addQuiz({
        title: "Math Quiz",
        questions: [
          {
            id: "q1",
            text: "2 + 2 = ?",
            answers: [
              { id: "a1", text: "4", correct: true },
              { id: "a2", text: "5", correct: false },
            ],
          },
        ],
      })
    );

    // Get the generated quiz ID
    const quizId = store.getState().quiz.quizzes[0].id;

    // Mock useParams to return this quizId
    const { useParams } = require("next/navigation");
    useParams.mockReturnValue({ quizId });

    // Render the page
    render(
      <Provider store={store}>
        <PlayQuizPage />
      </Provider>
    );

    // Check quiz title is displayed
    expect(screen.getByText("Math Quiz")).toBeInTheDocument();

    // Select an answer
    fireEvent.click(screen.getByText("4"));

    // Check that the Submit button is now visible (last question)
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
});
