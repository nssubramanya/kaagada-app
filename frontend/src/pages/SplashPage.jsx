import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fdf6e3",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "#d35400" }}>ಕನ್ನಡ</h1>
      <p style={{ color: "#888", fontSize: "1.2rem" }}>Loading...</p>
    </div>
  );
}

export default SplashPage;
