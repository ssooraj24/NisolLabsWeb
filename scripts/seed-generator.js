const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/data/questionsData.ts");
const content = fs.readFileSync(filePath, "utf8");

// Extract the INITIAL_62_QUESTIONS block
const startIdx = content.indexOf("export const INITIAL_62_QUESTIONS: QuestionItem[] = [");
if (startIdx === -1) {
  console.error("Could not find INITIAL_62_QUESTIONS in", filePath);
  process.exit(1);
}

const equalsIdx = content.indexOf("=", startIdx);
const arrayTextStart = content.indexOf("[", equalsIdx);
let depth = 0;
let arrayTextEnd = -1;

for (let i = arrayTextStart; i < content.length; i++) {
  if (content[i] === "[") depth++;
  else if (content[i] === "]") {
    depth--;
    if (depth === 0) {
      arrayTextEnd = i + 1;
      break;
    }
  }
}

const rawArray = content.substring(arrayTextStart, arrayTextEnd);
const questions = eval(rawArray);

console.log("Found", questions.length, "questions.");

let sql = `-- ==============================================================================
-- SEED 62 AI DISCOVERY ASSESSMENT QUESTIONS & DEFAULTS INTO NISOLAI
-- ==============================================================================

TRUNCATE TABLE public.questions RESTART IDENTITY CASCADE;

`;

for (const q of questions) {
  const section = q.section.replace(/'/g, "''");
  const text = q.question_text.replace(/'/g, "''");
  const tip = q.tip_discussion ? `'${q.tip_discussion.replace(/'/g, "''")}'` : "NULL";
  const patterns = q.triggered_patterns && q.triggered_patterns.length > 0
    ? `ARRAY[${q.triggered_patterns.map(p => `'${p.replace(/'/g, "''")}'`).join(", ")}]::TEXT[]`
    : "NULL";

  sql += `INSERT INTO public.questions (id, section, order_index, question_text, tip_discussion, triggered_patterns) VALUES (${q.id}, '${section}', ${q.order_index}, '${text}', ${tip}, ${patterns}) ON CONFLICT (id) DO UPDATE SET section = EXCLUDED.section, order_index = EXCLUDED.order_index, question_text = EXCLUDED.question_text, tip_discussion = EXCLUDED.tip_discussion, triggered_patterns = EXCLUDED.triggered_patterns;\n`;
}

sql += `
SELECT setval(pg_get_serial_sequence('public.questions', 'id'), COALESCE(max(id), 1)) FROM public.questions;

-- Revenue Range Defaults
INSERT INTO public.revenue_range_defaults (revenue_range, baseline_budget_cr, typical_timeline_months, recommended_plan) VALUES
('Under ₹50 Cr', 0.25, 3, 'Foundation'),
('₹50 - 250 Cr', 0.75, 6, 'Acceleration'),
('₹250 - 1000 Cr', 2.00, 9, 'Enterprise'),
('Above ₹1000 Cr', 5.00, 12, 'Transformation')
ON CONFLICT (revenue_range) DO NOTHING;
`;

const outputPath = path.join(__dirname, "seed-questions.sql");
fs.writeFileSync(outputPath, sql);
console.log("Successfully generated:", outputPath);
