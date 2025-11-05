'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';


export default function HomePage() {
  const quizzes = useSelector((state: RootState) => state.quiz.quizzes);

  return (
    <div className="full-screen">
      {/* Content */}
      <div className="relative max-w-3xl mx-auto px-6 pt-36 flex flex-col items-center gap-12 text-center">
        <h1 className="text-6xl font-extrabold text-white">
          Available Quizzes
        </h1>

        {quizzes.length === 0 ? (
          <p className="text-white text-xl">No quizzes created yet.</p>
        ) : (
          <ul className="flex flex-col gap-6 text-left w-full">
            {quizzes.map((quiz) => (
              <li key={quiz.id}>
                <Link
                  href={`/play/${quiz.id}`}
                  className="text-2xl text-white hover:text-red-500 transition-colors"
                >
                  {quiz.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Gradient animation keyframes */}
      <style jsx global>{`
        body {
          background: linear-gradient(253deg, #0cc898, #1797d2, #864fe1);
          background-size: 300% 300%;
          -webkit-animation: Background 25s ease infinite;
          -moz-animation: Background 25s ease infinite;
          animation: Background 25s ease infinite;
        }

        @-webkit-keyframes Background {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @-moz-keyframes Background {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes Background {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .full-screen {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: url('https://i.imgur.com/wCG2csZ.png');
          background-size: cover;
          background-position: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start; /* keep elements from sticking to center */
          text-align: center;
          padding-top: 10vh; /* space from top */
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}
