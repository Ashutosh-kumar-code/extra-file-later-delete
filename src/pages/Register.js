import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`User Registered! Name: ${name}, Email: ${email}`);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ margin: "5px", padding: "8px" }} /><br />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ margin: "5px", padding: "8px" }} /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ margin: "5px", padding: "8px" }} /><br />
        <button type="submit" style={{ padding: "10px", backgroundColor: "green", color: "white" }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
