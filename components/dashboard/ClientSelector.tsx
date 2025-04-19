"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserRound, X } from "lucide-react";

interface ClientSelectorProps {
  selectedClient: string;
  onSelectClient: (client: string) => void;
}

export default function ClientSelector({ 
  selectedClient, 
  onSelectClient 
}: ClientSelectorProps) {
  return (
    <div className="flex items-center gap-2 rounded-md border p-2">
      <div className="flex items-center justify-center h-8 w-8 bg-muted rounded-full">
        <UserRound className="h-4 w-4" />
      </div>
      <Input
        value={selectedClient}
        onChange={(e) => onSelectClient(e.target.value)}
        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto text-sm"
      />
      {selectedClient && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => onSelectClient("")}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}