"use client";

import { useState, CSSProperties } from "react";

interface Step {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
}

interface Section {
  id: string;
  title: string;
  steps: Step[];
}

const mockRoadmap: Section[] = [
  {
    id: "1",
    title: "Fundamentals",
    steps: [
      {
        id: "1-1",
        title: "HTML Basics",
        description: "Learn semantic HTML structure",
        isCompleted: true,
      },
      {
        id: "1-2",
        title: "CSS Styling",
        description: "Master CSS layouts and positioning",
        isCompleted: true,
      },
      {
        id: "1-3",
        title: "JavaScript Essentials",
        description: "Core JS concepts and DOM manipulation",
        isCompleted: false,
      },
      {
        id: "1-4",
        title: "Responsive Design",
        description: "Mobile-first approach and media queries",
        isCompleted: false,
      },
    ],
  },
  {
    id: "2",
    title: "Frontend Frameworks",
    steps: [
      {
        id: "2-1",
        title: "React Basics",
        description: "Components, hooks, and state management",
        isCompleted: false,
      },
      {
        id: "2-2",
        title: "Next.js Introduction",
        description: "Server-side rendering and static generation",
        isCompleted: false,
      },
      {
        id: "2-3",
        title: "TypeScript Fundamentals",
        description: "Type safety and advanced types",
        isCompleted: false,
      },
    ],
  },
  {
    id: "3",
    title: "Advanced Concepts",
    steps: [
      {
        id: "3-1",
        title: "Performance Optimization",
        description: "Code splitting and lazy loading",
        isCompleted: false,
      },
      {
        id: "3-2",
        title: "State Management",
        description: "Redux, Context API, and alternatives",
        isCompleted: false,
      },
    ],
  },
];

function StepItem({
  step,
  onToggle,
}: {
  step: Step;
  onToggle: (stepId: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
    padding: "1rem",
    borderRadius: "8px",
    backgroundColor: step.isCompleted ? "#1a2332" : "#0f1419",
    border: "1px solid #2c3e50",
    cursor: "pointer",
    transition: "all 0.2s ease",
    ...(isHovered && {
      backgroundColor: "#1a2a3a",
      borderColor: "#3d5a80",
    }),
  };

  const checkboxStyle: CSSProperties = {
    width: "20px",
    height: "20px",
    minWidth: "20px",
    marginTop: "0.15rem",
    cursor: "pointer",
    accentColor: "#B8EF46",
  };

  const textStyle: CSSProperties = {
    flex: 1,
  };

  const titleStyle: CSSProperties = {
    fontSize: "0.95rem",
    fontWeight: 500,
    color: step.isCompleted ? "#888" : "#fff",
    textDecoration: step.isCompleted ? "line-through" : "none",
    margin: 0,
  };

  const descriptionStyle: CSSProperties = {
    fontSize: "0.85rem",
    color: step.isCompleted ? "#666" : "#b0b0b0",
    margin: "0.25rem 0 0 0",
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onToggle(step.id)}
    >
      <input
        type="checkbox"
        checked={step.isCompleted}
        onChange={() => {}}
        style={checkboxStyle}
      />
      <div style={textStyle}>
        <p style={titleStyle}>{step.title}</p>
        {step.description && <p style={descriptionStyle}>{step.description}</p>}
      </div>
    </div>
  );
}

function SectionBlock({
  section,
  onStepToggle,
}: {
  section: Section;
  onStepToggle: (stepId: string) => void;
}) {
  const completedCount = section.steps.filter((s) => s.isCompleted).length;
  const totalCount = section.steps.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "0.75rem",
    borderBottom: "1px solid #2c3e50",
  };

  const titleStyle: CSSProperties = {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#fff",
    margin: 0,
  };

  const progressTextStyle: CSSProperties = {
    fontSize: "0.85rem",
    color: "#b0b0b0",
  };

  const progressBarContainerStyle: CSSProperties = {
    width: "120px",
    height: "6px",
    backgroundColor: "#1a2a3a",
    borderRadius: "3px",
    overflow: "hidden",
  };

  const progressBarFillStyle: CSSProperties = {
    height: "100%",
    width: `${progressPercent}%`,
    backgroundColor: "#B8EF46",
    transition: "width 0.3s ease",
  };

  const stepsContainerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>{section.title}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={progressTextStyle}>
            {completedCount}/{totalCount}
          </span>
          <div style={progressBarContainerStyle}>
            <div style={progressBarFillStyle} />
          </div>
        </div>
      </div>

      <div style={stepsContainerStyle}>
        {section.steps.map((step) => (
          <StepItem
            key={step.id}
            step={step}
            onToggle={onStepToggle}
          />
        ))}
      </div>
    </div>
  );
}

export default function RoadmapDesignDemo() {
  const [sections, setSections] = useState<Section[]>(mockRoadmap);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleStepToggle = (stepId: string) => {
    setSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        steps: section.steps.map((step) =>
          step.id === stepId ? { ...step, isCompleted: !step.isCompleted } : step
        ),
      }))
    );
  };

  const pageStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#0a0e13",
    color: "#fff",
    padding: isFullscreen ? "0" : "2rem",
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: isFullscreen ? "0" : "2rem",
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "1rem",
    marginBottom: isFullscreen ? "1rem" : "0",
    paddingBottom: isFullscreen ? "1rem" : "0",
    paddingLeft: isFullscreen ? "2rem" : "0",
    paddingRight: isFullscreen ? "2rem" : "0",
    borderBottom: isFullscreen ? "1px solid #2c3e50" : "none",
  };

  const titleContainerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };

  const titleStyle: CSSProperties = {
    fontSize: "2.5rem",
    fontWeight: 700,
    margin: 0,
    fontFamily: "var(--font-nova-square, 'Arial Black'), sans-serif",
  };

  const subtitleStyle: CSSProperties = {
    fontSize: "1rem",
    color: "#b0b0b0",
    margin: 0,
  };

  const contentStyle: CSSProperties = {
    display: isFullscreen ? "block" : "flex",
    flexDirection: isFullscreen ? "column" : "row",
    gap: "2rem",
    padding: isFullscreen ? "2rem" : "0",
  };

  const previewContainerStyle: CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    padding: "1.5rem",
    backgroundColor: "#1a1a1a",
    borderRadius: isFullscreen ? "0" : "12px",
    border: isFullscreen ? "none" : "1px solid #2c5aa0",
    maxHeight: isFullscreen ? "100%" : "600px",
    overflowY: isFullscreen ? "auto" : "auto",
  };

  const previewHeaderStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "1rem",
    borderBottom: "1px solid #404040",
    position: isFullscreen ? "sticky" : "relative",
    top: isFullscreen ? "0" : "auto",
    backgroundColor: isFullscreen ? "#0a0e13" : "transparent",
    zIndex: "10",
  };

  const previewTitleStyle: CSSProperties = {
    fontSize: isFullscreen ? "1.8rem" : "1.3rem",
    fontWeight: 700,
    margin: 0,
    fontFamily: "var(--font-nova-square, 'Arial Black'), sans-serif",
  };

  const buttonStyle: CSSProperties = {
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
    fontSize: "1rem",
    transition: "all 0.2s ease",
  };

  const fullscreenContentStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#0a0e13",
    display: "flex",
    flexDirection: "column",
    zIndex: "1000",
    overflowY: "auto",
  };

  const sectionsContainerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  };

  if (isFullscreen) {
    return (
      <div style={fullscreenContentStyle}>
        <div style={headerStyle}>
          <div style={titleContainerStyle}>
            <h1 style={previewTitleStyle}>Frontend Developer Roadmap</h1>
          </div>
          <button
            onClick={() => setIsFullscreen(false)}
            style={buttonStyle}
            title="Exit fullscreen"
          >
            ✕
          </button>
        </div>

        <div style={{ padding: "2rem", overflow: "auto" }}>
          <div style={sectionsContainerStyle}>
            {sections.map((section) => (
              <SectionBlock
                key={section.id}
                section={section}
                onStepToggle={handleStepToggle}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <div style={titleContainerStyle}>
            <h1 style={titleStyle}>Frontend Developer Roadmap</h1>
            <p style={subtitleStyle}>Complete your learning path</p>
          </div>
        </div>

        <div style={contentStyle}>
          <div style={previewContainerStyle}>
            <div style={previewHeaderStyle}>
              <h2 style={previewTitleStyle}>Roadmap Preview</h2>
              <button
                onClick={() => setIsFullscreen(true)}
                style={buttonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2c5aa0";
                  e.currentTarget.style.borderColor = "#2c5aa0";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "#404040";
                  e.currentTarget.style.color = "#b0b0b0";
                }}
                title="Enter fullscreen"
              >
                ⛶
              </button>
            </div>

            <div style={sectionsContainerStyle}>
              {sections.slice(0, 2).map((section) => (
                <SectionBlock
                  key={section.id}
                  section={section}
                  onStepToggle={handleStepToggle}
                />
              ))}
            </div>

            {sections.length > 2 && (
              <div
                style={{
                  textAlign: "center",
                  color: "#b0b0b0",
                  fontSize: "0.9rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid #404040",
                }}
              >
                Click fullscreen to view all {sections.length} sections
              </div>
            )}
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                padding: "1.5rem",
                backgroundColor: "#1a1a1a",
                borderRadius: "12px",
                border: "1px solid #2c3e50",
              }}
            >
              <h2 style={{ fontSize: "1.3rem", margin: "0 0 1rem 0" }}>
                Features
              </h2>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <li style={{ color: "#b0b0b0", fontSize: "0.95rem" }}>
                  ✓ Track your learning progress
                </li>
                <li style={{ color: "#b0b0b0", fontSize: "0.95rem" }}>
                  ✓ Interactive step completion
                </li>
                <li style={{ color: "#b0b0b0", fontSize: "0.95rem" }}>
                  ✓ Visual progress indicators
                </li>
                <li style={{ color: "#b0b0b0", fontSize: "0.95rem" }}>
                  ✓ Fullscreen preview mode
                </li>
              </ul>
            </div>

            <div
              style={{
                padding: "1.5rem",
                backgroundColor: "#1a2332",
                borderRadius: "12px",
                border: "1px solid #2c3e50",
              }}
            >
              <h2 style={{ fontSize: "1.3rem", margin: "0 0 1rem 0" }}>
                Progress
              </h2>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#B8EF46",
                }}
              >
                {Math.round(
                  (sections.reduce(
                    (acc, section) =>
                      acc +
                      section.steps.filter((s) => s.isCompleted).length,
                    0
                  ) /
                    sections.reduce((acc, section) => acc + section.steps.length, 0)) *
                    100
                )}
                %
              </div>
              <p style={{ color: "#b0b0b0", margin: "0.5rem 0 0 0" }}>
                of learning path completed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
