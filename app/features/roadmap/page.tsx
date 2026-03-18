"use client";

import React, { useState } from "react";

interface RoadmapPath {
  title: string;
  category: "UI/UX" | "Frontend" | "Backend";
  skills: string[];
}

const roadmapPaths: RoadmapPath[] = [
  {
    title: "Find a new path",
    category: "UI/UX",
    skills: ["Design Fundamentals", "Figma", "User Research", "Prototyping"],
  },
  {
    title: "Become a Frontend Developer",
    category: "Frontend",
    skills: ["HTML/CSS", "JavaScript", "React", "Next.js", "TypeScript"],
  },
  {
    title: "Master Backend Development",
    category: "Backend",
    skills: ["Node.js", "Databases", "APIs", "System Design", "DevOps"],
  },
];

const RoadmapPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    "UI/UX" | "Frontend" | "Backend"
  >("UI/UX");
  const [selectedPath, setSelectedPath] = useState<RoadmapPath | null>(null);

  const categories: ("UI/UX" | "Frontend" | "Backend")[] = [
    "UI/UX",
    "Frontend",
    "Backend",
  ];

  const filteredPath =
    roadmapPaths.find((p) => p.category === selectedCategory) || null;

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "var(--bg-color)",
        padding: "3rem 2rem",
        gap: "2rem",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#fff",
            fontFamily: "var(--font-nova-square)",
            margin: 0,
          }}
        >
          Roadmap
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "#b0b0b0",
            margin: 0,
          }}
        >
          Discover where you stand...
        </p>
      </div>

      {/* Controls Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Dropdown Filter */}
        <select
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "20px",
            backgroundColor: "#e8f5e9",
            color: "#000",
            border: "none",
            fontSize: "0.9rem",
            fontWeight: 500,
            cursor: "pointer",
            minWidth: "200px",
          }}
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value as "UI/UX" | "Frontend" | "Backend")
          }
        >
          <option value="">Find a new path</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Toggle Buttons */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                backgroundColor:
                  selectedCategory === cat ? "#2c5aa0" : "transparent",
                color: selectedCategory === cat ? "#fff" : "#b0b0b0",
                border: selectedCategory === cat ? "none" : "1px solid #404040",
                fontSize: "0.85rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ marginLeft: "auto" }} />

        {/* Expand/Bookmark Icons */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <button
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              backgroundColor: "transparent",
              border: "1px solid #404040",
              color: "#b0b0b0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
            }}
            title="Expand"
          >
            ⤢
          </button>
          <button
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              backgroundColor: "transparent",
              border: "1px solid #404040",
              color: "#b0b0b0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
            }}
            title="Bookmark"
          >
            🔖
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "1.5rem",
          minHeight: "500px",
        }}
      >
        {/* Paths List */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {roadmapPaths.map((path) => (
            <div
              key={path.title}
              onClick={() => setSelectedPath(path)}
              style={{
                padding: "1rem",
                borderRadius: "12px",
                backgroundColor:
                  selectedPath?.title === path.title ? "#2c5aa0" : "#1a1a1a",
                color: "#fff",
                cursor: "pointer",
                transition: "all 0.2s ease",
                border:
                  selectedPath?.title === path.title
                    ? "2px solid #3d7ac4"
                    : "1px solid #404040",
              }}
            >
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "#b0b0b0",
                  marginBottom: "0.25rem",
                }}
              >
                {path.category}
              </div>
              <div style={{ fontSize: "0.95rem", fontWeight: 500 }}>
                {path.title}
              </div>
            </div>
          ))}
        </div>

        {/* Preview Area */}
        <div
          style={{
            padding: "2rem",
            borderRadius: "12px",
            backgroundColor: "#0f0f0f",
            border: "1px solid #2c5aa0",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #404040",
              paddingBottom: "1rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.3rem",
                color: "#fff",
                fontFamily: "var(--font-nova-square)",
                margin: 0,
              }}
            >
              Roadmap Preview
            </h2>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
              }}
            >
              <button
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "6px",
                  backgroundColor: "transparent",
                  border: "1px solid #404040",
                  color: "#b0b0b0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                }}
                title="Expand"
              >
                ⤢
              </button>
              <button
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "6px",
                  backgroundColor: "transparent",
                  border: "1px solid #404040",
                  color: "#b0b0b0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                }}
                title="Bookmark"
              >
                🔖
              </button>
            </div>
          </div>

          {selectedPath ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    color: "#fff",
                    marginTop: 0,
                    marginBottom: "0.5rem",
                  }}
                >
                  {selectedPath.title}
                </h3>
                <p
                  style={{
                    color: "#b0b0b0",
                    margin: 0,
                    fontSize: "0.9rem",
                  }}
                >
                  {selectedPath.category} Learning Path
                </p>
              </div>

              <div>
                <h4
                  style={{
                    fontSize: "0.95rem",
                    color: "#e8f5e9",
                    marginTop: 0,
                    marginBottom: "1rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Key Skills
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {selectedPath.skills.map((skill) => (
                    <div
                      key={skill}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.75rem",
                        borderRadius: "8px",
                        backgroundColor: "#1a1a1a",
                        borderLeft: "3px solid #e8f5e9",
                      }}
                    >
                      <input
                        type="checkbox"
                        style={{
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                          accentColor: "#2c5aa0",
                        }}
                        defaultChecked={false}
                      />
                      <span style={{ color: "#fff", fontSize: "0.9rem" }}>
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "300px",
                color: "#606060",
                fontSize: "1rem",
              }}
            >
              Select a path to view details
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default RoadmapPage;
