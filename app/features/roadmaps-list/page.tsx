"use client";

import { useEffect, useState, CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { RoadmapCard } from "@/components/roadmap/roadmap-card";
import { roadmapService } from "@/lib/api/roadmap";
import type { Roadmap } from "@/types/roadmap";

export default function RoadmapsListPage() {
  const router = useRouter();
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        setLoading(true);
        const data = await roadmapService.getRoadmaps();
        setRoadmaps(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load roadmaps");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  const handleSelectRoadmap = (roadmapId: string) => {
    router.push(`/features/roadmap/${roadmapId}`);
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

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
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

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Learning Roadmaps</h1>
        <p style={subtitleStyle}>
          Choose a roadmap to start your learning journey
        </p>
      </div>

      {loading && <div style={loadingStyle}>Loading roadmaps...</div>}

      {error && <div style={errorStyle}>{error}</div>}

      {!loading && !error && roadmaps.length === 0 && (
        <div style={loadingStyle}>No roadmaps available</div>
      )}

      {!loading && !error && roadmaps.length > 0 && (
        <div style={gridStyle}>
          {roadmaps.map((roadmap) => (
            <RoadmapCard
              key={roadmap.id}
              roadmap={roadmap}
              onClick={handleSelectRoadmap}
            />
          ))}
        </div>
      )}
    </div>
  );
}
