"use client";

import React from "react";
import { useRoadmap } from "./useRoadmap";
import { RoadmapTimeline } from "@/components/intelligence/RoadmapTimeline";
import { EditableContent } from "@/components/intelligence/EditableContent";

interface RoadmapTabProps {
  reportId: string;
}

export default function RoadmapTab({ reportId }: RoadmapTabProps) {
  const { roadmap, loading, error, saveRoadmap } = useRoadmap(reportId);

  if (loading) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
        Loading AI Transformation Roadmap...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
        Failed to load roadmap: {error}
      </div>
    );
  }

  const phases = roadmap?.phases || [];

  return (
    <div className="space-y-6">
      {/* Visual Phased Timeline */}
      <RoadmapTimeline phases={phases} />

      {/* Editable Raw Roadmap JSON */}
      <EditableContent
        label="5. Phased Roadmap Configuration"
        initialValue={JSON.stringify(roadmap || {}, null, 2)}
        onSave={(val) => {
          try {
            const parsed = JSON.parse(val);
            return saveRoadmap(parsed);
          } catch {
            alert("Invalid JSON format");
          }
        }}
        placeholder="Edit roadmap JSON..."
      />
    </div>
  );
}
