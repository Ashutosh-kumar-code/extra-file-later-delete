import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; 
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

import MapViewer from "./components/MapViewer";
import Tasks from "./components/Tasks";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import Chat from "./pages/Chat";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
 const [users, setUsers] = useState([]);
      const fetchUsers = async () => {
          try {
              const res = await axios.get('http://localhost:5000/users');
              setUsers(res.data.filter(user => user._id !== userId));
          } catch (error) {
              console.error(error);
          }
      };

       useEffect(() => {
              fetchUsers();
       },[] )

  const userId = users[3]?._id; 

  return (
    <>   
        {/* <Router>
       <Navbar />
       <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/map" element={<MapViewer />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router> */}
    <div>
            <h2>Chat App</h2>
            <Chat userId={userId} />
        </div>
    </>

  );
}

export default App;
