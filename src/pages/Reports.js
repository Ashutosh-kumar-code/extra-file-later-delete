import { useState } from "react";

const Reports = () => {
  const [report, setReport] = useState(null);

  const generateReport = () => {
    const demoReport = {
      title: "Rural Development Progress",
      totalTasks: 3,
      completedTasks: 2,
      pendingTasks: 1,
      insights: "Majority of farmlands identified, but road planning is incomplete."
    };
    setReport(demoReport);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Generate Reports</h1>
      <button onClick={generateReport} style={{ padding: "10px", backgroundColor: "green", color: "white", cursor: "pointer" }}>
        Generate Report
      </button>

      {report && (
        <div style={{ marginTop: "20px", border: "1px solid #ddd", padding: "10px" }}>
          <h2>{report.title}</h2>
          <p>Total Tasks: {report.totalTasks}</p>
          <p>Completed Tasks: {report.completedTasks}</p>
          <p>Pending Tasks: {report.pendingTasks}</p>
          <p><strong>Insights:</strong> {report.insights}</p>
        </div>
      )}
    </div>
  );
};

export default Reports;
