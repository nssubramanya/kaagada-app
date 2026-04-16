import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  "ನಮಸ್ಕಾರ! I'm Kannu, your Kannada guide! 👋",
  "Kannada is spoken by over 45 million people across Karnataka 🌍",
  "We'll learn real phrases locals use every day 🗣️",
  "You'll unlock levels, earn XP, and build streaks 🔥",
  "Ready to start your journey? Let's go! 🚀",
];

function IntroPage() {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [typing, setTyping] = useState(true);

  // typewriter effect
  useEffect(() => {
    setDisplayedText("");
    setTyping(true);
    const text = slides[slideIndex];
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(interval);
        setTyping(false);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [slideIndex]);

  const handleNext = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      navigate("/path-select");
    }
  };

  const isLast = slideIndex === slides.length - 1;

  return (
    <div style={styles.container}>
      {/* Progress dots */}
      <div style={styles.dots}>
        {slides.map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.dot,
              backgroundColor: i === slideIndex ? "#d35400" : "#ddd",
              transform: i === slideIndex ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* Thought bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slideIndex}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          style={styles.bubble}
        >
          <p style={styles.bubbleText}>{displayedText}</p>
          {/* bubble tail */}
          <div style={styles.tail} />
        </motion.div>
      </AnimatePresence>

      {/* Mascot */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        style={styles.mascot}
      >
        {/* face */}
        <div style={styles.face}>
          {/* eyes */}
          <div style={styles.eyes}>
            <div style={styles.eye}>
              <div style={styles.pupil} />
            </div>
            <div style={styles.eye}>
              <div style={styles.pupil} />
            </div>
          </div>
          {/* smile */}
          <div style={styles.smile} />
        </div>
        {/* body */}
        <div style={styles.body}>
          <span style={styles.bodyText}>ಕ</span>
        </div>
        {/* feet */}
        <div style={styles.feet}>
          <div style={styles.foot} />
          <div style={styles.foot} />
        </div>
      </motion.div>

      {/* Button */}
      <motion.button
        onClick={handleNext}
        whileTap={{ scale: 0.95 }}
        style={{
          ...styles.button,
          backgroundColor: typing ? "#ccc" : "#d35400",
          cursor: typing ? "default" : "pointer",
        }}
        disabled={typing}
      >
        {isLast ? "🚀 Let's Go!" : "Next →"}
      </motion.button>

      {/* Skip */}
      {!isLast && (
        <span style={styles.skip} onClick={() => navigate("/path-select")}>
          Skip intro
        </span>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#fdf6e3",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif",
    padding: "24px",
    gap: "24px",
  },
  dots: {
    display: "flex",
    gap: "8px",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    transition: "all 0.3s",
  },
  bubble: {
    backgroundColor: "white",
    border: "2px solid #d35400",
    borderRadius: "20px",
    padding: "20px 28px",
    maxWidth: "340px",
    minHeight: "80px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  bubbleText: {
    fontSize: "1.05rem",
    color: "#333",
    textAlign: "center",
    lineHeight: "1.6",
    margin: 0,
  },
  tail: {
    position: "absolute",
    bottom: "-18px",
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderTop: "18px solid #d35400",
  },
  mascot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "12px",
  },
  face: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    backgroundColor: "#f39c12",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    border: "3px solid #d35400",
  },
  eyes: {
    display: "flex",
    gap: "14px",
  },
  eye: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pupil: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#222",
  },
  smile: {
    width: "32px",
    height: "16px",
    borderRadius: "0 0 16px 16px",
    border: "3px solid #222",
    borderTop: "none",
  },
  body: {
    width: "70px",
    height: "60px",
    backgroundColor: "#d35400",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "4px",
  },
  bodyText: {
    fontSize: "1.8rem",
    color: "white",
    fontWeight: "bold",
  },
  feet: {
    display: "flex",
    gap: "16px",
    marginTop: "4px",
  },
  foot: {
    width: "22px",
    height: "12px",
    backgroundColor: "#d35400",
    borderRadius: "0 0 8px 8px",
  },
  button: {
    padding: "14px 40px",
    borderRadius: "12px",
    border: "none",
    color: "white",
    fontSize: "1.1rem",
    fontWeight: "bold",
    transition: "background-color 0.3s",
    marginTop: "8px",
  },
  skip: {
    color: "#aaa",
    fontSize: "0.9rem",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default IntroPage;
