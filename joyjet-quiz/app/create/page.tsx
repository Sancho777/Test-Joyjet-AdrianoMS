'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuiz, removeQuiz } from '@/store/quizSlice';
import { RootState } from '@/store/store';
import QuizEditor from '@/components/QuizEditor';
import { useRouter } from 'next/navigation';
import { v4 as uuid } from 'uuid';
import Link from 'next/link';

export default function CreateQuizPage() {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState<
    { text: string; answers: { text: string; correct: boolean }[] }[]
  >([]);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const quizzes = useSelector((state: RootState) => state.quiz.quizzes);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddQuestion = () => setQuestions([...questions, { text: '', answers: [] }]);
  const handleRestart = () => { setQuizTitle(''); setQuestions([]); };

  const handleSubmitQuiz = () => {
    if (!quizTitle) return setModalMessage('Please enter a quiz title.');
    if (questions.length === 0) return setModalMessage('Please add at least one question.');

    for (const [i, q] of questions.entries()) {
      if (!q.text) return setModalMessage(`Question ${i + 1} is empty.`);
      if (q.answers.length === 0) return setModalMessage(`Question ${i + 1} has no answers.`);
      if (!q.answers.some(a => a.correct)) return setModalMessage(`Question ${i + 1} has no correct answer.`);
    }

    const quizWithIds = {
      title: quizTitle,
      questions: questions.map(q => ({
        id: uuid(),
        text: q.text,
        answers: q.answers.map(a => ({ id: uuid(), text: a.text, correct: a.correct })),
      })),
    };

    dispatch(addQuiz(quizWithIds));
    setModalMessage('Quiz created successfully!');
    handleRestart();
    router.refresh();
  };

  const handleDeleteQuiz = (id: string) => {
    if (confirm('Are you sure you want to delete this quiz?')) dispatch(removeQuiz(id));
  };

  return (
    <div className="min-h-screen p-6 space-y-8 bg-(--background) text-(--foreground)">
      <h1 className="text-3xl font-bold text-center">Create a New Quiz</h1>

      <div className="bg-(--card-bg) text-(--text-color) border rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <label className="block mb-2 font-medium">Quiz Title</label>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="border rounded px-3 py-2 w-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-(--primary)"
          />
        </div>

        <QuizEditor questions={questions} setQuestions={setQuestions} />

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={handleAddQuestion}
            className="px-4 py-2 bg-(--primary) text-(--foreground) rounded hover:opacity-90 transition"
          >
            Add Question
          </button>

          <button
            onClick={handleSubmitQuiz}
            className="px-4 py-2 bg-(--primary) text-(--foreground) rounded hover:opacity-90 transition"
          >
            Create Quiz
          </button>

          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-(--danger) text-(--foreground) rounded hover:opacity-90 transition"
          >
            Cancel / Restart
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Existing Quizzes</h2>
        {quizzes.length === 0 ? (
          <p className="text-(--foreground)">No quizzes created yet.</p>
        ) : (
          <ul className="space-y-3">
            {quizzes.map((quiz) => (
              <li key={quiz.id} className="flex justify-between items-center border p-3 rounded hover:shadow-md transition bg-(--card-bg) text-(--text-color)">
                <Link
                  href={`/play/${quiz.id}`}
                  className="font-medium text-(--primary) hover:underline"
                >
                  {quiz.title}
                </Link>
                <button
                  onClick={() => handleDeleteQuiz(quiz.id)}
                  className="px-3 py-1 text-sm bg-(--danger) text-(--foreground) rounded hover:opacity-90 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {modalMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-(--card-bg) text-(--text-color) rounded-xl shadow-xl max-w-md w-full p-6 space-y-4 text-center">
            <p className="font-medium">{modalMessage}</p>
            <button
              onClick={() => setModalMessage(null)}
              className="px-6 py-2 bg-(--primary) text-(--foreground) rounded hover:opacity-90 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
