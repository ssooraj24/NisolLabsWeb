// src/lib/report/scoreEngine.ts

export interface RawQuestion {
  id: string | number;
  section: string;
  question_text?: string;
}

export function computeCapabilityScores(
  questions: RawQuestion[],
  rawResponses: Record<string, any>
) {
  const sectionScores: Record<string, { total: number; count: number }> = {};
  let totalScoreSum = 0;
  let totalScoredQuestions = 0;

  questions.forEach((q) => {
    const resp = rawResponses[q.id] || rawResponses[String(q.id)];
    let score = 3; // Default midpoint score out of 5

    if (typeof resp === "object" && resp !== null && typeof resp.score === "number") {
      score = resp.score;
    } else if (typeof resp === "number") {
      score = resp;
    }

    const sectionName = q.section || "General AI Strategy";

    if (!sectionScores[sectionName]) {
      sectionScores[sectionName] = { total: 0, count: 0 };
    }
    sectionScores[sectionName].total += score;
    sectionScores[sectionName].count += 1;

    totalScoreSum += score;
    totalScoredQuestions += 1;
  });

  const calculatedCapabilityScores: Record<string, number> = {};
  Object.keys(sectionScores).forEach((sec) => {
    const avg = sectionScores[sec].total / sectionScores[sec].count;
    calculatedCapabilityScores[sec] = Math.round(avg * 10) / 10;
  });

  const overallMaturityScore =
    totalScoredQuestions > 0
      ? Math.round((totalScoreSum / totalScoredQuestions) * 10) / 10
      : 3.5;

  return {
    calculatedCapabilityScores,
    overallMaturityScore,
    totalScoredQuestions,
  };
}
