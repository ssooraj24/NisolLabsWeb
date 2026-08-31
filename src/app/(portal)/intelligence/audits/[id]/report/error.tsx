"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, ArrowLeft } from "lucide-react";

export default function ReportError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Report workspace error:", error);
  }, [error]);

  return (
    <div className="p-8 max-w-4xl mx-auto my-12">
      <div className="bg-white border border-red-200 rounded-2xl p-8 shadow-sm text-center space-y-4">
        <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Something went wrong loading this report</h2>
          <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
            {error.message || "An unexpected error occurred while loading the report workspace."}
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-slate-400 mt-1">Error digest: {error.digest}</p>
          )}
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try Again
          </button>
          <Link
            href="/intelligence/audits"
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors border border-slate-200 flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Audits
          </Link>
        </div>
      </div>
    </div>
  );
}
