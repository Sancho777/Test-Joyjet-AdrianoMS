export const useRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
});

export const useParams = () => ({
  quizId: "test-quiz-id", // or any test ID you need
});
