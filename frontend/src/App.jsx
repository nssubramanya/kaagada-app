import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import IntroPage from "./pages/IntroPage";
import PathSelection from "./pages/PathSelection";
import ProgressMapPage from "./pages/ProgressMapPage";
import LessonPage from "./pages/LessonPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/path-select" element={<PathSelection />} />
        <Route path="/progress/:path" element={<ProgressMapPage />} />
        <Route path="/lesson/:path/:level" element={<LessonPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
