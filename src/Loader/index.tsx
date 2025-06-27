
const Loader = () => (
  <div style={{
    display: "flex", flexDirection: "column", justifyContent: "center",
    alignItems: "center", height: "100vh", fontSize: "1.2rem"
  }}>
    <div style={{
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #d92727",
      borderRadius: "50%",
      width: "50px",
      height: "50px",
      animation: "spin 1s linear infinite"
    }} />
    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    <p style={{ marginTop: "1rem", color:"gray" }}>Waking up the backend...</p>
  </div>
);

export default Loader;
