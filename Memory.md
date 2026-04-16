# Kaagada Project - Memory & Progress Log

## Project Overview
**Kaagada** is a Duolingo-style language learning application for learning the **Kannada language**. The app features gamified lessons with various exercise types and a progression system.

## Tech Stack
- **Frontend**: React 19 + Vite + React Router v7 + Framer Motion + Zustand
- **Backend**: Express 5 + MongoDB/Mongoose (stubs - not yet implemented)
- **Fonts**: Noto Sans Kannada (Google Fonts)

## Key Fixes Applied (Commit: d03add5)
### 1. CourseData.jsx — Fixed EMPTY data
- **Issue**: COURSE array was empty (just a placeholder comment)
- **Solution**: Created complete exercise bank with 5 questions per level
- **Coverage**: 
  - Phrases path: Levels 1–3 (MCQ, match, scramble types)
  - Alphabets path: Levels 1–2 (memory, match types)

### 2. LessonPage.jsx — Fixed missing pathId prop
- **Issue**: pathId was extracted from params but never passed to GameEngine
- **Solution**: Both `pathId` and `levelId` now passed as props to GameEngine

### 3. GameEngine.jsx — Fixed hardcoded navigation
- **Issue**: "Back to map" always navigated to `/progress/phrases`
- **Solution**: Now uses `pathId` prop to navigate back to correct path

### 4. LoginPage.jsx — Fixed broken Sign Up link
- **Issue**: Sign Up link navigated to `/signup` (route didn't exist)
- **Solution**: Added SignupPage component and registered route in App.jsx

### 5. ProgressMapPage & PathSelection — Fixed data duplication
- **Issue**: Both components defined their own pathData/paths objects
- **Solution**: Imported from single courseData.jsx source of truth

### 6. handleAnswer — Fixed feedback overlay not clearing
- **Issue**: Feedback set to "correct" but never cleared with `setFeedback(null)`
- **Solution**: Properly clear feedback after correct answers

## Routes & Navigation
```
/                 → SplashPage (redirects to /login after 2s)
/login            → LoginPage
/signup           → SignupPage
/intro            → IntroPage (onboarding)
/path-select      → PathSelection
/progress/:path   → ProgressMapPage (path = "phrases" | "alphabets")
/lesson/:path/:level → LessonPage → GameEngine
```

## Game State
- **Lives**: 5 max per level; -1 per wrong answer; +1 recovery per 30 min
- **Gems**: 5 per completed level; spend in shop to buy hearts
- **Streak**: Resets on wrong answer
- **XP**: +10 correct, +50 level complete
- **Persistence**: Currently no persistence (resets on refresh)

## Known Limitations & TODOs
- [ ] Backend not implemented (Express stubs only)
- [ ] Real authentication system needed (currently stub)
- [ ] Save/load game state (currently no persistence)
- [ ] Audio pronunciation files needed
- [ ] Navbar.jsx is empty
- [ ] Zustand store imported but not wired
- [ ] UNLOCKED_UP_TO = 2 (demo mode) in ProgressMapPage
- [ ] Create alphabet learning game (game.jsx is for phrases only)

## Files to Watch
- `frontend/src/data/CourseData.jsx` — Single source of truth for all course data
- `frontend/src/components/lesson/GameEngine.jsx` — Core game logic (rendering, scoring, navigation)
- `frontend/src/pages/LessonPage.jsx` — Lesson controller (passes pathId/levelId to GameEngine)

## Next Steps
1. **Implement second game** for Kannada alphabets (separate from phrases game.jsx)
2. **Fix navigation** - Implement proper back button behavior
3. **Implement backend** - Replace Express stubs with real API
4. **Add persistence** - Store user progress in MongoDB
5. **Add audio** - Pronunciation files for words
6. **Wire Zustand** - Connect store for global state management

## Exercise Types
| Type | Description |
|------|-------------|
| MCQ | Multiple choice with options |
| Memory | Show word briefly, then recall |
| Match | Pair English ↔ Kannada |
| Scramble | Order jumbled words correctly |

## Kannada Helper
`K(kannada_text, pronunciation)` creates exercise objects with both text and pronunciation.
