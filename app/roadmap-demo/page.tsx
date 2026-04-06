"use client";

import React, { useState, CSSProperties } from "react";

interface Step {
  id: string;
  label: string;
  completed: boolean;
}

interface Row {
  steps: Step[];
}

export default function RoadmapDemoPage() {
  const [selectedCategory, setSelectedCategory] = useState("UI/UX");
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const roadmapFlows: Record<string, Row[]> = {
    "UI/UX": [
      { steps: [
        { id: "uiux-1", label: "Step 1", completed: false },
        { id: "uiux-2", label: "Step 2", completed: false },
        { id: "uiux-3", label: "Step 3", completed: false },
        { id: "uiux-4", label: "Step 4", completed: false },
      ]},
      { steps: [
        { id: "uiux-5", label: "Step 7", completed: false },
        { id: "uiux-6", label: "Step 7", completed: false },
        { id: "uiux-7", label: "Step 7", completed: false },
        { id: "uiux-8", label: "Step 5", completed: false },
      ]},
      { steps: [
        { id: "uiux-9", label: "Step 7", completed: false },
        { id: "uiux-10", label: "Step 7", completed: false },
        { id: "uiux-11", label: "Step 7", completed: false },
        { id: "uiux-12", label: "Step 7", completed: false },
      ]},
    ],
    Frontend: [
      { steps: [
        { id: "fe-1", label: "HTML", completed: false },
        { id: "fe-2", label: "CSS", completed: false },
        { id: "fe-3", label: "JavaScript", completed: false },
        { id: "fe-4", label: "React", completed: false },
      ]},
      { steps: [
        { id: "fe-5", label: "State Mgmt", completed: false },
        { id: "fe-6", label: "APIs", completed: false },
        { id: "fe-7", label: "TypeScript", completed: false },
        { id: "fe-8", label: "Testing", completed: false },
      ]},
      { steps: [
        { id: "fe-9", label: "Next.js", completed: false },
        { id: "fe-10", label: "Performance", completed: false },
        { id: "fe-11", label: "Deployment", completed: false },
        { id: "fe-12", label: "Advanced", completed: false },
      ]},
    ],
    Backend: [
      { steps: [
        { id: "be-1", label: "Node.js", completed: false },
        { id: "be-2", label: "Express", completed: false },
        { id: "be-3", label: "Databases", completed: false },
        { id: "be-4", label: "APIs", completed: false },
      ]},
      { steps: [
        { id: "be-5", label: "Auth", completed: false },
        { id: "be-6", label: "Caching", completed: false },
        { id: "be-7", label: "Queues", completed: false },
        { id: "be-8", label: "Testing", completed: false },
      ]},
      { steps: [
        { id: "be-9", label: "Microservices", completed: false },
        { id: "be-10", label: "DevOps", completed: false },
        { id: "be-11", label: "Scaling", completed: false },
        { id: "be-12", label: "Security", completed: false },
      ]},
    ],
  };

  const toggleStep = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const currentFlow = roadmapFlows[selectedCategory] || [];

  const containerStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    overflow: "hidden",
    backgroundColor: "#0a0e27",
    display: "flex",
    color: "#fff",
    fontFamily: "var(--font-jura), system-ui, sans-serif",
  };

  const sidebarStyle: CSSProperties = {
    width: "140px",
    backgroundColor: "#0a0e27",
    borderRight: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "20px 10px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    overflowY: "auto",
  };

  const mainStyle: CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "30px 40px",
    overflow: "auto",
  };

  const headerStyle: CSSProperties = {
    marginBottom: "25px",
  };

  const titleStyle: CSSProperties = {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "10px",
    fontFamily: "var(--font-nova-square)",
  };

  const controlsStyle: CSSProperties = {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
  };

  const previewContainerStyle: CSSProperties = {
    flex: 1,
    backgroundColor: "#0f1929",
    borderRadius: "20px",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    overflowY: "auto",
    position: "relative",
  };

  const rowStyle: CSSProperties = {
    display: "flex",
    gap: "30px",
    alignItems: "center",
    justifyContent: "center",
  };

  const stepBoxStyle = (completed: boolean): CSSProperties => ({
    padding: "20px 30px",
    backgroundColor: completed ? "#4a5a8a" : "#b8d9f6",
    color: completed ? "#fff" : "#0a0e27",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    minWidth: "100px",
    textAlign: "center",
    transition: "all 0.3s ease",
    opacity: completed ? 0.7 : 1,
    textDecoration: completed ? "line-through" : "none",
  });

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>CareerICS</div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {["Home", "Career Quiz", "Roadmap", "Courses", "Skill Assessment", "CV Grafting", "Mock Interview", "Job Applications"].map((item) => (
            <div
              key={item}
              style={{
                padding: "10px",
                borderRadius: "6px",
                fontSize: "12px",
                cursor: "pointer",
                backgroundColor: item === "Roadmap" ? "rgba(184, 239, 70, 0.2)" : "transparent",
                color: item === "Roadmap" ? "#B8EF46" : "#999",
              }}
            >
              {item}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={mainStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>Roadmap</h1>
        </div>

        {/* Top Banner & Controls */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "25px", alignItems: "center" }}>
          <select
            style={{
              padding: "12px 20px",
              borderRadius: "25px",
              border: "2px solid #666",
              backgroundColor: "#1a1f3a",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              fontFamily: "inherit",
            }}
          >
            <option>Find a new path</option>
          </select>

          <div style={{ display: "flex", gap: "12px" }}>
            {["UI/UX", "Frontend", "Backend"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: selectedCategory === cat ? "#B8EF46" : "#2c5aa0",
                  color: selectedCategory === cat ? "#000" : "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "all 0.2s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ marginLeft: "auto", padding: "10px 20px", backgroundColor: "#2c5aa0", borderRadius: "25px", fontSize: "14px" }}>
            Discover where you stand...
          </div>
        </div>

        {/* Roadmap Preview */}
        <div style={previewContainerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>Roadmap Preview</h2>
            <div style={{ display: "flex", gap: "10px" }}>
              <button style={{ width: "36px", height: "36px", backgroundColor: "#1a1f3a", border: "1px solid #666", borderRadius: "6px", color: "#fff", cursor: "pointer", fontSize: "16px" }}>
                ⛶
              </button>
              <button style={{ width: "36px", height: "36px", backgroundColor: "#1a1f3a", border: "1px solid #666", borderRadius: "6px", color: "#fff", cursor: "pointer", fontSize: "16px" }}>
                📌
              </button>
            </div>
          </div>

          {currentFlow.map((row, rowIndex) => (
            <div key={rowIndex} style={rowStyle}>
              {row.steps.map((step, stepIndex) => (
                <div key={step.id}>
                  <button
                    onClick={() => toggleStep(step.id)}
                    style={stepBoxStyle(completedSteps.has(step.id))}
                  >
                    {step.label}
                  </button>
                  {stepIndex < row.steps.length - 1 && (
                    <svg
                      style={{
                        position: "absolute",
                        width: "40px",
                        height: "60px",
                        marginLeft: "-20px",
                        marginTop: "-30px",
                      }}
                      viewBox="0 0 40 60"
                      preserveAspectRatio="none"
                    >
                      <path d="M 0 30 Q 20 0, 40 30" stroke="#b8d9f6" strokeWidth="2" fill="none" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
