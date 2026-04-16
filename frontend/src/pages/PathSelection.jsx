import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PATHS as paths } from "../data/CourseData";

function PathSelection() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={styles.header}
      >
        <h1 style={styles.title}>Choose your path</h1>
        <p style={styles.subtitle}>You can switch anytime from your profile</p>
      </motion.div>

      <div style={styles.cards}>
        {paths.map((path, i) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/progress/${path.id}`)}
            style={{
              ...styles.card,
              backgroundColor: path.light,
              borderColor: path.color,
            }}
          >
            {/* Tag */}
            <div style={{ ...styles.tag, backgroundColor: path.color }}>
              {path.tag}
            </div>

            {/* Emoji */}
            <div style={{ ...styles.emojiBox, backgroundColor: path.color }}>
              <span style={styles.emoji}>{path.emoji}</span>
            </div>

            {/* Text */}
            <h2 style={{ ...styles.cardTitle, color: path.color }}>
              {path.title}
            </h2>
            <p style={styles.cardDesc}>{path.description}</p>

            {/* Footer */}
            <div style={styles.cardFooter}>
              <span
                style={{
                  ...styles.levelBadge,
                  color: path.color,
                  borderColor: path.color,
                }}
              >
                {path.levels} levels
              </span>
              <span style={{ ...styles.startBtn, backgroundColor: path.color }}>
                Start →
              </span>
            </div>
          </motion.div>
        ))}
      </div>
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
    padding: "32px 16px",
    gap: "32px",
  },
  header: {
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    color: "#222",
    margin: 0,
  },
  subtitle: {
    color: "#888",
    marginTop: "8px",
  },
  cards: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    maxWidth: "400px",
  },
  card: {
    borderRadius: "20px",
    border: "2px solid",
    padding: "24px",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  tag: {
    position: "absolute",
    top: "16px",
    right: "16px",
    color: "white",
    fontSize: "0.7rem",
    fontWeight: "bold",
    padding: "4px 10px",
    borderRadius: "20px",
  },
  emojiBox: {
    width: "56px",
    height: "56px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: "1.8rem",
  },
  cardTitle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    margin: 0,
  },
  cardDesc: {
    color: "#555",
    fontSize: "0.95rem",
    lineHeight: "1.5",
    margin: 0,
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "4px",
  },
  levelBadge: {
    fontSize: "0.85rem",
    fontWeight: "bold",
    border: "1.5px solid",
    borderRadius: "20px",
    padding: "4px 12px",
  },
  startBtn: {
    color: "white",
    fontSize: "0.9rem",
    fontWeight: "bold",
    padding: "8px 20px",
    borderRadius: "12px",
  },
};

export default PathSelection;
