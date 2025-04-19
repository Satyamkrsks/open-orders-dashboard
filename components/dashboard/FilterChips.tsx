import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterChipsProps {
  label: string;
  onRemove: () => void;
}

export default function FilterChips({ label, onRemove }: FilterChipsProps) {
  return (
    <div className="inline-flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm">
      {label}
      <Button
        variant="ghost"
        size="icon"
        className="h-5 w-5"
        onClick={onRemove}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}