'use client';

import { Dispatch, SetStateAction } from 'react';

interface Answer {
  text: string;
  correct: boolean;
}

interface Question {
  text: string;
  answers: Answer[];
}

interface QuizEditorProps {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}

export default function QuizEditor({ questions, setQuestions }: QuizEditorProps) {
  const handleQuestionTextChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].text = value;
    setQuestions(newQuestions);
  };

  const handleAddAnswer = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers.push({ text: '', correct: false });
    setQuestions(newQuestions);
  };

  const handleAnswerTextChange = (qIndex: number, aIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers[aIndex].text = value;
    setQuestions(newQuestions);
  };

  const handleToggleCorrect = (qIndex: number, aIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers = newQuestions[qIndex].answers.map((a, i) => ({
      ...a,
      correct: i === aIndex,
    }));
    setQuestions(newQuestions);
  };

  const handleDeleteAnswer = (qIndex: number, aIndex: number) => {
    const newQuestions = [...questions];
    if (newQuestions[qIndex].answers.length > 1) {
      newQuestions[qIndex].answers.splice(aIndex, 1);
      setQuestions(newQuestions);
    } else {
      alert('Each question must have at least one answer.');
    }
  };

  const handleDeleteQuestion = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(qIndex, 1);
    setQuestions(newQuestions);
  };

  return (
    <div className="space-y-6">
      {questions.map((q, qIndex) => (
        <div
          key={qIndex}
          className="border p-4 rounded shadow bg-(--card-bg) text-(--text-color)"
        >
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium">Question {qIndex + 1}</label>
            <button
              onClick={() => handleDeleteQuestion(qIndex)}
              className="text-(--danger) hover:underline"
            >
              Delete Question
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter question text"
            value={q.text}
            onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
            className="border rounded px-3 py-2 w-full mb-2 bg-(--background) text-(--foreground)"
          />

          <div className="space-y-2">
            {q.answers.map((a, aIndex) => (
              <div key={aIndex} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder={`Answer ${aIndex + 1}`}
                  value={a.text}
                  onChange={(e) => handleAnswerTextChange(qIndex, aIndex, e.target.value)}
                  className="border rounded px-2 py-1 flex-1 bg-(--background) text-(--foreground)"
                />
                <label className="flex items-center space-x-1">
                  <input
                    type="radio"
                    checked={a.correct}
                    onChange={() => handleToggleCorrect(qIndex, aIndex)}
                    disabled={q.answers.length === 0}
                  />
                  <span>Correct</span>
                </label>
                <button
                  onClick={() => handleDeleteAnswer(qIndex, aIndex)}
                  className="text-(--danger) hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleAddAnswer(qIndex)}
            className="mt-2 px-3 py-1 bg-(--primary) text-(--foreground) rounded hover:opacity-90 transition"
          >
            Add Answer
          </button>
        </div>
      ))}
    </div>
  );
}
