"use client";

import { CSSProperties } from "react";
import type { Roadmap } from "@/types/roadmap";

interface RoadmapCardProps {
  roadmap: Roadmap;
  onClick: (roadmapId: string) => void;
  isSelected?: boolean;
}

export function RoadmapCard({ roadmap, onClick, isSelected }: RoadmapCardProps) {
  const totalSteps = roadmap.sections.reduce((sum, section) => sum + section.steps.length, 0);
  const completedSteps = roadmap.sections.reduce(
    (sum, section) => sum + section.steps.filter((s) => s.isCompleted).length,
    0
  );
  const progressPercent = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  const containerStyle: CSSProperties = {
    padding: "1.25rem",
    borderRadius: "10px",
    backgroundColor: isSelected ? "#1a2a3a" : "#0f1419",
    border: isSelected ? "2px solid var(--primary-green)" : "1px solid #2c3e50",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const titleStyle: CSSProperties = {
    fontSize: "1rem",
    fontWeight: 600,
    color: "#fff",
    margin: "0 0 0.5rem 0",
  };

  const statsStyle: CSSProperties = {
    fontSize: "0.85rem",
    color: "#b0b0b0",
    margin: 0,
  };

  const progressBarContainerStyle: CSSProperties = {
    width: "100%",
    height: "6px",
    backgroundColor: "#1a2a3a",
    borderRadius: "3px",
    marginTop: "0.75rem",
    overflow: "hidden",
  };

  const progressBarFillStyle: CSSProperties = {
    height: "100%",
    width: `${progressPercent}%`,
    backgroundColor: "var(--primary-green)",
    transition: "width 0.3s ease",
  };

  return (
    <div style={containerStyle} onClick={() => onClick(roadmap.id)}>
      <h3 style={titleStyle}>{roadmap.title}</h3>
      <p style={statsStyle}>
        {roadmap.sections.length} sections • {totalSteps} steps
      </p>
      <div style={progressBarContainerStyle}>
        <div style={progressBarFillStyle} />
      </div>
      <p style={{ ...statsStyle, marginTop: "0.5rem" }}>
        {completedSteps}/{totalSteps} completed
      </p>
    </div>
  );
}
