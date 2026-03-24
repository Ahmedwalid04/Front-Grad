"use client";

import { useEffect, useState, CSSProperties } from "react";
import { useParams } from "next/navigation";
import { SectionBlock } from "@/components/roadmap/section-block";
import { roadmapService } from "@/lib/api/roadmap";
import type { Roadmap } from "@/types/roadmap";

export default function RoadmapDetailPage() {
  const params = useParams();
  const roadmapId = params.id as string;

  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingStepId, setLoadingStepId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        const data = await roadmapService.getRoadmapById(roadmapId);
        if (data) {
          setRoadmap(data);
        } else {
          setError("Roadmap not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load roadmap");
      } finally {
        setLoading(false);
      }
    };

    if (roadmapId) {
      fetchRoadmap();
    }
  }, [roadmapId]);

  const handleStepToggle = async (stepId: string, isCompleted: boolean) => {
    try {
      setLoadingStepId(stepId);

      if (isCompleted) {
        await roadmapService.completeStep(stepId);
      } else {
        await roadmapService.uncompleteStep(stepId);
      }

      // Optimistic UI update
      setRoadmap((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          sections: prev.sections.map((section) => ({
            ...section,
            steps: section.steps.map((step) =>
              step.id === stepId ? { ...step, isCompleted } : step
            ),
          })),
        };
      });
    } catch (err) {
      console.error("Failed to update step:", err);
      // UI should have already been updated optimistically
    } finally {
      setLoadingStepId(null);
    }
  };

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100%",
    gap: "2rem",
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };

  const titleStyle: CSSProperties = {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#fff",
    margin: 0,
    fontFamily: "var(--font-nova-square)",
  };

  const subtitleStyle: CSSProperties = {
    fontSize: "0.95rem",
    color: "#b0b0b0",
    margin: 0,
  };

  const loadingStyle: CSSProperties = {
    textAlign: "center",
    color: "#b0b0b0",
    padding: "2rem",
    fontSize: "1rem",
  };

  const errorStyle: CSSProperties = {
    textAlign: "center",
    color: "#dc2626",
    padding: "2rem",
    fontSize: "1rem",
    backgroundColor: "#1a0f0f",
    borderRadius: "8px",
    border: "1px solid #3d2020",
  };

  const sectionsContainerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>
          {loading ? "Loading..." : roadmap?.title || "Roadmap"}
        </h1>
        <p style={subtitleStyle}>
          {loading
            ? ""
            : `${roadmap?.sections.length || 0} sections to master`}
        </p>
      </div>

      {loading && <div style={loadingStyle}>Loading roadmap details...</div>}

      {error && <div style={errorStyle}>{error}</div>}

      {!loading && !error && roadmap && (
        <div style={sectionsContainerStyle}>
          {roadmap.sections.map((section) => (
            <SectionBlock
              key={section.id}
              section={section}
              onStepToggle={handleStepToggle}
              loadingStepId={loadingStepId ?? undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
