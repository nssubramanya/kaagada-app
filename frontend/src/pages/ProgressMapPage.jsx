import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PATH_DATA as pathData } from "../data/CourseData";

// first 2 levels unlocked by default for demo
const UNLOCKED_UP_TO = 2;

function ProgressMapPage() {
  const { path } = useParams();
  const navigate = useNavigate();
  const data = pathData[path];

  if (!data) {
    navigate("/path-select");
    return null;
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          ...styles.header,
          backgroundColor: data.light,
          borderBottom: `3px solid ${data.color}`,
        }}
      >
        <button onClick={() => navigate("/path-select")} style={styles.back}>
          ← Back
        </button>
        <div style={styles.headerInner}>
          <span style={styles.headerEmoji}>{data.emoji}</span>
          <div>
            <h1 style={{ ...styles.headerTitle, color: data.color }}>
              {data.title}
            </h1>
            <p style={styles.headerSub}>
              {data.levels.length} levels · Tap a level to begin
            </p>
          </div>
        </div>

        {/* XP bar */}
        <div style={styles.xpRow}>
          <span style={styles.xpLabel}>Progress</span>
          <div style={styles.xpTrack}>
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(UNLOCKED_UP_TO / data.levels.length) * 100}%`,
              }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ ...styles.xpFill, backgroundColor: data.color }}
            />
          </div>
          <span style={styles.xpLabel}>
            {UNLOCKED_UP_TO}/{data.levels.length}
          </span>
        </div>
      </motion.div>

      {/* Level map */}
      <div style={styles.map}>
        {data.levels.map((level, i) => {
          const unlocked = i < UNLOCKED_UP_TO;
          const completed = i < UNLOCKED_UP_TO - 1;

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              style={{
                ...styles.levelRow,
                justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
              }}
            >
              <motion.div
                whileHover={unlocked ? { scale: 1.08 } : {}}
                whileTap={unlocked ? { scale: 0.95 } : {}}
                onClick={() =>
                  unlocked && navigate(`/lesson/${path}/${level.id}`)
                }
                style={{
                  ...styles.levelCard,
                  backgroundColor: completed
                    ? data.color
                    : unlocked
                      ? data.light
                      : "#f0f0f0",
                  border: `2px solid ${unlocked ? data.color : "#ccc"}`,
                  cursor: unlocked ? "pointer" : "not-allowed",
                  opacity: unlocked ? 1 : 0.5,
                }}
              >
                <span style={styles.levelEmoji}>
                  {unlocked ? level.emoji : "🔒"}
                </span>
                <div>
                  <p
                    style={{
                      ...styles.levelTitle,
                      color: completed
                        ? "white"
                        : unlocked
                          ? data.color
                          : "#999",
                    }}
                  >
                    Level {level.id}
                  </p>
                  <p
                    style={{
                      ...styles.levelName,
                      color: completed ? "rgba(255,255,255,0.85)" : "#555",
                    }}
                  >
                    {level.title}
                  </p>
                </div>
                {completed && <span style={styles.checkmark}>✓</span>}
                {unlocked && !completed && (
                  <span
                    style={{ ...styles.xpBadge, backgroundColor: data.color }}
                  >
                    +{level.xp} XP
                  </span>
                )}
              </motion.div>

              {/* connector line */}
              {i < data.levels.length - 1 && (
                <div
                  style={{
                    ...styles.connector,
                    backgroundColor:
                      i < UNLOCKED_UP_TO - 1 ? data.color : "#ddd",
                    left: i % 2 === 0 ? "120px" : "auto",
                    right: i % 2 === 1 ? "120px" : "auto",
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#fdf6e3",
    fontFamily: "sans-serif",
    paddingBottom: "40px",
  },
  header: {
    padding: "20px 20px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  back: {
    background: "none",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    color: "#555",
    alignSelf: "flex-start",
    padding: 0,
  },
  headerInner: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  headerEmoji: {
    fontSize: "2.5rem",
  },
  headerTitle: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    margin: 0,
  },
  headerSub: {
    color: "#888",
    margin: "4px 0 0",
    fontSize: "0.9rem",
  },
  xpRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  xpLabel: {
    fontSize: "0.8rem",
    color: "#888",
    whiteSpace: "nowrap",
  },
  xpTrack: {
    flex: 1,
    height: "8px",
    backgroundColor: "#ddd",
    borderRadius: "4px",
    overflow: "hidden",
  },
  xpFill: {
    height: "100%",
    borderRadius: "4px",
  },
  map: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "24px 20px",
    position: "relative",
  },
  levelRow: {
    display: "flex",
    position: "relative",
  },
  levelCard: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px 18px",
    borderRadius: "16px",
    width: "260px",
    position: "relative",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  levelEmoji: {
    fontSize: "1.8rem",
  },
  levelTitle: {
    fontWeight: "bold",
    fontSize: "0.8rem",
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  levelName: {
    fontSize: "1rem",
    fontWeight: "bold",
    margin: "2px 0 0",
  },
  checkmark: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  xpBadge: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "white",
    fontSize: "0.75rem",
    fontWeight: "bold",
    padding: "3px 8px",
    borderRadius: "10px",
  },
  connector: {
    position: "absolute",
    bottom: "-8px",
    width: "3px",
    height: "8px",
    borderRadius: "2px",
  },
};

export default ProgressMapPage;
