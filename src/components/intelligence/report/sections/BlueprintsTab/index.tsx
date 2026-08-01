"use client";

import React from "react";
import { useBlueprints } from "./useBlueprints";
import { BlueprintCard } from "@/components/intelligence/BlueprintCard";
import { EditableContent } from "@/components/intelligence/EditableContent";
import { getSolutionBlueprints, DEFAULT_SOLUTION_BLUEPRINTS } from "@/lib/ai/defaultBlueprints";

interface BlueprintsTabProps {
  reportId: string;
}

export default function BlueprintsTab({ reportId }: BlueprintsTabProps) {
  const { blueprints, loading, error, saveBlueprints } = useBlueprints(reportId);

  if (loading) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
        Loading Solution Blueprints...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
        Failed to load blueprints: {error}
      </div>
    );
  }

  const items = getSolutionBlueprints(blueprints);
  const effectiveJSON = (!blueprints?.blueprints || blueprints.blueprints.length === 0)
    ? { blueprints: DEFAULT_SOLUTION_BLUEPRINTS }
    : blueprints;

  return (
    <div className="space-y-6">
      {/* Blueprint Cards */}
      <div className="space-y-4">
        {items.map((bp, idx) => (
          <BlueprintCard key={idx} blueprint={bp} />
        ))}
      </div>

      {/* Editable Raw Blueprints JSON */}
      <EditableContent
        label="7. Solution Blueprints Configuration JSON"
        initialValue={JSON.stringify(effectiveJSON, null, 2)}
        onSave={(val) => {
          try {
            const parsed = JSON.parse(val);
            return saveBlueprints(parsed);
          } catch {
            alert("Invalid JSON format");
          }
        }}
        placeholder="Edit blueprints JSON..."
      />
    </div>
  );
}
