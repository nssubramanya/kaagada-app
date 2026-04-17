# Unit Testing Strategy for Kaagada App

## Overview
This document outlines the unit testing strategy implemented for the Kaagada Kannada learning app. The project is a monorepo with a React/Vite frontend and an Express.js backend, deployed via Vercel with GitHub Actions for CI/CD.

## Project Context
- **Frontend**: React 19 with Vite, components for lessons, pages, and data.
- **Backend**: Express.js with MongoDB/Mongoose, JWT auth, and API routes.
- **CI/CD**: GitHub Actions deploys to Vercel on pushes/PRs to `main`/`master`.

## Testing Frameworks Chosen
- **Frontend**: Vitest (Vite's native test runner) + React Testing Library
- **Backend**: Jest + Supertest + MongoDB Memory Server
- **Coverage**: Built-in with both frameworks (target: >80%)
- **Orchestration**: npm-run-all for monorepo test execution

## Implementation Status

### ✅ Completed Setup

#### Dependencies Installed
- **Frontend**: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`
- **Backend**: `jest`, `supertest`, `mongodb-memory-server`
- **Root**: `husky`, `lint-staged`, `npm-run-all`

#### Configuration Files
- **Frontend**:
  - `vitest.config.js`: Configured with React plugin, jsdom environment, and setup files
  - `src/test/setup.js`: Imports `@testing-library/jest-dom` for global test setup
- **Backend**:
  - `jest.config.js`: Node environment, test match patterns, coverage settings
  - `tests/setup.js`: Placeholder for MongoDB memory server setup

#### Package.json Updates
- **Frontend**: Added `test`, `test:ui`, `test:coverage` scripts
- **Backend**: Updated `test` to `jest`, added `test:watch`, `test:coverage`
- **Root**: Added `test` (parallel execution), `prepare` (Husky), `lint-staged` config

#### Sample Unit Tests
- **Frontend**: `GameEngine.test.jsx` - Tests rendering with BrowserRouter wrapper
- **Backend**: `auth.test.js` - Tests login endpoint with Supertest and MongoDB Memory Server

#### Local Execution
- **Manual**: `npm test` in each directory or root for both
- **Pre-Commit**: Husky + lint-staged runs tests on commit

#### CI/CD Integration
- Updated `.github/workflows/deploy.yml` with `test` job before deployment
- Tests run on pushes/PRs to `main`/`master` in CI

#### Validation
- Frontend tests: ✅ Pass (2/2)
- Backend tests: ✅ Pass (1/1)
- Root orchestration: ✅ Works

## Further Steps

### Expand Test Coverage
1. **Frontend Tests**:
   - Add tests for other components (e.g., `ProgressMapPage`, `LessonPage`)
   - Test user interactions (clicks, form submissions)
   - Mock Zustand stores and Axios API calls
   - Test error states and edge cases

2. **Backend Tests**:
   - Test all routes (progress, question, user)
   - Mock external services (Google Auth, JWT)
   - Test database operations with Mongoose models
   - Add integration tests for full API flows

3. **Coverage Goals**:
   - Run `npm run test:coverage` regularly
   - Aim for 80%+ coverage across both frontend and backend
   - Exclude test files and node_modules from coverage

### Advanced Testing Features
1. **Visual Testing**: Use Vitest UI (`npm run test:ui`) for interactive test debugging
2. **E2E Testing**: Consider Playwright or Cypress for end-to-end tests (separate from unit tests)
3. **Performance Testing**: Add benchmarks for critical components
4. **Accessibility Testing**: Integrate axe-core or similar for a11y checks

### CI/CD Enhancements
1. **Test Reporting**: Add coverage reports to GitHub PRs (e.g., via codecov)
2. **Parallel Jobs**: Split frontend/backend tests into separate CI jobs for faster execution
3. **Caching**: Optimize Node.js and dependency caching in GitHub Actions
4. **Branch Protection**: Require tests to pass before merging PRs

### Maintenance
1. **Test Maintenance**: Update tests when code changes (e.g., component props, API responses)
2. **Flaky Tests**: Monitor and fix intermittent failures
3. **Documentation**: Keep this document updated with new test patterns
4. **Training**: Ensure team members understand the testing setup

### Submitting to Original Repo
1. Commit all changes to a feature branch
2. Push to your fork
3. Create PR with description: "Adds unit testing infrastructure with Vitest/Jest, CI/CD integration, and pre-commit hooks"
4. Ensure CI passes before requesting review

## Commands
- **Run all tests**: `npm test` (root)
- **Run frontend tests**: `cd frontend && npm test`
- **Run backend tests**: `cd backend && npm test`
- **Coverage**: `npm run test:coverage` (in respective directories)
- **Setup Husky**: `npm run prepare` (already done)

This strategy ensures robust, automated testing that integrates seamlessly with development and deployment workflows.# Unit Testing Strategy for Kaagada App

## Overview
This document outlines the unit testing strategy implemented for the Kaagada Kannada learning app. The project is a monorepo with a React/Vite frontend and an Express.js backend, deployed via Vercel with GitHub Actions for CI/CD.

### Project Understanding
- **Frontend**: React 19 with Vite, using components for lessons, pages, and data. No existing tests.
- **Backend**: Express.js with MongoDB/Mongoose stubs, JWT auth, and API routes. Has a placeholder test script.
- **Current CI/CD**: GitHub Actions deploys to Vercel on pushes/PRs to `main`/`master`, but no test execution.
- **Deployment**: Vercel-based, with environment variables for MongoDB and JWT.

No unit tests exist yet, so we'll start from scratch. I'll recommend frameworks that align with your stack, ensure local/on-demand execution, and integrate with CI/CD for automated runs on commits to `main` (in your fork and the original repo).

### Recommended Testing Frameworks
- **Frontend (React/Vite)**: Use **Vitest** (Vite's native test runner). It's fast, integrates seamlessly with Vite, and supports React Testing Library for component testing. Avoid Jest here to leverage Vite's speed.
- **Backend (Express/Node.js)**: Use **Jest** (standard for Node.js). It's robust for API/route testing, mocking, and assertions.
- **Why these?** Vitest for frontend ensures consistency with Vite's dev server. Jest for backend provides excellent mocking for MongoDB/Mongoose. Both support coverage reports and can run in parallel.
- **Additional Tools**:
  - **React Testing Library** (for frontend): For user-centric component testing.
  - **Supertest** (for backend): For API endpoint testing.
  - **Coverage**: Built-in with both frameworks (aim for >80% coverage).

### Step-by-Step Implementation
1. **Install Dependencies**:
   - **Frontend** (package.json):
     ```
     npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
     ```
     - `jsdom`: For DOM simulation in Node.js.
   - **Backend** (package.json):
     ```
     npm install --save-dev jest supertest mongodb-memory-server
     ```
     - `mongodb-memory-server`: For in-memory MongoDB testing (avoids real DB hits).
   - **Root** (optional, for monorepo orchestration): Add `npm-run-all` to root `package.json` for running tests across both.

2. **Configure Tests**:
   - **Frontend**:
     - Create `frontend/vitest.config.js`:
       ```js
       import { defineConfig } from 'vitest/config';
       import react from '@vitejs/plugin-react';

       export default defineConfig({
         plugins: [react()],
         test: {
           globals: true,
           environment: 'jsdom',
           setupFiles: ['./src/test/setup.js'], // For global test setup
         },
       });
       ```
     - Create `frontend/src/test/setup.js`:
       ```js
       import '@testing-library/jest-dom';
       ```
     - Update package.json scripts:
       ```json
       "scripts": {
         "test": "vitest",
         "test:ui": "vitest --ui", // Optional: Visual test runner
         "test:coverage": "vitest --coverage"
       }
       ```
   - **Backend**:
     - Create `backend/jest.config.js`:
       ```js
       module.exports = {
         testEnvironment: 'node',
         setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
         testMatch: ['**/tests/**/*.test.js'],
         collectCoverageFrom: ['**/*.js', '!**/node_modules/**', '!**/tests/**'],
         coverageDirectory: 'coverage',
       };
       ```
     - Create `backend/tests/setup.js`:
       ```js
       // Global setup, e.g., for MongoDB memory server
       ```
     - Update package.json scripts:
       ```json
       "scripts": {
         "test": "jest",
         "test:watch": "jest --watch",
         "test:coverage": "jest --coverage"
       }
       ```
     - For MongoDB mocking: Use `mongodb-memory-server` in tests to avoid real DB connections.

3. **Write Sample Unit Tests**:
   - **Frontend Example** (e.g., for `GameEngine.jsx`):
     - Create `frontend/src/components/lesson/GameEngine.test.jsx`:
       ```jsx
       import { render, screen, fireEvent } from '@testing-library/react';
       import { describe, it, expect } from 'vitest';
       import GameEngine from './GameEngine';

       describe('GameEngine', () => {
         it('renders correctly', () => {
           render(<GameEngine pathId="phrases" level={1} />);
           expect(screen.getByText('Start Lesson')).toBeInTheDocument();
         });

         it('handles answer submission', () => {
           // Mock props and test logic
         });
       });
       ```
   - **Backend Example** (e.g., for auth route):
     - Create `backend/tests/auth.test.js`:
       ```js
       const request = require('supertest');
       const app = require('../server'); // Assuming server exports the app
       const { MongoMemoryServer } = require('mongodb-memory-server');
       const mongoose = require('mongoose');

       let mongoServer;

       beforeAll(async () => {
         mongoServer = await MongoMemoryServer.create();
         await mongoose.connect(mongoServer.getUri());
       });

       afterAll(async () => {
         await mongoose.disconnect();
         await mongoServer.stop();
       });

       describe('POST /auth/login', () => {
         it('should return 200 for valid login', async () => {
           const res = await request(app)
             .post('/auth/login')
             .send({ email: 'test@example.com', password: 'password' });
           expect(res.status).toBe(200);
         });
       });
       ```

4. **Local Execution (On-Demand or Commit)**:
   - **Manual Run**:
     - Frontend: `cd frontend && npm test` (runs Vitest).
     - Backend: `cd backend && npm test` (runs Jest).
     - Root: Add to root package.json: `"test": "npm-run-all test --parallel frontend backend"`, then `npm test`.
   - **On Local Commit** (Pre-Commit Hooks):
     - Install Husky and lint-staged at root: `npm install --save-dev husky lint-staged`.
     - Update root package.json:
       ```json
       "scripts": {
         "prepare": "husky install"
       },
       "lint-staged": {
         "*.{js,jsx}": ["npm test"] // Runs tests on staged files
       }
       ```
     - Run `npm run prepare` to set up Husky.
     - Create `.husky/pre-commit`: `npx lint-staged`.
     - This ensures tests run before every local commit. If tests fail, commit is blocked.

5. **CI/CD Integration (GitHub Actions)**:
   - Modify the existing deploy.yml to add a test job **before** deployment. This runs tests on pushes/PRs to `main`/`master` (in your fork and the original repo after merge).
   - Updated Workflow:
     ```yaml
     name: Deploy to Vercel

     on:
       push:
         branches: [main, master]
       pull_request:
         branches: [main, master]
       workflow_dispatch:

     env:
       VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
       VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

     jobs:
       test:  # New job: Run tests first
         runs-on: ubuntu-latest
         steps:
           - name: Checkout code
             uses: actions/checkout@v4
           - name: Setup Node.js
             uses: actions/setup-node@v4
             with:
               node-version: "22"
               cache: "npm"
               cache-dependency-path: |
                 package-lock.json
                 frontend/package-lock.json
                 backend/package-lock.json
           - name: Install root dependencies
             run: npm install
           - name: Install frontend dependencies
             run: npm install --prefix frontend
           - name: Install backend dependencies
             run: npm install --prefix backend
           - name: Run frontend tests
             run: npm test --prefix frontend
           - name: Run backend tests
             run: npm test --prefix backend

       deploy:  # Existing deploy job, now depends on test
         needs: test  # Only deploy if tests pass
         runs-on: ubuntu-latest
         # ... (rest of your existing deploy steps)
     ```
   - **Why?** Tests run in parallel/on-demand locally, but CI ensures quality on remote commits. If tests fail, deployment is blocked. This applies to your fork's `main` and the original repo's `main` once your PR is merged.

6. **Submitting a Merge Request**:
   - Commit your changes (tests, configs, workflows) to a new branch in your fork.
   - Push and create a PR to the original repo's `main`.
   - In the PR description, explain: "Added unit tests with Vitest (frontend) and Jest (backend), integrated with GitHub Actions for CI, and local pre-commit hooks. Tests run on commits to `main`."
   - Ensure tests pass in CI before requesting review.

### Additional Tips
- **Coverage Goals**: Aim for 80%+ coverage. Run `npm run test:coverage` locally to check.
- **Mocking**: For backend, mock external APIs (e.g., Google Auth). For frontend, mock Zustand stores or Axios calls.
- **Edge Cases**: Test error states, invalid inputs, and game logic (e.g., lives/gems in `GameEngine`).
- **Validation**: After setup, run tests locally and push to trigger CI. Fix any failures iteratively.
- **Dependencies**: Update lockfiles after installs.

This setup is scalable, follows best practices, and integrates cleanly with your existing Vercel deployment. If you need help writing specific tests or debugging, provide more details!