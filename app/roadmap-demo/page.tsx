"use client";

import React, { useState } from "react";

export default function RoadmapDemoPage() {
  const [selectedPath, setSelectedPath] = useState("Find a new path");
  const [selectedCategory, setSelectedCategory] = useState("Frontend");
  const [checkedSkills, setCheckedSkills] = useState<Record<string, boolean>>({});

  const roadmapData: Record<string, Record<string, string[]>> = {
    Frontend: {
      "HTML & CSS": ["HTML Basics", "CSS Grid", "CSS Flexbox", "Responsive Design"],
      "JavaScript": ["Variables & Data Types", "DOM Manipulation", "ES6+", "Async/Await"],
      "React": ["Components", "Hooks", "State Management", "React Router"],
      "Advanced": ["Next.js", "TypeScript", "Performance Optimization", "Testing"],
    },
    Backend: {
      "Node.js": ["Express.js", "REST APIs", "Middleware", "Error Handling"],
      "Databases": ["SQL Basics", "PostgreSQL", "MongoDB", "Database Design"],
      "Authentication": ["JWT", "OAuth", "Password Hashing", "Session Management"],
      "Advanced": ["Caching", "Message Queues", "Microservices", "DevOps"],
    },
    "UI/UX": {
      "Design Fundamentals": ["Color Theory", "Typography", "Layout", "Accessibility"],
      "Prototyping": ["Figma", "Wireframing", "User Flows", "Mockups"],
      "User Research": ["User Testing", "Analytics", "A/B Testing", "Surveys"],
      "Advanced": ["Design Systems", "Motion Design", "Interaction Design", "UX Writing"],
    },
  };

  const toggleSkill = (section: string, skill: string) => {
    const key = `${section}-${skill}`;
    setCheckedSkills((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const currentData = roadmapData[selectedCategory] || {};

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        backgroundColor: "#0a0e27",
        display: "flex",
        color: "#fff",
        fontFamily: "var(--font-jura), system-ui, sans-serif",
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: "120px",
          backgroundColor: "#0a0e27",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "20px 10px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          overflowY: "auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>C</div>
          <div style={{ fontSize: "10px", marginTop: "5px" }}>Career</div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {["Home", "Career Quiz", "Roadmap", "Courses"].map((item) => (
            <div
              key={item}
              style={{
                padding: "8px 10px",
                borderRadius: "6px",
                fontSize: "12px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor:
                  item === "Roadmap" ? "rgba(184, 239, 70, 0.2)" : "transparent",
                color: item === "Roadmap" ? "#B8EF46" : "#ccc",
              }}
            >
              {item}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px" }}>
        {/* Header */}
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "32px", marginBottom: "10px", fontFamily: "var(--font-nova-square)" }}>
            Roadmap
          </h1>
          <p style={{ color: "#aaa", fontSize: "14px" }}>Discover where you stand...</p>
        </div>

        {/* Controls Section */}
        <div
          style={{
            backgroundColor: "#1a1f3a",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
            display: "flex",
            gap: "15px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* Dropdown */}
          <select
            value={selectedPath}
            onChange={(e) => setSelectedPath(e.target.value)}
            style={{
              padding: "10px 15px",
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backgroundColor: "#2a2f4a",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            <option>Find a new path</option>
            <option>Switch careers</option>
            <option>Upskill existing</option>
          </select>

          {/* Toggle Buttons */}
          <div style={{ display: "flex", gap: "10px" }}>
            {["UI/UX", "Frontend", "Backend"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor:
                    selectedCategory === cat ? "#B8EF46" : "#2a2f4a",
                  color: selectedCategory === cat ? "#000" : "#fff",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.3s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Preview Area */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#1a1f3a",
            borderRadius: "12px",
            padding: "30px",
            overflowY: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {Object.entries(currentData).map(([section, skills]) => (
            <div
              key={section}
              style={{
                backgroundColor: "#242a45",
                borderRadius: "10px",
                padding: "20px",
                border: "1px solid rgba(184, 239, 70, 0.2)",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  marginBottom: "15px",
                  color: "#B8EF46",
                  fontWeight: "600",
                }}
              >
                {section}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {skills.map((skill) => {
                  const key = `${section}-${skill}`;
                  const isChecked = checkedSkills[key] || false;
                  return (
                    <label
                      key={skill}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                        fontSize: "14px",
                        color: isChecked ? "#aaa" : "#ddd",
                        textDecoration: isChecked ? "line-through" : "none",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSkill(section, skill)}
                        style={{
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                          accentColor: "#B8EF46",
                        }}
                      />
                      {skill}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
