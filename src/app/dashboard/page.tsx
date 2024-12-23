import { DashboardHours } from "@/components/dashboard/dashboard-hours";
import { DashboardProgress } from "@/components/dashboard/dashboard-progress";
import { Iceland } from "next/font/google";

const iceland = Iceland({ subsets: ["latin"], weight: "400" });

export default function Dashboard() {
  return (
    <main className="p-5 lg:p-10 max-lg:w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2"></div>
    </main>
  );
}
