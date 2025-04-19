"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown, BarChart2 } from "lucide-react";
import MarketIndices from "@/components/dashboard/MarketIndices";
import UserMenu from "@/components/layout/UserMenu";

const navItems = [
  { name: "MARKETWATCH", href: "/marketwatch" },
  { name: "EXCHANGE FILES", href: "/exchange-files" },
  { name: "PORTFOLIO", href: "/portfolio", hasDropdown: true },
  { name: "FUNDS", href: "/funds", hasDropdown: true },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 h-[64px]">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <BarChart2 className="h-7 w-7 text-amber-600" />
          </Link>
          
          {/* Market Indices */}
          <MarketIndices />
        </div>

        {/* Main Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
              {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
            </Link>
          ))}
        </nav>

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  );
}