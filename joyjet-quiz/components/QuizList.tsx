'use client';

import { useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '@/store/store';

const QuizList = () => {
  const quizzes = useSelector((state: RootState) => state.quiz.quizzes);

  if (!quizzes || quizzes.length === 0) {
    return <p className="text-(--foreground)">No quizzes available.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 text-center">
      <h1 className="text-3xl font-bold text-(--foreground)">Available Quizzes</h1>
      <ul className="space-y-4 flex flex-col items-center">
        {quizzes.map((q) => (
          <li
            key={q.id}
            className="w-4/5 p-4 rounded-lg flex justify-between items-center bg-(--card-bg) text-(--text-color) shadow-md hover:shadow-lg transition-shadow"
          >
            <span className="font-medium text-lg">{q.title}</span>
            <div className="space-x-2">
              <Link
                href={`/quizzes/${q.id}`}
                className="bg-(--primary) text-(--foreground) px-4 py-2 rounded hover:opacity-90 transition"
              >
                Play
              </Link>
              <Link
                href={`/quizzes/${q.id}/edit`}
                className="bg-(--success) text-(--foreground) px-4 py-2 rounded hover:opacity-90 transition"
              >
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
