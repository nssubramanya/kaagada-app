# Kaagada — Kannada Learning App

## Overview
A Duolingo-style app for learning the Kannada language. React frontend (Vite) + Express backend (stub).

## Tech Stack
- **Frontend**: React 19, Vite, React Router v7, Framer Motion, Zustand (not yet wired)
- **Backend**: Express 5, MongoDB/Mongoose, JWT auth — all stubs, not implemented
- **Fonts**: Noto Sans Kannada (Google Fonts)

## Project Structure
```
frontend/src/
  pages/              # Route-level pages
  components/lesson/  # GameEngine — core game logic
  data/CourseData.jsx # Single source of truth for all course + path data
  App.jsx             # Routes
backend/              # Express stubs (not yet implemented)
```

## Routes
```
/                 → SplashPage (auto-redirects to /login after 2s)
/login            → LoginPage (stub — no real auth, goes straight to /intro)
/signup           → SignupPage (stub)
/intro            → IntroPage (animated mascot onboarding)
/path-select      → PathSelection
/progress/:path   → ProgressMapPage  (path = "phrases" | "alphabets")
/lesson/:path/:level → LessonPage → GameEngine
```

## Data Architecture — CourseData.jsx
**Single source of truth** for everything path/course-related.

Exports:
- `COURSES` — `{ phrases: [...], alphabets: [...] }` — flat exercise arrays, 5 per level
- `COURSE` — alias for `COURSES.phrases` (backward compat)
- `PATH_DATA` — path metadata object, keyed by path id (used by ProgressMapPage)
- `PATHS` — array of path cards (used by PathSelection)
- `getQuestionsPerLevel(level)` — returns 5 (constant)
- `shuffleArray(array)` — Fisher-Yates

Exercise index for level N: `(N - 1) * 5`

## Learning Paths
| Path | ID | Levels |
|------|----|--------|
| Basic Communication | `phrases` | 8 |
| Alphabets & Reading | `alphabets` | 10 |

## Exercise Types (GameEngine)
| Type | Description |
|------|-------------|
| `mcq` | Multiple choice — `question` (string), `options` (K\|string array), `answer` (string) |
| `memory` | Show word briefly then hide — `question` (K obj), `english`, `options`, `answer` |
| `match` | Pair English↔Kannada — `pairs: [{en, kn: K(...)}]` |
| `scramble` | Order jumbled words — `english`, `answer` (K array), `jumbled` (K array) |

`K(kn, pr)` helper creates `{ kn: "ಕನ್ನಡ", pr: "pronunciation" }` objects.

## Game State (GameEngine)
- 5 lives max; lose 1 per wrong answer; auto-recover 1 per 30 min
- 5 gems per completed level; spend gems in shop to buy hearts
- Streak counter resets on wrong answer
- XP: +10 per correct answer, +50 per level complete
- `pathId` prop drives which COURSE array and which `/progress/:path` to navigate back to

## Answer Comparison Logic
```js
(opt.kn || opt) === currentExercise.answer
// opt.kn   → Kannada text of a K() object
// opt      → plain English string fallback
// answer   → always a plain string (Kannada or English)
```

## Known Limitations / TODOs
- Backend not implemented (all stub files are empty)
- No real authentication — login navigates directly to /intro
- `UNLOCKED_UP_TO = 2` in ProgressMapPage (demo mode)
- No persistence — lives/gems/XP reset on page refresh
- Zustand store imported but not used
- Navbar.jsx is empty
- No audio pronunciation files
