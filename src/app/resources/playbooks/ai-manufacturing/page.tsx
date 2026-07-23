import { PlaybookPageTemplate } from "@/components/playbooks/PlaybookPageTemplate";
import { PLAYBOOKS } from "@/data/playbookDetails";

export default function ManufacturingPlaybookPage() {
  return <PlaybookPageTemplate playbook={PLAYBOOKS.aiManufacturing} />;
}