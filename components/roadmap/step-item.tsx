"use client";

import { useState, CSSProperties } from "react";
import type { Step } from "@/types/roadmap";

interface StepItemProps {
  step: Step;
  onToggle: (stepId: string, isCompleted: boolean) => Promise<void>;
  isLoading?: boolean;
}

export function StepItem({ step, onToggle, isLoading }: StepItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
    padding: "1rem",
    borderRadius: "8px",
    backgroundColor: step.isCompleted ? "#1a2332" : "#0f1419",
    border: "1px solid #2c3e50",
    cursor: isLoading ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    opacity: isLoading ? 0.6 : 1,
    ...(isHovered && !isLoading && {
      backgroundColor: "#1a2a3a",
      borderColor: "#3d5a80",
    }),
  };

  const checkboxStyle: CSSProperties = {
    width: "20px",
    height: "20px",
    minWidth: "20px",
    marginTop: "0.15rem",
    cursor: isLoading ? "not-allowed" : "pointer",
    accentColor: "var(--primary-green)",
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
    >
      <input
        type="checkbox"
        checked={step.isCompleted}
        onChange={() => onToggle(step.id, !step.isCompleted)}
        disabled={isLoading}
        style={checkboxStyle}
        aria-label={`Mark ${step.title} as ${step.isCompleted ? "incomplete" : "complete"}`}
      />
      <div style={textStyle}>
        <p style={titleStyle}>{step.title}</p>
        {step.description && <p style={descriptionStyle}>{step.description}</p>}
      </div>
    </div>
  );
}
