import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

// -----------------------------
// Types
// -----------------------------
export interface Answer {
  id: string;
  text: string;
  correct: boolean;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface QuizState {
  quizzes: Quiz[];
}

// -----------------------------
// Initial state
// -----------------------------
const initialState: QuizState = {
  quizzes: [],
};

// -----------------------------
// Slice
// -----------------------------
const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    // Add a new quiz
addQuiz: (state, action: PayloadAction<{ title: string; questions: Question[] }>) => {
  state.quizzes.push({
    id: uuid(),
    title: action.payload.title,
    questions: action.payload.questions,
  });
},

    // Remove a quiz by ID
    removeQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter(q => q.id !== action.payload);
    },

    // Add a new question to a quiz
    addQuestion: (
      state,
      action: PayloadAction<{ quizId: string; text: string }>
    ) => {
      const quiz = state.quizzes.find(q => q.id === action.payload.quizId);
      if (quiz) {
        quiz.questions.push({
          id: uuid(),
          text: action.payload.text,
          answers: [],
        });
      }
    },

    // Add an answer to a question
    addAnswer: (
      state,
      action: PayloadAction<{
        quizId: string;
        questionId: string;
        text: string;
        correct?: boolean;
      }>
    ) => {
      const quiz = state.quizzes.find(q => q.id === action.payload.quizId);
      const question = quiz?.questions.find(
        q => q.id === action.payload.questionId
      );
      if (question) {
        question.answers.push({
          id: uuid(),
          text: action.payload.text,
          correct: !!action.payload.correct,
        });
      }
    },

    // Toggle correct answer for a question (only one correct allowed)
    toggleAnswerCorrect: (
      state,
      action: PayloadAction<{
        quizId: string;
        questionId: string;
        answerId: string;
      }>
    ) => {
      const quiz = state.quizzes.find(q => q.id === action.payload.quizId);
      const question = quiz?.questions.find(
        q => q.id === action.payload.questionId
      );
      if (question) {
        question.answers.forEach(
          a => (a.correct = a.id === action.payload.answerId)
        );
      }
    },

    // Optional: Reset all quizzes
    resetQuizzes: (state) => {
      state.quizzes = [];
    },
  },
});

// -----------------------------
// Exports
// -----------------------------
export const {
  addQuiz,
  removeQuiz,
  addQuestion,
  addAnswer,
  toggleAnswerCorrect,
  resetQuizzes,
} = quizSlice.actions;

export default quizSlice.reducer;
