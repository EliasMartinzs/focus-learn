"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

import { ThemeProvider as StaticProvider } from "next-themes";

import dynamic from "next/dynamic";

const DynProvider = dynamic(
  () => import("next-themes").then((e) => e.ThemeProvider),
  {
    ssr: false,
  }
);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const NextThemeProvider =
    process.env.NODE_ENV === "production" ? StaticProvider : DynProvider;
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}
