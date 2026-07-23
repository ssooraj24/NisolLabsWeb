import { SmallBusinessPlaybook } from "@/components/playbooks/SmallBusinessPlaybook";
import { PLAYBOOKS } from "@/data/playbookDetails";

export const metadata = {
  title: "AI for Small Businesses — Playbook | Nisol Labs",
  description:
    "Discover how Nisol Labs helps small businesses adopt AI with a proven 6-step methodology. Executive summary, industry stats, readiness quiz, transformation roadmap, and AI Discovery Workshop.",
};

export default function SmallBusinessPlaybookPage() {
  return <SmallBusinessPlaybook playbook={PLAYBOOKS.aiSmallBusiness} />;
}