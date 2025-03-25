import { useState } from "react";
import TaskCard from "../components/TaskCard";

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Analyze Drone Survey", description: "Review the latest aerial images.", completed: false },
    { id: 2, title: "Mark Agricultural Land", description: "Identify farmlands on the map.", completed: false },
    { id: 3, title: "Suggest Road Layout", description: "Propose a new road system.", completed: false }
  ]);

  const completeTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: true } : task));
  };

  return (
    <div>
      <h1>Gamification Tasks</h1>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} completeTask={completeTask} />
      ))}
    </div>
  );
};

export default Tasks;
