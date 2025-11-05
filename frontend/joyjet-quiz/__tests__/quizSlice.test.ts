import quizReducer, {
  addQuiz,
  addQuestion,
  toggleAnswerCorrect,
  removeQuiz,
} from "@/store/quizSlice";

describe("quizSlice", () => {
  it("adds quiz and question", () => {
    let state = quizReducer(undefined, { type: "@@INIT" });
    state = quizReducer(state, addQuiz({ title: "Math", questions: [] }));
    expect(state.quizzes[0].title).toBe("Math");

    const quizId = state.quizzes[0].id;
    state = quizReducer(state, addQuestion({ quizId, text: "2+2?" }));
    expect(state.quizzes[0].questions.length).toBe(1);
  });

  it("toggles correct answer properly", () => {
    const quizData = {
      title: "Science",
      questions: [
        {
          id: "q1",
          text: "What is H2O?",
          answers: [
            { id: "a1", text: "Water", correct: true },
            { id: "a2", text: "Oxygen", correct: false },
          ],
        },
      ],
    };
    let state = quizReducer(undefined, addQuiz(quizData));
    const quizId = state.quizzes[0].id;

    state = quizReducer(
      state,
      toggleAnswerCorrect({ quizId, questionId: "q1", answerId: "a2" })
    );

    const answers = state.quizzes[0].questions[0].answers;
    expect(answers.find((a) => a.id === "a2")?.correct).toBe(true);
    expect(answers.find((a) => a.id === "a1")?.correct).toBe(false);
  });

  it("removes quiz by id", () => {
    let state = quizReducer(undefined, addQuiz({ title: "Math", questions: [] }));
    const quizId = state.quizzes[0].id;
    state = quizReducer(state, removeQuiz(quizId));
    expect(state.quizzes.length).toBe(0);
  });
});
