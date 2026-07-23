import { PlaybookPageTemplate } from "@/components/playbooks/PlaybookPageTemplate";
import { PLAYBOOKS } from "@/data/playbookDetails";

export default function FinancePlaybookPage() {
  return <PlaybookPageTemplate playbook={PLAYBOOKS.aiFinance} />;
}