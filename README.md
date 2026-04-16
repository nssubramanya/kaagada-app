# Kaagada - Kannada Language Learning App

A Duolingo-style application for learning the Kannada language, built with React and Express.

## 🚀 Features

- Interactive language lessons with multiple exercise types
- Progress tracking and gamification
- Two learning paths: Basic Communication (Phrases) and Alphabets
- Responsive design with smooth animations

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, React Router v7, Framer Motion, Zustand
- **Backend**: Express 5, MongoDB/Mongoose (stubs)
- **Deployment**: Vercel

## 📦 Installation & Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd kaagada-app

# Install dependencies
npm install
npm run dev
```

This will start both frontend (port 5173) and backend (port 5000) in development mode.

## 🚀 Deployment to Vercel

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**:

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:

   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   Follow the prompts to configure your project.

### Option 2: GitHub Integration

1. **Connect your GitHub repository** to Vercel
2. **Vercel will automatically detect** the `vercel.json` configuration
3. **Deploy automatically** on every push to main branch

### Environment Variables

Create environment variables in Vercel dashboard or using CLI:

```bash
vercel env add NODE_ENV
# Set to: production

vercel env add MONGODB_URI
# Set your MongoDB connection string

vercel env add JWT_SECRET
# Set a secure JWT secret
```

## 🤖 CI/CD with GitHub Actions

This project includes automated deployment using GitHub Actions. The CI/CD pipeline automatically builds and deploys your app to Vercel when you push to the main branch.

### Setup GitHub Actions

1. **Go to your GitHub repository**
2. **Navigate to Settings → Secrets and variables → Actions**
3. **Add the following secrets**:

   ```bash
   VERCEL_TOKEN     # Your Vercel token (get from https://vercel.com/account/tokens)
   VERCEL_ORG_ID    # Your Vercel organization ID
   VERCEL_PROJECT_ID # Your Vercel project ID
   ```

4. **Push to main branch** - deployment will happen automatically!

### How It Works

- **Push to main/master**: Production deployment to `https://kaagada-app.vercel.app`
- **Pull Request**: Preview deployment with unique URL for testing
- **Build Process**: Installs dependencies, builds frontend, deploys to Vercel

### Manual Deployment

You can also deploy manually using the Vercel CLI:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## 📁 Project Structure

```
kaagada-app/
├── frontend/           # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── data/
│   ├── public/
│   └── package.json
├── backend/            # Express API
│   ├── routes/
│   ├── models/
│   └── server.js
├── vercel.json         # Vercel configuration
└── package.json        # Root package.json
```

## 🎮 Game Features

- **Multiple Choice Questions (MCQ)**
- **Memory Games** - Recall words after brief display
- **Matching Exercises** - Pair English and Kannada words
- **Word Scramble** - Reorder jumbled words
- **Progress Tracking** - Lives, gems, XP, streaks
- **Level-based Learning** - 8 levels for phrases, 10 for alphabets

## 🔧 API Endpoints

- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/progress/:userId` - Get user progress
- `POST /api/progress` - Update user progress
- `GET /api/question/:path/:level` - Get questions for level

## 📝 Development Notes

- Frontend uses Vite for fast development
- Backend serves static files in production
- All course data is centralized in `CourseData.jsx`
- Game logic is handled by `GameEngine.jsx`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

ISC License
