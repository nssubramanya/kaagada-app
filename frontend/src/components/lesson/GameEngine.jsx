// src/components/lesson/GameEngine.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  COURSES,
  getQuestionsPerLevel,
  shuffleArray,
} from "../../data/CourseData";

// KannadaWord renderer
const KannadaWord = ({ word, size = "normal", color = null }) => {
  if (!word || typeof word === "string") return <span>{word}</span>;
  const sizes = {
    small: { kn: "15px", pr: "11px" },
    normal: { kn: "18px", pr: "12px" },
    large: { kn: "52px", pr: "15px" },
    xlarge: { kn: "64px", pr: "17px" },
  };
  const s = sizes[size] || sizes.normal;
  return (
    <span
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: 1.3,
      }}
    >
      <span
        style={{ fontSize: s.kn, fontWeight: "800", color: color || "inherit" }}
      >
        {word.kn}
      </span>
      <span
        style={{
          fontSize: s.pr,
          opacity: 0.6,
          fontStyle: "italic",
          fontWeight: "500",
          color: color || "inherit",
        }}
      >
        {word.pr}
      </span>
    </span>
  );
};

export default function GameEngine({ startLevel = 1, pathId = "phrases" }) {
  const navigate = useNavigate();
  const [level, setLevel] = useState(startLevel);
  const [exerciseIndex, setExerciseIndex] = useState(
    (startLevel - 1) * getQuestionsPerLevel(startLevel),
  );
  const [lives, setLives] = useState(5);
  const [gems, setGems] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [totalXP, setTotalXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [consecutiveFails, setConsecutiveFails] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scrambleResult, setScrambleResult] = useState([]);
  const [matchSelected, setMatchSelected] = useState({ en: null, kn: null });
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [memoryTimer, setMemoryTimer] = useState(1);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [shuffledLeftPairs, setShuffledLeftPairs] = useState([]);
  const [shuffledRightPairs, setShuffledRightPairs] = useState([]);

  const courseData = COURSES[pathId] || COURSES.phrases;
  const currentExercise = courseData[exerciseIndex] || courseData[0];
  const questionsPerLevel = getQuestionsPerLevel(level);
  const exercisesInCurrentLevel = exerciseIndex % questionsPerLevel;
  const progressInLevel = (exercisesInCurrentLevel / questionsPerLevel) * 100;
  const topicName =
    level <= 10
      ? "Basic Kannada"
      : level <= 20
        ? "Intermediate Kannada"
        : "Advanced Kannada";

  useEffect(() => {
    if (currentExercise.type === "mcq" || currentExercise.type === "memory") {
      setShuffledOptions(shuffleArray(currentExercise.options || []));
    }
    if (currentExercise.type === "match") {
      setShuffledLeftPairs(shuffleArray(currentExercise.pairs || []));
      setShuffledRightPairs(shuffleArray(currentExercise.pairs || []));
    }
  }, [exerciseIndex]);

  useEffect(() => {
    const recovery = setInterval(
      () => {
        setLives((prev) => (prev < 5 ? prev + 1 : prev));
      },
      30 * 60 * 1000,
    );
    return () => clearInterval(recovery);
  }, []);

  useEffect(() => {
    if (currentExercise.type === "memory") {
      setIsRevealed(true);
      setMemoryTimer(1);
      const countdown = setInterval(() => {
        setMemoryTimer((prev) => {
          if (prev <= 0.1) {
            setIsRevealed(false);
            clearInterval(countdown);
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
      return () => clearInterval(countdown);
    }
  }, [exerciseIndex]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setFeedback("correct");
      setTotalXP((prev) => prev + 10);
      setStreak((prev) => prev + 1);
      setConsecutiveFails(0);
      setTimeout(() => {
        if ((exerciseIndex + 1) % questionsPerLevel === 0) {
          setFeedback(null);
          setGems((prev) => prev + 5);
          setShowLevelComplete(true);
        } else {
          moveToNextExercise();
        }
      }, 1200);
    } else {
      setFeedback("wrong");
      setLives((prev) => Math.max(0, prev - 1));
      setStreak(0);
      setConsecutiveFails((prev) => prev + 1);
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  const moveToNextExercise = () => {
    setExerciseIndex((prev) => prev + 1);
    if ((exerciseIndex + 1) % questionsPerLevel === 0)
      setLevel((prev) => prev + 1);
    setScrambleResult([]);
    setMatchedPairs([]);
    setMatchSelected({ en: null, kn: null });
    setFeedback(null);
    setShowLevelComplete(false);
  };

  const buyHearts = (amount, cost) => {
    if (gems >= cost) {
      setGems((prev) => prev - cost);
      setLives((prev) => Math.min(5, prev + amount));
      setShowShop(false);
      setConsecutiveFails(0);
    }
  };

  const theme = {
    glass: darkMode ? "rgba(10,15,35,0.9)" : "rgba(255,255,255,0.92)",
    text: darkMode ? "#f0e6ff" : "#1a0a2e",
    textSecondary: darkMode ? "rgba(240,230,255,0.6)" : "rgba(26,10,46,0.6)",
    bg: darkMode
      ? "linear-gradient(135deg,#0a0f23 0%,#1a0a2e 40%,#0d1f3c 100%)"
      : "linear-gradient(135deg,#fdf0ff 0%,#ede0ff 50%,#dbeeff 100%)",
    accent: "#c084fc",
    accentDark: "#a855f7",
    wrong: "#f87171",
    cardBorder: darkMode
      ? "1px solid rgba(192,132,252,0.15)"
      : "1px solid rgba(168,85,247,0.2)",
    chipBg: darkMode ? "rgba(192,132,252,0.08)" : "rgba(168,85,247,0.07)",
    chipBgHover: darkMode ? "rgba(192,132,252,0.18)" : "rgba(168,85,247,0.15)",
  };

  const wrap = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.bg,
    fontFamily: "'Noto Sans Kannada','Noto Sans',system-ui,sans-serif",
    transition: "all 0.5s ease",
    padding: "20px",
  };
  const card = {
    backdropFilter: "blur(30px)",
    background: theme.glass,
    borderRadius: "36px",
    padding: "50px 35px",
    textAlign: "center",
    maxWidth: "450px",
    width: "100%",
    border: theme.cardBorder,
    boxShadow: "0 30px 60px -15px rgba(0,0,0,0.6)",
    animation: "slideUp 0.4s ease",
  };

  // ── SHOP ──────────────────────────────────────────────────
  if (showShop)
    return (
      <div style={wrap}>
        <div style={card}>
          <div style={{ fontSize: "70px", marginBottom: "20px" }}>💎</div>
          <h1
            style={{
              color: theme.text,
              fontSize: "28px",
              marginBottom: "10px",
              fontWeight: "800",
            }}
          >
            Gem Shop
          </h1>
          <p style={{ color: theme.textSecondary, marginBottom: "25px" }}>
            You have{" "}
            <span
              style={{
                color: theme.accent,
                fontWeight: "800",
                fontSize: "18px",
              }}
            >
              {gems} gems
            </span>
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              marginBottom: "25px",
            }}
          >
            {[
              {
                hearts: 1,
                cost: 20,
                label: "1 Heart",
                emoji: "❤️",
                color: "#f87171",
              },
              {
                hearts: 5,
                cost: 80,
                label: "5 Hearts Bundle",
                emoji: "❤️❤️❤️❤️❤️",
                color: "#c084fc",
                orig: 100,
              },
            ].map((item) => (
              <div
                key={item.hearts}
                style={{
                  background: `${item.color}18`,
                  border: `2px solid ${item.color}40`,
                  borderRadius: "20px",
                  padding: "20px",
                  cursor: gems >= item.cost ? "pointer" : "not-allowed",
                  opacity: gems >= item.cost ? 1 : 0.5,
                  transition: "all 0.3s",
                  position: "relative",
                }}
                onClick={() =>
                  gems >= item.cost && buyHearts(item.hearts, item.cost)
                }
              >
                {item.orig && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "15px",
                      background: "#fbbf24",
                      color: "#78350f",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontWeight: "800",
                    }}
                  >
                    20% OFF
                  </div>
                )}
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>
                  {item.emoji}
                </div>
                <div
                  style={{
                    fontSize: "17px",
                    fontWeight: "700",
                    color: theme.text,
                    marginBottom: "5px",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <span>💎</span>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "800",
                      color: theme.accent,
                    }}
                  >
                    {item.cost}
                  </span>
                  {item.orig && (
                    <span
                      style={{
                        fontSize: "13px",
                        color: theme.textSecondary,
                        textDecoration: "line-through",
                        marginLeft: "6px",
                      }}
                    >
                      {item.orig}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowShop(false)}
            style={{
              background: theme.chipBg,
              border: "none",
              padding: "16px",
              borderRadius: "18px",
              color: theme.text,
              fontWeight: "700",
              fontSize: "16px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Close
          </button>
        </div>
        <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </div>
    );

  // ── NO LIVES ───────────────────────────────────────────────
  if (lives === 0)
    return (
      <div style={wrap}>
        <div style={card}>
          <div style={{ fontSize: "80px", marginBottom: "20px" }}>💔</div>
          <h1
            style={{
              color: theme.text,
              fontSize: "30px",
              marginBottom: "12px",
              fontWeight: "800",
            }}
          >
            Out of Hearts!
          </h1>
          <p style={{ color: theme.textSecondary, marginBottom: "25px" }}>
            A new heart every 30 minutes
          </p>
          <div
            style={{
              background: `${theme.accent}15`,
              padding: "20px",
              borderRadius: "20px",
              marginBottom: "20px",
              border: `1px solid ${theme.accent}30`,
            }}
          >
            <div style={{ fontSize: "13px", opacity: 0.6, color: theme.text }}>
              Your Gems
            </div>
            <div
              style={{
                fontSize: "34px",
                fontWeight: "800",
                color: theme.accent,
              }}
            >
              💎 {gems}
            </div>
          </div>
          {gems >= 20 ? (
            <button
              onClick={() => setShowShop(true)}
              style={{
                background: `linear-gradient(135deg,${theme.accent},${theme.accentDark})`,
                border: "none",
                padding: "18px",
                borderRadius: "20px",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
                width: "100%",
                marginBottom: "12px",
              }}
            >
              Buy Hearts with Gems 💎
            </button>
          ) : (
            <div
              style={{
                background: `${theme.wrong}15`,
                padding: "14px",
                borderRadius: "15px",
                marginBottom: "12px",
                border: `1px solid ${theme.wrong}30`,
                color: theme.textSecondary,
                fontSize: "14px",
              }}
            >
              Not enough gems. Complete levels to earn more!
            </div>
          )}
          <button
            onClick={() => navigate("/path-select")}
            style={{
              background: theme.chipBg,
              border: "none",
              padding: "16px",
              borderRadius: "18px",
              color: theme.text,
              fontWeight: "700",
              fontSize: "15px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            ← Back to paths
          </button>
        </div>
        <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </div>
    );

  // ── LEVEL COMPLETE ─────────────────────────────────────────
  if (showLevelComplete)
    return (
      <div style={wrap}>
        <div style={card}>
          <div
            style={{
              fontSize: "80px",
              marginBottom: "15px",
              animation: "bounce 1s infinite",
            }}
          >
            🏆
          </div>
          <h1
            style={{
              color: theme.text,
              fontSize: "30px",
              marginBottom: "10px",
              fontWeight: "800",
            }}
          >
            Level {level} Complete!
          </h1>
          <p style={{ color: theme.textSecondary, marginBottom: "25px" }}>
            Excellent! You earned 5 gems! 💎
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "12px",
              marginBottom: "25px",
            }}
          >
            {[
              { label: "XP", value: "+50", color: theme.accent },
              { label: "Gems", value: "+5", color: "#60a5fa" },
              { label: "Hearts", value: `❤️ ${lives}`, color: theme.wrong },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: `${stat.color}15`,
                  padding: "18px 10px",
                  borderRadius: "18px",
                  border: `1px solid ${stat.color}30`,
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    opacity: 0.6,
                    color: theme.text,
                    marginBottom: "5px",
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "800",
                    color: stat.color,
                  }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={moveToNextExercise}
            style={{
              background: `linear-gradient(135deg,${theme.accent},${theme.accentDark})`,
              border: "none",
              padding: "18px",
              borderRadius: "20px",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Continue to Level {level + 1} →
          </button>
          <button
            onClick={() => navigate(`/progress/${pathId}`)}
            style={{
              background: "none",
              border: "none",
              color: theme.textSecondary,
              marginTop: "14px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            ← Back to map
          </button>
        </div>
        <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </div>
    );

  // ── MAIN GAME ──────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: theme.bg,
        fontFamily: "'Noto Sans Kannada','Noto Sans',system-ui,sans-serif",
        transition: "all 0.5s ease",
        padding: "15px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        *{box-sizing:border-box}
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;600;800&display=swap');
        .chip{cursor:pointer;padding:14px 20px;border-radius:16px;background:${theme.chipBg};transition:all 0.25s cubic-bezier(0.4,0,0.2,1);border:2px solid transparent;font-weight:600;user-select:none}
        .chip:hover:not(.disabled){transform:translateY(-3px);background:${theme.chipBgHover};border-color:${theme.accent};box-shadow:0 8px 25px ${theme.accent}25}
        .chip:active:not(.disabled){transform:translateY(-1px) scale(0.98)}
        .chip.selected{background:linear-gradient(135deg,${theme.accent}30,${theme.accentDark}20);color:${theme.accent};border-color:${theme.accent}}
        .chip.matched{background:linear-gradient(135deg,${theme.accent},${theme.accentDark});color:white;border-color:${theme.accent};animation:matchPulse 0.6s ease}
        .chip.disabled{opacity:0.3;cursor:not-allowed;pointer-events:none}
        .feedback-pop{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);padding:25px 40px;border-radius:25px;text-align:center;font-weight:800;font-size:20px;animation:feedbackPop 0.4s cubic-bezier(0.68,-0.55,0.265,1.55);z-index:1000;box-shadow:0 20px 60px rgba(0,0,0,0.5)}
        @keyframes feedbackPop{0%{transform:translate(-50%,-50%) scale(0);opacity:0}50%{transform:translate(-50%,-50%) scale(1.1)}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}
        @keyframes matchPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      <div
        style={{
          zIndex: 1,
          width: "100%",
          maxWidth: "490px",
          minHeight: "88vh",
          margin: "0 auto",
          padding: "28px 24px",
          borderRadius: "36px",
          background: theme.glass,
          color: theme.text,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          boxShadow: "0 30px 60px -15px rgba(0,0,0,0.6)",
          backdropFilter: "blur(30px)",
          border: theme.cardBorder,
          animation: "slideUp 0.5s ease",
        }}
      >
        {/* Back button */}
        <button
          onClick={() => navigate(`/progress/${pathId}`)}
          style={{
            background: "none",
            border: "none",
            color: theme.textSecondary,
            cursor: "pointer",
            fontSize: "14px",
            alignSelf: "flex-start",
            marginBottom: "8px",
          }}
        >
          ← Back
        </button>

        {/* Stats bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "18px",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <div
              style={{
                background: `${theme.accent}18`,
                padding: "8px 14px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                border: `1px solid ${theme.accent}30`,
              }}
            >
              <span>⚡</span>
              <span style={{ fontWeight: "800", color: theme.accent }}>
                {streak}
              </span>
            </div>
            <div
              style={{
                background: "rgba(96,165,250,0.15)",
                padding: "8px 14px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                border: "1px solid rgba(96,165,250,0.3)",
                cursor: "pointer",
              }}
              onClick={() => setShowShop(true)}
            >
              <span>💎</span>
              <span style={{ fontWeight: "800", color: "#60a5fa" }}>
                {gems}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "4px",
              background: "rgba(248,113,113,0.15)",
              padding: "8px 12px",
              borderRadius: "14px",
              border: "1px solid rgba(248,113,113,0.3)",
            }}
          >
            {Array.from({ length: lives }).map((_, i) => (
              <span key={i} style={{ fontSize: "17px" }}>
                ❤️
              </span>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: "22px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: "800",
                letterSpacing: "1.5px",
                opacity: 0.5,
                color: theme.text,
              }}
            >
              LEVEL {level} • {topicName.toUpperCase()}
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "700",
                color: theme.accent,
              }}
            >
              {exercisesInCurrentLevel + 1}/{questionsPerLevel}
            </span>
          </div>
          <div
            style={{
              height: "8px",
              background: darkMode
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.08)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressInLevel}%`,
                height: "100%",
                background: `linear-gradient(90deg,${theme.accent},${theme.accentDark})`,
                borderRadius: "8px",
                transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          </div>
        </div>

        {/* Exercise area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "15px 0",
          }}
        >
          {/* MEMORY */}
          {currentExercise.type === "memory" && (
            <div style={{ textAlign: "center" }}>
              <h2
                style={{
                  fontSize: "15px",
                  opacity: 0.55,
                  marginBottom: "20px",
                  fontWeight: "600",
                  color: theme.textSecondary,
                  letterSpacing: "0.5px",
                }}
              >
                REMEMBER THIS WORD
              </h2>
              {isRevealed && (
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    border: `3px solid ${theme.accent}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: "800",
                    color: theme.accent,
                    margin: "0 auto 18px",
                  }}
                >
                  {Math.ceil(memoryTimer)}
                </div>
              )}
              <div
                style={{
                  margin: "20px 0 8px",
                  filter: isRevealed ? "none" : "blur(25px)",
                  opacity: isRevealed ? 1 : 0.15,
                  transition: "all 0.5s",
                  userSelect: "none",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <KannadaWord
                  word={currentExercise.question}
                  size="xlarge"
                  color={isRevealed ? theme.accent : theme.text}
                />
              </div>
              <div
                style={{
                  fontSize: "15px",
                  opacity: isRevealed ? 0.55 : 0,
                  marginBottom: "35px",
                  transition: "opacity 0.3s",
                  color: theme.textSecondary,
                  fontStyle: "italic",
                }}
              >
                {currentExercise.english}
              </div>
              {!isRevealed && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(135px,1fr))",
                    gap: "10px",
                  }}
                >
                  {shuffledOptions.map((opt, idx) => (
                    <div
                      key={idx}
                      className="chip"
                      style={{ color: theme.text, textAlign: "center" }}
                      onClick={() =>
                        handleAnswer((opt.kn || opt) === currentExercise.answer)
                      }
                    >
                      <KannadaWord word={opt} size="small" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MATCH */}
          {currentExercise.type === "match" && (
            <div>
              <h2
                style={{
                  fontSize: "19px",
                  marginBottom: "22px",
                  textAlign: "center",
                  fontWeight: "700",
                  color: theme.text,
                }}
              >
                Match the pairs
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {shuffledLeftPairs.map((p, idx) => (
                    <div
                      key={idx}
                      className={`chip ${matchSelected.en === p.en ? "selected" : ""} ${matchedPairs.includes(p.en) ? "matched disabled" : ""}`}
                      style={{
                        color: theme.text,
                        textAlign: "center",
                        fontSize: "15px",
                      }}
                      onClick={() =>
                        !matchedPairs.includes(p.en) &&
                        setMatchSelected({ ...matchSelected, en: p.en })
                      }
                    >
                      {p.en}
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {shuffledRightPairs.map((p, idx) => {
                    const knVal = p.kn?.kn || p.kn;
                    return (
                      <div
                        key={idx}
                        className={`chip ${matchSelected.kn === knVal ? "selected" : ""} ${matchedPairs.includes(knVal) ? "matched disabled" : ""}`}
                        style={{ color: theme.text, textAlign: "center" }}
                        onClick={() => {
                          if (matchedPairs.includes(knVal)) return;
                          if (matchSelected.en) {
                            const correct =
                              currentExercise.pairs.find(
                                (pair) => pair.en === matchSelected.en,
                              )?.kn?.kn === knVal ||
                              currentExercise.pairs.find(
                                (pair) => pair.en === matchSelected.en,
                              )?.kn === knVal;
                            if (correct) {
                              const newMatched = [
                                ...matchedPairs,
                                matchSelected.en,
                                knVal,
                              ];
                              setMatchedPairs(newMatched);
                              setMatchSelected({ en: null, kn: null });
                              if (
                                newMatched.length >=
                                currentExercise.pairs.length * 2
                              )
                                setTimeout(() => handleAnswer(true), 500);
                            } else {
                              handleAnswer(false);
                              setMatchSelected({ en: null, kn: null });
                            }
                          } else {
                            setMatchSelected({ ...matchSelected, kn: knVal });
                          }
                        }}
                      >
                        <KannadaWord word={p.kn} size="small" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* MCQ */}
          {currentExercise.type === "mcq" && (
            <div>
              <h2
                style={{
                  fontSize: "clamp(18px,5vw,24px)",
                  marginBottom: "30px",
                  textAlign: "center",
                  fontWeight: "700",
                  lineHeight: "1.5",
                  color: theme.text,
                }}
              >
                {currentExercise.question}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "12px",
                }}
              >
                {shuffledOptions.map((opt, idx) => (
                  <div
                    key={idx}
                    className="chip"
                    style={{
                      padding: "18px 22px",
                      textAlign: "center",
                      color: theme.text,
                    }}
                    onClick={() =>
                      handleAnswer((opt.kn || opt) === currentExercise.answer)
                    }
                  >
                    <KannadaWord word={opt} size="normal" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCRAMBLE */}
          {currentExercise.type === "scramble" && (
            <div>
              <p
                style={{
                  opacity: 0.5,
                  fontSize: "12px",
                  textAlign: "center",
                  marginBottom: "6px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  color: theme.textSecondary,
                }}
              >
                TRANSLATE TO KANNADA
              </p>
              <h2
                style={{
                  margin: "0 0 28px",
                  textAlign: "center",
                  fontSize: "clamp(18px,5vw,22px)",
                  fontWeight: "700",
                  color: theme.text,
                }}
              >
                "{currentExercise.english}"
              </h2>
              <div
                style={{
                  minHeight: "70px",
                  borderBottom: `2px solid ${theme.accent}`,
                  marginBottom: "24px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                  padding: "10px",
                }}
              >
                {scrambleResult.length === 0 ? (
                  <span
                    style={{
                      opacity: 0.3,
                      fontSize: "13px",
                      fontStyle: "italic",
                      color: theme.textSecondary,
                    }}
                  >
                    Tap words below to build your answer
                  </span>
                ) : (
                  scrambleResult.map((word, i) => (
                    <div
                      key={i}
                      className="chip selected"
                      style={{ color: theme.accent }}
                      onClick={() =>
                        setScrambleResult((prev) =>
                          prev.filter((_, idx) => idx !== i),
                        )
                      }
                    >
                      <KannadaWord word={word} size="small" />
                    </div>
                  ))
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "8px",
                  marginBottom: "22px",
                }}
              >
                {currentExercise.jumbled.map((word, i) => {
                  const isUsed = scrambleResult.some(
                    (r) => (r.kn || r) === (word.kn || word),
                  );
                  return (
                    <div
                      key={i}
                      className={`chip ${isUsed ? "disabled" : ""}`}
                      style={{ color: theme.text }}
                      onClick={() =>
                        !isUsed && setScrambleResult([...scrambleResult, word])
                      }
                    >
                      <KannadaWord word={word} size="small" />
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  const resultStr = JSON.stringify(
                    scrambleResult.map((w) => w.kn || w),
                  );
                  const answerStr = JSON.stringify(
                    currentExercise.answer.map((w) => w.kn || w),
                  );
                  handleAnswer(resultStr === answerStr);
                }}
                disabled={scrambleResult.length === 0}
                style={{
                  background:
                    scrambleResult.length === 0
                      ? theme.chipBg
                      : `linear-gradient(135deg,${theme.accent},${theme.accentDark})`,
                  border: "none",
                  width: "100%",
                  padding: "18px",
                  borderRadius: "18px",
                  color: "white",
                  fontWeight: "800",
                  fontSize: "16px",
                  cursor:
                    scrambleResult.length === 0 ? "not-allowed" : "pointer",
                  transition: "all 0.3s",
                  opacity: scrambleResult.length === 0 ? 0.4 : 1,
                }}
              >
                CHECK ANSWER
              </button>
            </div>
          )}
        </div>

        {/* Feedback popup */}
        {feedback && (
          <div
            className="feedback-pop"
            style={{
              background:
                feedback === "correct"
                  ? `linear-gradient(135deg,${theme.accent},${theme.accentDark})`
                  : `linear-gradient(135deg,${theme.wrong},#dc2626)`,
              color: "white",
            }}
          >
            <div style={{ fontSize: "38px", marginBottom: "8px" }}>
              {feedback === "correct" ? "✓" : "✗"}
            </div>
            {feedback === "correct" ? "Correct! +10 XP" : "Oops! Try again"}
          </div>
        )}

        {/* Dark mode toggle */}
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            cursor: "pointer",
            opacity: 0.35,
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "1px",
          }}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ LIGHT MODE" : "🌙 DARK MODE"}
        </div>
      </div>
    </div>
  );
}
