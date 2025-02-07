import { BookA, FileText, LayoutDashboard, Trophy } from "lucide-react";

type MenuLinks = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

export const MENU_LINKS: MenuLinks[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard strokeWidth={1.5} />,
    href: "/dashboard",
  },
  {
    label: "Meus estudos",
    icon: <BookA strokeWidth={1.5} />,
    href: "/dashboard/secoes",
  },
  {
    label: "Meus flashcards",
    icon: <FileText strokeWidth={1.5} />,
    href: "/dashboard/flashcards",
  },
  {
    label: "Minhas metas",
    icon: <Trophy strokeWidth={1.5} />,
    href: "/dashboard/metas",
  },
] as const;
