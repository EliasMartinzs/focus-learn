import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { cn } from "@/lib/utils";
import { Iceland } from "next/font/google";

const iceland = Iceland({ subsets: ["latin"], weight: "400" });

export default function Dashboard() {
  return (
    <main className="h-full p-5 lg:p-10 w-full">
      <HoverBorderGradient
        className={cn(
          "p-6 bg-background rounded-xl inline-flex items-end w-full lg:w-auto",
          iceland.className
        )}
      >
        <h6 className={cn("text-9xl font-medium")}>160</h6>
        <p className="text-3xl">Horas totais</p>
      </HoverBorderGradient>
    </main>
  );
}
