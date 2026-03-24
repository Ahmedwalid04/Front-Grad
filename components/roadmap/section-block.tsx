"use client";

import { CSSProperties } from "react";
import { StepItem } from "./step-item";
import type { Section } from "@/types/roadmap";

interface SectionBlockProps {
  section: Section;
  onStepToggle: (stepId: string, isCompleted: boolean) => Promise<void>;
  loadingStepId?: string;
}

export function SectionBlock({ section, onStepToggle, loadingStepId }: SectionBlockProps) {
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
    backgroundColor: "var(--primary-green)",
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
            isLoading={loadingStepId === step.id}
          />
        ))}
      </div>
    </div>
  );
}
