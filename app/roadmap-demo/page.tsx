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
    backgroundColor: "var(--bg-color)",
    display: "flex",
    color: "#fff",
    fontFamily: "var(--font-jura), system-ui, sans-serif",
  };

  const sidebarStyle: CSSProperties = {
    width: "140px",
    backgroundColor: "var(--bg-color)",
    borderRight: "1px solid var(--form-grey)",
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
    padding: "30px",
    overflow: "auto",
    gap: "20px",
  };

  const folderContainerStyle: CSSProperties = {
    backgroundColor: "#C4C4C4",
    borderRadius: "24px",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    flex: 1,
    position: "relative",
  };

  const headerContainerStyle: CSSProperties = {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  };

  const titleStyle: CSSProperties = {
    fontSize: "28px",
    fontWeight: "bold",
    fontFamily: "var(--font-nova-square)",
    color: "#1a1a1a",
    margin: 0,
  };

  const bannerStyle: CSSProperties = {
    backgroundColor: "var(--meduim-blue)",
    borderRadius: "20px",
    padding: "12px 24px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
    marginLeft: "auto",
  };

  const controlsStyle: CSSProperties = {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    flexWrap: "wrap",
  };

  const previewContainerStyle: CSSProperties = {
    backgroundColor: "var(--dark-blue)",
    borderRadius: "16px",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "35px",
    border: "1px solid var(--meduim-blue)",
    flex: 1,
    overflow: "auto",
    position: "relative",
  };

  const rowContainerStyle: CSSProperties = {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };

  const stepBoxStyle = (completed: boolean): CSSProperties => ({
    padding: "16px 28px",
    backgroundColor: completed ? "var(--meduim-blue)" : "#BABABA",
    color: completed ? "#fff" : "#0a0a0a",
    borderRadius: "18px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    border: "none",
    transition: "all 0.3s ease",
    opacity: completed ? 0.7 : 1,
    textDecoration: completed ? "line-through" : "none",
    whiteSpace: "nowrap",
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
                color: item === "Roadmap" ? "var(--primary-green)" : "var(--text-grey)",
              }}
            >
              {item}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={mainStyle}>
        {/* Folder Container */}
        <div style={folderContainerStyle}>
          {/* Header with Title and Banner */}
          <div style={headerContainerStyle}>
            <h1 style={titleStyle}>Roadmap</h1>
            <div style={bannerStyle}>Discover where you stand...</div>
          </div>

          {/* Controls */}
          <div style={controlsStyle}>
            <select
              style={{
                padding: "10px 18px",
                borderRadius: "20px",
                border: "2px solid #666",
                backgroundColor: "#8a8a8a",
                color: "#fff",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "inherit",
              }}
            >
              <option>Find a new path</option>
            </select>

            <div style={{ display: "flex", gap: "10px" }}>
              {["UI/UX", "Frontend", "Backend"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: selectedCategory === cat ? "var(--primary-green)" : "var(--meduim-blue)",
                    color: selectedCategory === cat ? "#1a1a1a" : "#fff",
                    fontSize: "13px",
                    fontWeight: "600",
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button style={{ marginLeft: "auto", padding: "8px 16px", color: "var(--meduim-blue)", cursor: "pointer", fontSize: "16px", background: "none", border: "none" }}>
              ⟩
            </button>
          </div>

          {/* Roadmap Preview */}
          <div style={previewContainerStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontSize: "16px", fontWeight: "600", margin: 0, color: "#fff" }}>Roadmap Preview</h2>
              <div style={{ display: "flex", gap: "8px" }}>
                <button style={{ width: "32px", height: "32px", backgroundColor: "transparent", border: "1px solid var(--meduim-blue)", borderRadius: "4px", color: "#fff", cursor: "pointer", fontSize: "14px" }}>
                  ⛶
                </button>
                <button style={{ width: "32px", height: "32px", backgroundColor: "transparent", border: "1px solid var(--meduim-blue)", borderRadius: "4px", color: "#fff", cursor: "pointer", fontSize: "14px" }}>
                  🔖
                </button>
              </div>
            </div>

            {currentFlow.map((row, rowIndex) => (
              <div key={rowIndex} style={rowContainerStyle}>
                {row.steps.map((step, stepIndex) => (
                  <div key={step.id} style={{ position: "relative", display: "flex", alignItems: "center" }}>
                    <button
                      onClick={() => toggleStep(step.id)}
                      style={stepBoxStyle(completedSteps.has(step.id))}
                    >
                      {step.label}
                    </button>
                    {stepIndex < row.steps.length - 1 && (
                      <svg
                        width="45"
                        height="45"
                        style={{ position: "absolute", left: "100%", top: "50%", transform: "translateY(-50%)" }}
                        viewBox="0 0 45 45"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M 0 22.5 Q 22.5 5, 45 22.5"
                          stroke="#B8D9F6"
                          strokeWidth="2.5"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
