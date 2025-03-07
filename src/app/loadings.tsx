import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="w-full h-svh bg-transparent flex items-center justify-center">
      <Loader2 className="animate-spin size-5" />
    </main>
  );
}
