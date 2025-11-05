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

  if (!quiz) return <p className="p-4 text-red-500">Quiz not found.</p>;

  const question = quiz.questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / quiz.questions.length) * 100;

  const handleSelectAnswer = (answerId: string) => {
    setUserAnswers({ ...userAnswers, [question.id]: answerId });
    if (currentIndex < quiz.questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);
  const handleNext = () => currentIndex < quiz.questions.length - 1 && setCurrentIndex(currentIndex + 1);
  const handleSubmit = () => setSubmitted(true);
  const handlePlayAgain = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-[#0cc898] via-[#1797d2] to-[#864fe1] relative overflow-y-auto">
      {/* Background image overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-[url('https://i.imgur.com/wCG2csZ.png')] bg-cover bg-center opacity-20 pointer-events-none"
      />

      <div className="relative max-w-3xl mx-auto px-6 pt-36 flex flex-col gap-12 z-10">
        <h1 className="text-5xl font-extrabold text-white text-center">
          {quiz.title}
        </h1>

        {/* Progress Line */}
        <div className="w-full h-2 bg-white/20 rounded mb-6">
          <div
            className="h-2 bg-red-500 rounded transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {submitted ? (
          <div className="text-white flex flex-col gap-6">
            <p className="text-xl font-semibold">
              Score: {quiz.questions.filter(q => {
                const selected = userAnswers[q.id];
                return q.answers.find(a => a.id === selected)?.correct;
              }).length} / {quiz.questions.length}
            </p>
            <button
              onClick={handlePlayAgain}
              className="mt-4 px-6 py-3 border border-white text-white rounded hover:bg-white hover:text-black transition"
            >
              Play Again
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-6 text-left">
              <p className="text-xl text-white">{question.text}</p>
              <ul className="space-y-3">
                {question.answers.map((a) => {
                  const selected = userAnswers[question.id] === a.id;
                  return (
                    <li
                      key={a.id}
                      onClick={() => handleSelectAnswer(a.id)}
                      className={`cursor-pointer text-white text-lg px-2 py-2 transition-all ${
                        selected ? 'text-red-500 font-bold' : 'hover:text-red-500'
                      }`}
                    >
                      {a.text}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-4 py-2 border border-white text-white rounded disabled:opacity-50 hover:bg-white hover:text-black transition"
              >
                Previous
              </button>

              {currentIndex < quiz.questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition"
                >
                  Submit
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
