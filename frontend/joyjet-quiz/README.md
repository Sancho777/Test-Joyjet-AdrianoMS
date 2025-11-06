# Joyjet tech interview - Joyjet Quiz

This repository contains the **Joyjet Quiz** application — a small Next.js + Tailwind + Redux quiz app created for the Joyjet technical interview.

## Project summary

Joyjet Quiz is a client-first quiz app built with Next.js (app routes), React (client components), Tailwind CSS for styling, Redux Toolkit for state management and redux-persist for local persistence. The app lets users create quizzes (title, questions, answers, correct answer), list quizzes on the homepage, play a quiz one question at a time, automatically advance or use Next / Previous, submit answers at the end to see results and replay. The app includes unit tests (Jest + React Testing Library).

## Project available at

<https://test-joyjet-adriano-ms-po33-7b23aovxn-rons-projects-2361ff29.vercel.app/>

### Stack

- Next.js (App Router)
- React (client components)
- TypeScript
- Tailwind CSS
- Redux Toolkit + redux-persist
- Jest + React Testing Library for tests
- uuid for ids
- Node / npm

### Installation (development)

-1 Clone your Bitbucket repo (replace with your repository URL):

```bash
git clone git@bitbucket.org:<you>/joyjet-quiz.git
cd frontend/joyjet-quiz
```

-2 Install dependencies:

```bash
npm install
# or
yarn
```

-3 Run dev server:

```bash
npm run dev
# or
yarn dev
```

Open <http://localhost:3000>

### Running tests

```bash
npm test
# or
yarn test
```

Notes:

- Jest configuration lives in `jest.config.js` (configured for Next.js + tsx using babel-jest).
- If you see `jest-environment-jsdom` errors, run:

```bash
npm i --save-dev jest-environment-jsdom
```

- If TypeScript complains about testing utilities, ensure `@types/jest` and `@testing-library/jest-dom` are installed and `setupFilesAfterEnv` is configured.

### Project structure (recommended)

```bash
/app                         # Next.js app folder (app routes)
  /create                    # /create page (creates quizzes)
  /play/[quizId]             # play quiz dynamic route
  /components
    Navbar.tsx
    QuizEditor.tsx
    QuizList.tsx
    QuizPlayer.tsx
  globals.css
/store
  store.ts                   # configureStore + persistor
  quizSlice.ts               # redux slice with quiz state
/tests or __tests__          # Jest unit tests
package.json
README.md
```

### How the app works (behaviour)

- **Create**: In `/create` user types a title, adds questions and at least 4 answers per question. One answer must be marked as correct. When hitting "Create Quiz" the app validates input, assigns ids (uuid) and dispatches `addQuiz({ title, questions })` to Redux. Quizzes persist locally with redux-persist.
- **Home**: Shows list of quizzes. Each quiz has Play and Delete actions.
- **Play**: Route `/play/[quizId]`. Shows one question at a time. Selecting an answer stores user's choice and auto-advances (or user can use Next/Previous). Final question shows Submit button. After submit, the app shows number of correct answers, total and percentage and allows replay.
- **State**: Redux slice `quizSlice` keeps quizzes array where each quiz has `id, title, questions[]`. Each question has `id, text, answers[]`. Each answer has `id, text, correct`.

### Tests included (examples)

- `tests/quizSlice.test.ts` — verifies reducers `addQuiz`, `addQuestion`.
- `tests/CreateQuizPage.test.tsx` — renders Create page, adds question and checks UI.
- `tests/PlayQuizPage.test.tsx` — dispatches a quiz and renders Play page, simulates answer selection and submit.

### Styling and Theme

- Tailwind is used for utility-first styling.
- Colors and fonts are centralized in `globals.css` using CSS variables like:
  - `--background`, `--foreground`, `--primary`, `--card-bg`, `--text-color`

- The homepage uses an animated gradient background with an image mask (see example image used at <https://i.imgur.com/wCG2csZ.png>).

### Linting / TypeScript

- TypeScript types for Redux state are in `store.ts` (`RootState`, `AppDispatch`).
- Common TypeScript/Jest issues:
  - "Cannot find name 'describe'": install `@types/jest`.
  - ESM modules in node_modules (like `uuid`) may require Jest transform or using CJS build.
  - To avoid `SyntaxError: Cannot use import statement outside a module`, ensure `jest.config.js` uses `babel-jest` transform for ts/tsx and `testEnvironment` is `jest-environment-jsdom`.

### Deployment

- Build for production:

```bash
npm run build
npm run start
```
