import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to Rural Planning Gamification</h1>
      <p>Use drone maps, GIS data, and tasks to improve rural planning.</p>
      <Link to="/tasks">
        <button style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
          Start Planning
        </button>
      </Link>
    </div>
  );
};

export default Home;
