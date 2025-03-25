const TaskCard = ({ task, completeTask }) => {
    return (
      <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px", borderRadius: "5px" }}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        {!task.completed ? (
          <button onClick={() => completeTask(task.id)} style={{ padding: "5px 10px", backgroundColor: "green", color: "white", border: "none", cursor: "pointer" }}>
            Complete Task
          </button>
        ) : (
          <p style={{ color: "blue" }}>✔ Task Completed</p>
        )}
      </div>
    );
  };
  
  export default TaskCard;
  