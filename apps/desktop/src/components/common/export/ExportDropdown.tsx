import { Button } from "@/components/ui";

interface ExportDropdownProps {
  onCsvExport: () => void;
}

export default function ExportDropdown({
  onCsvExport,
}: ExportDropdownProps) {
  return (
    <div className="flex gap-2">
      <Button onClick={onCsvExport}>
        Export CSV
      </Button>

      <Button disabled>
        Export Excel
      </Button>

      <Button disabled>
        Export PDF
      </Button>
    </div>
  );
}