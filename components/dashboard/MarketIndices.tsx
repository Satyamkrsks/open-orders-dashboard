"use client";

import { cn } from "@/lib/utils";

const marketIndices = [
  { name: "SIGNORIA", value: "0.00", change: 0 },
  { name: "NIFTY BANK", value: "52,323.30", change: 0.4 },
  { name: "NIFTY FIN SERVICE", value: "25,255.75", change: 0.2 },
  { name: "RELCHEMO", value: "162.73", change: -0.1 },
];

export default function MarketIndices() {
  return (
    <div className="flex items-center gap-6">
      {marketIndices.map((index) => (
        <div key={index.name} className="flex flex-col items-center">
          <span className="text-xs font-medium">{index.name}</span>
          <span 
            className={cn(
              "text-xs font-semibold",
              index.change > 0 ? "text-green-600" : 
              index.change < 0 ? "text-red-600" : "text-foreground"
            )}
          >
            {index.value}
          </span>
        </div>
      ))}
    </div>
  );
}