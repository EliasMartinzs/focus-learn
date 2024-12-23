import { BottomBarDesktop } from "@/components/dashboard/bottom-bar-desktop";
import { TopBarMobile } from "@/components/dashboard/top-bar-mobile";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="w-full h-svh max-h-svh flex flex-col">
      <TopBarMobile />
      <main className="flex-1 flex">{children}</main>
      <BottomBarDesktop />
    </div>
  );
}
