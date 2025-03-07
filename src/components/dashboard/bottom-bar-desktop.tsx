"use client";

import { MENU_LINKS } from "@/constants/links";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { UserButton } from "../../features/user/components/user-button";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { LogOutButton } from "../reusable/logou-button";
import { ToggleMode } from "../reusable/toggle-mode";

type Props = {};

export const BottomBarDesktop = (props: Props) => {
  const pathname = usePathname();

  return (
    <footer className="hidden lg:block w-full fixed bottom-0 z-50 left-0 bg-background rounded-full">
      <div className="w-full flex items-center justify-between p-5">
        <Link href="/dashboard" className="text-xl font-medium">
          Focus Learn
        </Link>

        <div className="flex items-center gap-x-3">
          {MENU_LINKS.map(({ href, label, icon }) =>
            pathname === href ? (
              <HoverBorderGradient
                key={label}
                className="inline-flex gap-x-3 items-center bg-background text-foreground"
              >
                {icon}
                {label}
              </HoverBorderGradient>
            ) : (
              <Link
                href={href}
                key={label}
                className="inline-flex gap-x-3 items-center"
              >
                {icon}
                {label}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-x-4">
          <UserButton />
          <ToggleMode />
          <LogOutButton showIcon />
        </div>
      </div>
    </footer>
  );
};
