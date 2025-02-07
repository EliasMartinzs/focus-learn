import { Button } from "@/components/ui/button";
import { CreateNewSectionStudy } from "@/features/sections/components/create-new-section-study";

export default function Secoes() {
  return (
    <main className="w-full max-lg:max-w-[95vw] max-lg:mx-auto lg:py-8 lg:px-24 space-y-4">
      <h1 className="font-medium text-2xl">Meus estudos</h1>

      <div>
        <CreateNewSectionStudy />
      </div>
    </main>
  );
}
