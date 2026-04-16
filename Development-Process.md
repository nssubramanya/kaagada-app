# Kaagada App - Development Process Documentation

## Overview

This document chronicles the complete development and deployment setup process for the Kaagada Kannada language learning application - a Duolingo-style app built with React and Express.

## Project Structure

```
kaagada-app/
├── frontend/           # React 19 + Vite application
├── backend/            # Express 5 API server
├── .github/workflows/  # GitHub Actions CI/CD
├── vercel.json         # Vercel deployment config
├── package.json        # Root build scripts
└── README.md          # Project documentation
```

---

## Phase 1: Initial Git Setup

### Step 1: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit - contains code of Frontend (Login, Game engine etc) and Backend Boilerplate - Features need to be implemented."
git push origin main
```

### Issues Encountered:

- `node_modules` was committed (later fixed with .gitignore)
- Frontend was a nested Git repository (caused submodule issues)

---

## Phase 2: Gitignore Configuration

### Root .gitignore Created

```gitignore
# Dependencies
node_modules/
package-lock.json
yarn.lock
pnpm-lock.yaml

# Environment variables
.env
.env.local
.env.*.local

# Build outputs
dist/
build/
dist-ssr/
*.local

# IDE and editor files
.vscode/
.idea/
*.swp
*.swo
*~

# OS files
.DS_Store
Thumbs.db
```

### Backend .gitignore

- Database files (_.db, _.sqlite)
- Environment files
- Build outputs

### Frontend .gitignore

- Standard Vite/React ignore patterns
- Build outputs
- Environment files

---

## Phase 3: Server Startup Issues

### Problem: `npm start` Error

**Error**: `TypeError: argument handler must be a function`

**Root Cause**: Route files (`auth.js`, `progress.js`, etc.) were empty, so `require('./routes/auth')` returned `undefined` instead of a router function.

### Solution: Created Route Stubs

#### backend/routes/auth.js

```javascript
router.post("/login", (req, res) => {
  res.json({ message: "Login endpoint - TODO: Implement authentication" });
});
router.post("/register", (req, res) => {
  res.json({
    message: "Register endpoint - TODO: Implement user registration",
  });
});
router.post("/logout", (req, res) => {
  res.json({ message: "Logout endpoint - TODO: Implement logout" });
});
```

#### backend/routes/progress.js

```javascript
router.get("/:userId", (req, res) => {
  res.json({ message: "Progress endpoint for user ${userId}" });
});
router.post("/", (req, res) => {
  res.json({ message: "Update progress endpoint" });
});
```

#### backend/routes/question.js

```javascript
router.get("/:path/:level", (req, res) => {
  res.json({ message: "Questions for ${path} path, level ${level}" });
});
```

#### backend/routes/user.js

```javascript
router.get("/:userId", (req, res) => {
  res.json({ message: "User profile for ${userId}" });
});
router.put("/:userId", (req, res) => {
  res.json({ message: "Update user ${userId}" });
});
```

---

## Phase 4: Vercel Deployment Setup

### Root package.json

```json
{
  "name": "kaagada-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "concurrently \"npm run dev --prefix frontend\" \"npm start --prefix backend\"",
    "build": "npm run build --prefix frontend",
    "start": "npm start --prefix backend",
    "vercel-build": "npm run build --prefix frontend"
  }
}
```

### vercel.json Configuration

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/backend/server.js" },
    { "src": "/(.*)", "dest": "/frontend/dist/$1" }
  ]
}
```

### Backend Server Updates

- Added production static file serving
- Added development root route with API info
- Fixed syntax errors (trailing commas)

### Frontend Vite Configuration

```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  server: {
    proxy: {
      "/api": { target: "http://localhost:5000", changeOrigin: true },
    },
  },
});
```

---

## Phase 5: CI/CD Pipeline Setup

### GitHub Actions Workflows

#### .github/workflows/deploy.yml (Main Deployment)

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"
      - run: npm install
      - run: npm install -g vercel
      - run: npm run build
      - run: vercel --prod --yes --token $VERCEL_TOKEN
        if: github.ref == 'refs/heads/main'
```

#### .github/workflows/preview.yml (PR Previews)

```yaml
name: Vercel Preview Deployment
on:
  pull_request:
    branches: [main, master]

jobs:
  deploy-preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-args: "--prod=false"
```

### Required GitHub Secrets

```
VERCEL_TOKEN      # From https://vercel.com/account/tokens
VERCEL_ORG_ID     # From vercel whoami
VERCEL_PROJECT_ID # From Vercel dashboard
```

### .vercelignore Optimization

```gitignore
node_modules/
npm-debug.log*
dist/
build/
.env*
.vscode/
.idea/
.github/
*.md
!README.md
```

---

## Phase 6: Documentation and Final Setup

### README.md Updates

- Installation instructions
- Development setup
- Deployment options (CLI vs GitHub integration)
- CI/CD setup guide
- Environment variables documentation

### Helper Scripts

- `setup-cicd.sh` - CI/CD configuration guide

### Environment Configuration

- `.env.example` template
- Environment variable setup for Vercel

---

## Key Fixes Applied

### 1. CourseData.jsx Issues

- **Problem**: Empty data array causing crashes
- **Solution**: Added complete exercise bank with MCQ, match, scramble, memory questions

### 2. Navigation Problems

- **Problem**: pathId not passed to GameEngine
- **Solution**: Updated LessonPage to pass both pathId and levelId

### 3. Route Handler Errors

- **Problem**: Empty route files causing TypeError
- **Solution**: Created stub Express routers for all API endpoints

### 4. Server Configuration

- **Problem**: No root route in development
- **Solution**: Added informative root endpoint with API documentation

### 5. Build Configuration

- **Problem**: Vite not configured for production builds
- **Solution**: Added proper build output configuration

---

## Deployment Options

### Option 1: Manual Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option 2: GitHub Integration

- Connect repo to Vercel dashboard
- Automatic deployments on push

### Option 3: GitHub Actions (Implemented)

- Automated CI/CD pipeline
- Preview deployments for PRs
- Production deployments on main branch

---

## Current Status

✅ **Completed:**

- Git repository setup and initial commit
- .gitignore configuration for all directories
- Working Express server with API stubs
- Vercel deployment configuration
- CI/CD pipeline with GitHub Actions
- Comprehensive documentation

🔄 **In Progress:**

- Backend API implementation (stubs ready)
- Frontend feature development
- Database integration

⏳ **TODO:**

- Implement real authentication
- Add database persistence
- Create alphabet learning game
- Fix navigation back button behavior
- Add audio pronunciation
- Wire Zustand store

---

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Start development servers
npm run dev  # Runs both frontend (5173) and backend (5000)

# Or run separately
cd frontend && npm run dev    # React dev server
cd ../backend && npm start    # API server
```

### Production Build

```bash
npm run build  # Builds frontend to dist/
npm start      # Serves production build
```

### Deployment

```bash
# Manual
vercel --prod

# Or push to main for automatic deployment
git push origin main
```

---

## API Endpoints (Stub Implementation)

```
GET  /                    # API info (development only)
POST /api/auth/login      # User login
POST /api/auth/register   # User registration
POST /api/auth/logout     # User logout
GET  /api/progress/:id    # Get user progress
POST /api/progress        # Update progress
GET  /api/question/:path/:level  # Get questions
GET  /api/user/:id        # Get user profile
PUT  /api/user/:id        # Update user profile
```

---

## File Structure Summary

```
kaagada-app/
├── .env.example              # Environment template
├── .gitignore               # Root ignore rules
├── .vercelignore            # Vercel deployment ignores
├── package.json             # Root build scripts
├── vercel.json              # Vercel configuration
├── setup-cicd.sh            # CI/CD setup helper
├── README.md                # Project documentation
├── Memory.md                # Project memory/progress log
├── CLAUDE.md                # AI assistant context
├── .github/
│   └── workflows/
│       ├── deploy.yml       # Production deployment
│       └── preview.yml      # PR preview deployment
├── frontend/
│   ├── .gitignore          # Frontend ignores
│   ├── package.json        # Frontend dependencies
│   ├── vite.config.js      # Vite configuration
│   └── src/                # React application
├── backend/
│   ├── .gitignore          # Backend ignores
│   ├── package.json        # Backend dependencies
│   ├── server.js           # Express server
│   └── routes/             # API route handlers
└── kannada-app.txt         # Legacy file
```

---

## Lessons Learned

1. **Git Submodules**: Avoid nested Git repositories - they complicate deployment
2. **Route Stubs**: Always create valid Express routers, even for TODO endpoints
3. **Environment Config**: Separate dev/prod configurations clearly
4. **CI/CD Early**: Set up automated deployment from the start
5. **Documentation**: Keep detailed logs of fixes and changes
6. **Build Optimization**: Use .vercelignore to speed up deployments

---

## Next Steps

1. **Implement Backend Features**
   - Real authentication with JWT
   - MongoDB integration
   - Progress persistence

2. **Complete Frontend Features**
   - Alphabet learning game
   - Navigation improvements
   - Audio integration

3. **Testing & Quality**
   - Unit tests for components
   - API integration tests
   - End-to-end testing

4. **Production Readiness**
   - Error handling and logging
   - Performance optimization
   - Security hardening

---

_This document serves as a comprehensive reference for the Kaagada app development process. Last updated: April 17, 2026_
