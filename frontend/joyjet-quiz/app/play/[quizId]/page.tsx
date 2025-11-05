'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useParams } from 'next/navigation';

export default function PlayQuizPage() {
  const { quizId } = useParams();
  const quiz = useSelector((state: RootState) =>
    state.quiz.quizzes.find((q) => q.id === quizId)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  if (!quiz) {
    return (
      <p className="p-6 text-center text-red-400 text-lg font-semibold">
        Quiz not found.
      </p>
    );
  }

  if (quiz.questions.length === 0) {
    return (
      <p className="p-6 text-center text-white text-lg">
        This quiz has no questions yet.
      </p>
    );
  }

  const question = quiz.questions[currentIndex] || quiz.questions[0];

  const handleSelectAnswer = (answerId: string) => {
    setUserAnswers((prev) => ({ ...prev, [question.id]: answerId }));
    if (currentIndex < quiz.questions.length - 1) {
      setTimeout(() => setCurrentIndex((i) => i + 1), 350);
    }
  };

  const handlePrevious = () => currentIndex > 0 && setCurrentIndex((i) => i - 1);
  const handleNext = () => currentIndex < quiz.questions.length - 1 && setCurrentIndex((i) => i + 1);
  const handleSubmit = () => setSubmitted(true);
  const handlePlayAgain = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setSubmitted(false);
  };

  // RESULTS SCREEN
  if (submitted) {
    const total = quiz.questions.length;
    const correctCount = quiz.questions.filter((q) => {
      const selected = userAnswers[q.id];
      return q.answers.find((a) => a.id === selected)?.correct;
    }).length;
    const percentage = Math.round((correctCount / total) * 100);

    return (
      <div className="min-h-screen bg-[#1797d2] text-white flex flex-col items-center justify-center p-8 font-[Helvetica] tracking-wide leading-relaxed">
        <h1 className="text-5xl font-bold mb-6">{quiz.title} - Results</h1>
        <p className="text-xl mb-2">Score: {correctCount} / {total}</p>
        <p className="text-lg mb-8">({percentage}% correct)</p>

        <div className="space-y-6 w-full max-w-3xl text-left">
          {quiz.questions.map((q, i) => {
            const selected = userAnswers[q.id];
            const correctAnswer = q.answers.find((a) => a.correct);
            const correct = correctAnswer?.id === selected;
            return (
              <div key={i}>
                <p className="font-bold mb-2 text-lg">{q.text}</p>
                <ul className="space-y-1">
                  {q.answers.map((a) => (
                    <li
                      key={a.id}
                      className={`py-1 ${
                        selected === a.id
                          ? correct
                            ? 'text-green-400'
                            : 'text-red-400'
                          : 'text-white'
                      }`}
                    >
                      {a.text}
                    </li>
                  ))}
                </ul>
                {!correct && (
                  <p className="mt-2 italic text-sm text-gray-300">
                    Correct: {correctAnswer?.text}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={handlePlayAgain}
          className="mt-10 bg-white text-[#1797d2] px-6 py-2 rounded hover:bg-red-400 hover:text-white transition"
        >
          Play Again
        </button>
      </div>
    );
  }

  // QUIZ VIEW
  const progressPercent = ((currentIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#1797d2] text-white font-[Helvetica] tracking-wide leading-relaxed flex flex-col items-center p-8">
      <div className="w-full max-w-3xl mt-24 text-center">
        <h1 className="text-5xl font-bold mb-8">{quiz.title}</h1>

        {/* Progress bar BELOW title */}
        <div className="w-full h-2 bg-white/30 rounded mb-10 overflow-hidden">
          <div
            className="h-full bg-red-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-2xl mb-10">{question.text}</p>

        {/* Answers aligned left */}
        <ul className="space-y-3 text-left">
          {question.answers.map((a) => {
            const selected = userAnswers[question.id] === a.id;
            return (
              <li
                key={a.id}
                onClick={() => handleSelectAnswer(a.id)}
                className={`cursor-pointer text-xl py-2 transition-all ${
                  selected
                    ? 'text-red-500 font-semibold'
                    : 'hover:text-red-400 text-white'
                }`}
              >
                {a.text}
              </li>
            );
          })}
        </ul>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-12">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="bg-white/20 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-white/30 transition"
          >
            Previous
          </button>

          {currentIndex < quiz.questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
