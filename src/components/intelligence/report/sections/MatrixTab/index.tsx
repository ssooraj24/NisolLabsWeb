"use client";

import React from "react";
import { useMatrix } from "./useMatrix";
import { OpportunityMatrix } from "@/components/intelligence/OpportunityMatrix";
import { EditableContent } from "@/components/intelligence/EditableContent";

interface MatrixTabProps {
  reportId: string;
}

export default function MatrixTab({ reportId }: MatrixTabProps) {
  const { matrix, loading, error, saveMatrix } = useMatrix(reportId);

  if (loading) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
        Loading Opportunity Matrix...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
        Failed to load matrix: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Visual 2x2 Matrix Component */}
      <OpportunityMatrix data={matrix} />

      {/* Editable JSON Data */}
      <EditableContent
        label="3. Opportunity Matrix Raw Configuration"
        initialValue={JSON.stringify(matrix || {}, null, 2)}
        onSave={(val) => {
          try {
            const parsed = JSON.parse(val);
            return saveMatrix(parsed);
          } catch {
            alert("Invalid JSON format");
          }
        }}
        placeholder="Edit matrix JSON..."
      />
    </div>
  );
}
