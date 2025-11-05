"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState } from "react";

export default function QuizPage() {
  const { quizId } = useParams();
  const router = useRouter();
  const quiz = useSelector((s: RootState) => s.quiz.quizzes.find(q => q.id === quizId));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!quiz)
    return (
      <p className="p-6 text-center text-red-500 text-lg font-semibold">Quiz not found</p>
    );

  const question = quiz.questions[currentQuestion];

  const handleAnswer = (answerId: string) => {
    setAnswers(prev => ({ ...prev, [question.id]: answerId }));
    if (currentQuestion < quiz.questions.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 500);
    }
  };

  const handleSubmit = () => setIsSubmitted(true);

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    const correctCount = Object.entries(answers).filter(([qid, aid]) => {
      const q = quiz.questions.find(q => q.id === qid);
      return q?.answers.find(a => a.id === aid)?.correct;
    }).length;

    const total = quiz.questions.length;
    const percentage = ((correctCount / total) * 100).toFixed(0);

    return (
      <div className="max-w-3xl mx-auto p-6 bg-(--card-bg) rounded shadow text-(--text-color) text-center">
        <h1 className="text-3xl font-bold mb-4">{quiz.title} - Results</h1>
        <p className="text-xl mb-2">Score: {correctCount} / {total}</p>
        <p className="text-lg mb-6">({percentage}% correct)</p>

        <div className="grid grid-cols-1 gap-4">
          {quiz.questions.map((q, i) => {
            const selected = answers[q.id];
            const correct = q.answers.find(a => a.correct)?.id === selected;
            return (
              <div
                key={i}
                className={`p-4 rounded shadow ${correct ? "bg-(--success)" : "bg-(--danger)"} text-left`}
              >
                <p className="font-bold">{q.text}</p>
                <p>Your answer: {q.answers.find(a => a.id === selected)?.text || "None"}</p>
                {!correct && (
                  <p>Correct answer: {q.answers.find(a => a.correct)?.text}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handleRestart}
            className="bg-(--primary) text-(--foreground) px-6 py-2 rounded hover:opacity-90 transition"
          >
            Play Again
          </button>
          <button
            onClick={() => router.push("/")}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const progressPercent = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-(--card-bg) rounded shadow text-(--text-color)">
      <h1 className="text-3xl font-bold text-center mb-6">{quiz.title}</h1>

      {/* Progress bar */}
      <div className="w-full h-3 bg-(--foreground)/20 rounded mb-6 relative">
        <div
          className="h-3 bg-(--primary) rounded transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question card */}
      <div className="p-4 border rounded shadow mb-4 bg-(--background)">
        <div className="font-semibold mb-2">
          Question {currentQuestion + 1} / {quiz.questions.length}
        </div>
        <p className="mb-4 text-lg">{question.text}</p>

        <div className="space-y-2">
          {question.answers.map(a => {
            const selected = answers[question.id] === a.id;
            return (
              <button
                key={a.id}
                onClick={() => handleAnswer(a.id)}
                className={`block w-full text-left px-4 py-2 border rounded transition
                  ${selected ? "bg-(--primary)/20 border-(--primary)" : "hover:bg-(--foreground)/10"}
                `}
              >
                {a.text}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentQuestion(q => Math.max(0, q - 1))}
          disabled={currentQuestion === 0}
          className="bg-(--foreground)/20 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {currentQuestion < quiz.questions.length - 1 ? (
          <button
            onClick={() => setCurrentQuestion(q => Math.min(quiz.questions.length - 1, q + 1))}
            className="bg-(--primary) text-(--foreground) px-4 py-2 rounded hover:opacity-90 transition"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-(--danger) text-(--foreground) px-4 py-2 rounded hover:opacity-90 transition"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
