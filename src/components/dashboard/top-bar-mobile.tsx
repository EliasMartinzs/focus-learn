"use client";

import Link from "next/link";
import { SheetReusable } from "../reusable/sheet-reusable";
import { PanelRight } from "lucide-react";
import { UserButton } from "../../features/user/components/user-button";
import { MENU_LINKS } from "@/constants/links";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { LogOutButton } from "../reusable/logou-button";

export const TopBarMobile = () => {
  const pathname = usePathname();

  return (
    <header className="w-full block lg:hidden relative">
      <nav className="w-full p-5 flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-medium">
          Learn Focus
        </Link>

        <SheetReusable
          trigger={<PanelRight strokeWidth={1.5} />}
          title="Learn Focus"
          content={
            <div className="w-full flex flex-col">
              <div className="space-y-8 mt-10">
                {MENU_LINKS.map(({ href, icon, label }) => (
                  <Link
                    href={href}
                    key={label}
                    className={cn(
                      "flex items-center gap-x-3 text-muted-foreground hover:text-foreground transition-colors",
                      pathname === href && "text-foreground"
                    )}
                  >
                    {icon}
                    {label}
                  </Link>
                ))}
              </div>
              <div className="absolute bottom-10 space-y-6">
                <UserButton showEmail showName />
                <LogOutButton showIcon />
              </div>
            </div>
          }
        />
      </nav>
    </header>
  );
};
