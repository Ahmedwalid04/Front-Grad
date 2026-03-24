"use client";

import { CSSProperties } from "react";
import { SectionBlock } from "./section-block";
import type { Roadmap } from "@/types/roadmap";

interface RoadmapPreviewProps {
  roadmap: Roadmap;
  isFullscreen: boolean;
  onStepToggle: (stepId: string, isCompleted: boolean) => Promise<void>;
  onFullscreenToggle: () => void;
  loadingStepId?: string;
}

export function RoadmapPreview({
  roadmap,
  isFullscreen,
  onStepToggle,
  onFullscreenToggle,
  loadingStepId,
}: RoadmapPreviewProps) {
  const previewSections = isFullscreen ? roadmap.sections : roadmap.sections.slice(0, 2);

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    padding: isFullscreen ? "2rem" : "1.5rem",
    backgroundColor: isFullscreen ? "var(--bg-secondary)" : "#1a1a1a",
    borderRadius: isFullscreen ? "0" : "12px",
    border: isFullscreen ? "none" : "1px solid #2c5aa0",
    position: isFullscreen ? "fixed" : "relative",
    top: isFullscreen ? "0" : "auto",
    left: isFullscreen ? "0" : "auto",
    right: isFullscreen ? "0" : "auto",
    bottom: isFullscreen ? "0" : "auto",
    width: isFullscreen ? "100%" : "auto",
    height: isFullscreen ? "100%" : "auto",
    zIndex: isFullscreen ? "1000" : "auto",
    overflowY: isFullscreen ? "auto" : "visible",
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "1rem",
    borderBottom: "1px solid #404040",
    position: isFullscreen ? "sticky" : "relative",
    top: isFullscreen ? "0" : "auto",
    backgroundColor: isFullscreen ? "var(--bg-secondary)" : "transparent",
    zIndex: isFullscreen ? "10" : "auto",
  };

  const titleStyle: CSSProperties = {
    fontSize: isFullscreen ? "1.8rem" : "1.3rem",
    fontWeight: 700,
    color: "#fff",
    margin: 0,
    fontFamily: "var(--font-nova-square)",
  };

  const buttonContainerStyle: CSSProperties = {
    display: "flex",
    gap: "0.75rem",
    alignItems: "center",
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

  const buttonHoverStyle: CSSProperties = {
    ...buttonStyle,
    backgroundColor: "#2c5aa0",
    color: "#fff",
    borderColor: "#2c5aa0",
  };

  const sectionsContainerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  };

  const showMoreIndicatorStyle: CSSProperties = {
    textAlign: "center",
    color: "#b0b0b0",
    fontSize: "0.9rem",
    paddingTop: "1rem",
    borderTop: "1px solid #404040",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Roadmap Preview</h2>
        <div style={buttonContainerStyle}>
          <button
            style={buttonStyle}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, buttonHoverStyle);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, buttonStyle);
            }}
            onClick={onFullscreenToggle}
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? "✕" : "⛶"}
          </button>
        </div>
      </div>

      <div style={sectionsContainerStyle}>
        {previewSections.map((section) => (
          <SectionBlock
            key={section.id}
            section={section}
            onStepToggle={onStepToggle}
            loadingStepId={loadingStepId}
          />
        ))}
      </div>

      {!isFullscreen && roadmap.sections.length > 2 && (
        <div style={showMoreIndicatorStyle}>
          Click fullscreen to view all {roadmap.sections.length} sections
        </div>
      )}
    </div>
  );
}
