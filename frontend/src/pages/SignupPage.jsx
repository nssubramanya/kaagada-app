import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // no real auth yet — navigate to intro
    navigate("/intro");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>ಕನ್ನಡ ಕಲಿಯಿರಿ</h1>
      <p style={styles.subtitle}>Create your account</p>

      <form onSubmit={handleSignup} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button style={styles.button} type="submit">
          Sign Up
        </button>
      </form>

      <p style={styles.switchText}>
        Already have an account?{" "}
        <span style={styles.link} onClick={() => navigate("/login")}>
          Log in
        </span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fdf6e3",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "2rem",
    color: "#d35400",
    marginBottom: "4px",
  },
  subtitle: {
    color: "#888",
    marginBottom: "32px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "300px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#d35400",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "4px",
  },
  switchText: {
    marginTop: "20px",
    color: "#888",
  },
  link: {
    color: "#d35400",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default SignupPage;
