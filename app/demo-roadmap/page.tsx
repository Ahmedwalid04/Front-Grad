"use client";

import { useState, CSSProperties } from "react";

interface Step {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

interface Section {
  id: string;
  title: string;
  description: string;
  steps: Step[];
}

interface RoadmapData {
  id: string;
  title: string;
  description: string;
  sections: Section[];
}

const mockRoadmap: RoadmapData = {
  id: "1",
  title: "Frontend Development Roadmap",
  description: "Master modern frontend development with React and Next.js",
  sections: [
    {
      id: "sec-1",
      title: "HTML & CSS Fundamentals",
      description: "Learn the building blocks of web development",
      steps: [
        {
          id: "step-1",
          title: "HTML Basics",
          description: "Understand semantic HTML and document structure",
          isCompleted: true,
        },
        {
          id: "step-2",
          title: "CSS Layouts",
          description: "Master flexbox and CSS Grid",
          isCompleted: true,
        },
        {
          id: "step-3",
          title: "Responsive Design",
          description: "Build mobile-first responsive websites",
          isCompleted: false,
        },
      ],
    },
    {
      id: "sec-2",
      title: "JavaScript Mastery",
      description: "Deep dive into JavaScript fundamentals and advanced concepts",
      steps: [
        {
          id: "step-4",
          title: "ES6+ Features",
          description: "Learn modern JavaScript syntax and features",
          isCompleted: true,
        },
        {
          id: "step-5",
          title: "Async Programming",
          description: "Master promises, async/await, and callbacks",
          isCompleted: false,
        },
        {
          id: "step-6",
          title: "DOM Manipulation",
          description: "Interact with and modify the DOM efficiently",
          isCompleted: false,
        },
      ],
    },
    {
      id: "sec-3",
      title: "React & Modern Frameworks",
      description: "Build scalable applications with React and Next.js",
      steps: [
        {
          id: "step-7",
          title: "React Fundamentals",
          description: "Components, hooks, and state management",
          isCompleted: false,
        },
        {
          id: "step-8",
          title: "Next.js Deep Dive",
          description: "Server components, routing, and optimization",
          isCompleted: false,
        },
        {
          id: "step-9",
          title: "API Integration",
          description: "Connect your frontend to backend APIs",
          isCompleted: false,
        },
      ],
    },
  ],
};

export default function DemoRoadmapPage() {
  const [roadmap, setRoadmap] = useState(mockRoadmap);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadingStepId, setLoadingStepId] = useState<string | null>(null);

  const handleStepToggle = (stepId: string) => {
    setLoadingStepId(stepId);
    setTimeout(() => {
      setRoadmap((prev) => ({
        ...prev,
        sections: prev.sections.map((section) => ({
          ...section,
          steps: section.steps.map((step) =>
            step.id === stepId
              ? { ...step, isCompleted: !step.isCompleted }
              : step
          ),
        })),
      }));
      setLoadingStepId(null);
    }, 300);
  };

  const calculateProgress = (section: Section) => {
    const completed = section.steps.filter((s) => s.isCompleted).length;
    return Math.round((completed / section.steps.length) * 100);
  };

  const StepItemComponent = ({ step, sectionId }: { step: Step; sectionId: string }) => {
    const stepStyle: CSSProperties = {
      display: "flex",
      alignItems: "flex-start",
      gap: "1rem",
      padding: "1rem",
      borderRadius: "8px",
      backgroundColor: "#1a1f2e",
      border: "1px solid #2a3a4a",
      cursor: "pointer",
      transition: "all 0.2s ease",
    };

    const checkboxStyle: CSSProperties = {
      width: "20px",
      height: "20px",
      minWidth: "20px",
      borderRadius: "4px",
      border: "2px solid #b8ef46",
      backgroundColor: step.isCompleted ? "#b8ef46" : "transparent",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "2px",
    };

    const contentStyle: CSSProperties = {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
    };

    const titleStyle: CSSProperties = {
      fontSize: "0.95rem",
      fontWeight: 500,
      color: step.isCompleted ? "#b0b0b0" : "#fff",
      textDecoration: step.isCompleted ? "line-through" : "none",
      margin: 0,
    };

    const descStyle: CSSProperties = {
      fontSize: "0.85rem",
      color: "#8a8a8a",
      margin: 0,
    };

    return (
      <div
        style={stepStyle}
        onClick={() => handleStepToggle(step.id)}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "#222837";
          (e.currentTarget as HTMLElement).style.borderColor = "#3a4a5a";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "#1a1f2e";
          (e.currentTarget as HTMLElement).style.borderColor = "#2a3a4a";
        }}
      >
        <div style={checkboxStyle}>
          {step.isCompleted && <span style={{ color: "#0a0e13", fontSize: "14px" }}>✓</span>}
        </div>
        <div style={contentStyle}>
          <h4 style={titleStyle}>{step.title}</h4>
          <p style={descStyle}>{step.description}</p>
        </div>
      </div>
    );
  };

  const SectionComponent = ({ section }: { section: Section }) => {
    const progress = calculateProgress(section);
    const completedCount = section.steps.filter((s) => s.isCompleted).length;

    const sectionStyle: CSSProperties = {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      padding: "1.5rem",
      borderRadius: "12px",
      backgroundColor: "#0f1419",
      border: "1px solid #2a3a4a",
    };

    const headerStyle: CSSProperties = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "0.5rem",
    };

    const titleStyle: CSSProperties = {
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem",
      flex: 1,
    };

    const sectionTitleStyle: CSSProperties = {
      fontSize: "1.1rem",
      fontWeight: 600,
      color: "#fff",
      margin: 0,
    };

    const descStyle: CSSProperties = {
      fontSize: "0.85rem",
      color: "#8a8a8a",
      margin: 0,
    };

    const progressContainerStyle: CSSProperties = {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      alignItems: "flex-end",
    };

    const progressTextStyle: CSSProperties = {
      fontSize: "0.85rem",
      color: "#b8ef46",
      fontWeight: 500,
    };

    const progressBarStyle: CSSProperties = {
      width: "100px",
      height: "8px",
      backgroundColor: "#1a1f2e",
      borderRadius: "4px",
      overflow: "hidden",
      border: "1px solid #2a3a4a",
    };

    const progressFillStyle: CSSProperties = {
      height: "100%",
      backgroundColor: "#b8ef46",
      width: `${progress}%`,
      transition: "width 0.3s ease",
    };

    const stepsStyle: CSSProperties = {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    };

    return (
      <div style={sectionStyle}>
        <div style={headerStyle}>
          <div style={titleStyle}>
            <h3 style={sectionTitleStyle}>{section.title}</h3>
            <p style={descStyle}>{section.description}</p>
          </div>
          <div style={progressContainerStyle}>
            <span style={progressTextStyle}>
              {completedCount}/{section.steps.length}
            </span>
            <div style={progressBarStyle}>
              <div style={progressFillStyle} />
            </div>
          </div>
        </div>
        <div style={stepsStyle}>
          {section.steps.map((step) => (
            <StepItemComponent key={step.id} step={step} sectionId={section.id} />
          ))}
        </div>
      </div>
    );
  };

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#0a0e13",
    padding: "2rem",
    gap: "2rem",
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "1rem",
  };

  const headerContentStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    flex: 1,
  };

  const titleStyle: CSSProperties = {
    fontSize: "2.5rem",
    fontWeight: 700,
    color: "#fff",
    margin: 0,
    fontFamily: "var(--font-nova-square)",
  };

  const subtitleStyle: CSSProperties = {
    fontSize: "1rem",
    color: "#8a8a8a",
    margin: 0,
  };

  const fullscreenButtonStyle: CSSProperties = {
    width: "44px",
    height: "44px",
    borderRadius: "8px",
    backgroundColor: "#1a1f2e",
    border: "1px solid #2a3a4a",
    color: "#b8ef46",
    cursor: "pointer",
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  };

  const previewContainerStyle: CSSProperties = {
    display: isFullscreen ? "none" : "flex",
    flexDirection: "column",
    gap: "1.5rem",
  };

  const fullscreenPreviewStyle: CSSProperties = {
    display: isFullscreen ? "flex" : "none",
    flexDirection: "column",
    gap: "1.5rem",
  };

  const closeButtonStyle: CSSProperties = {
    width: "44px",
    height: "44px",
    borderRadius: "8px",
    backgroundColor: "#1a1f2e",
    border: "1px solid #2a3a4a",
    color: "#b8ef46",
    cursor: "pointer",
    fontSize: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  if (isFullscreen) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <div style={headerContentStyle}>
            <h1 style={titleStyle}>{roadmap.title}</h1>
            <p style={subtitleStyle}>{roadmap.description}</p>
          </div>
          <button
            style={closeButtonStyle}
            onClick={() => setIsFullscreen(false)}
            title="Exit fullscreen"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#252d3c";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#1a1f2e";
            }}
          >
            ✕
          </button>
        </div>
        <div style={fullscreenPreviewStyle}>
          {roadmap.sections.map((section) => (
            <SectionComponent key={section.id} section={section} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={headerContentStyle}>
          <h1 style={titleStyle}>{roadmap.title}</h1>
          <p style={subtitleStyle}>{roadmap.description}</p>
        </div>
        <button
          style={fullscreenButtonStyle}
          onClick={() => setIsFullscreen(true)}
          title="View fullscreen"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#252d3c";
            (e.currentTarget as HTMLElement).style.borderColor = "#3a4a5a";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#1a1f2e";
            (e.currentTarget as HTMLElement).style.borderColor = "#2a3a4a";
          }}
        >
          ⛶
        </button>
      </div>

      <div style={previewContainerStyle}>
        {/* Show only first 2 sections in preview */}
        {roadmap.sections.slice(0, 2).map((section) => (
          <SectionComponent key={section.id} section={section} />
        ))}

        {/* More sections indicator */}
        {roadmap.sections.length > 2 && (
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              borderRadius: "12px",
              backgroundColor: "#0f1419",
              border: "1px dashed #2a3a4a",
              color: "#8a8a8a",
              fontSize: "0.9rem",
            }}
          >
            <p style={{ margin: 0, marginBottom: "0.5rem" }}>
              +{roadmap.sections.length - 2} more section{roadmap.sections.length - 2 !== 1 ? "s" : ""}
            </p>
            <button
              onClick={() => setIsFullscreen(true)}
              style={{
                backgroundColor: "#b8ef46",
                color: "#0a0e13",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 600,
              }}
            >
              View Full Roadmap
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
