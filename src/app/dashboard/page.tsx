import ConsecutiveStudyDays from "@/components/dashboard/consecutive-days";
import { ImagesDisplay } from "@/components/dashboard/images-display";
import { QuotesDisplay } from "@/components/dashboard/quotes-display";
import { TotalHours } from "@/components/dashboard/total-hours";

export default function Dashboard() {
  return (
    <main className="w-full max-lg:space-y-4 lg:grid lg:grid-cols-6 lg:grid-rows-4 lg:gap-8 max-lg:max-w-[95vw] max-lg:mx-auto lg:py-8 lg:px-24">
      <div className="col-span-2">
        <TotalHours hours={600} />
      </div>
      <div className="col-span-2 col-start-3">
        <QuotesDisplay />
      </div>
      <div className="max-lg:hidden col-span-2 row-span-3 col-start-5 relative w-full h-full">
        <ImagesDisplay />
      </div>
      <div className="col-span-4 row-start-2">
        <ConsecutiveStudyDays consecutiveStudyDays={90} />
      </div>
      <div className="col-span-4 row-span-2 row-start-3">Tabela de secoes</div>
      <div className="col-span-2 col-start-5 row-start-4">historico</div>
    </main>
  );
}
