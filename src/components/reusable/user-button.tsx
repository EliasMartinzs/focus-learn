"use client";

import { getUser } from "@/features/user/api/get-user";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
  showName?: boolean;
  showEmail?: boolean;
};

export function UserButton({ showName = false, showEmail = false }: Props) {
  const { data, isLoading } = getUser();

  if (isLoading) {
    return (
      <div className="w-full flex items-center gap-x-3">
        <Skeleton className="size-10 rounded-full" />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-x-3 w-full")}>
      <div className="relative size-10">
        <Image
          src={data?.data?.image_url || "/no-user.png"}
          fill
          alt={data?.data.name || "anonymous"}
          className="object-cover rounded-full"
        />
      </div>

      <div className="flex flex-col">
        {data?.data?.name === "Anonymous" ? (
          <Link
            className="hover:underline underline-offset-4 text-sm"
            href="/dashboard/profile"
          >
            Meu perfil
          </Link>
        ) : (
          <small>{data?.data?.name}</small>
        )}

        {showEmail && (
          <small className="text-muted-foreground">{data?.data?.email}</small>
        )}
      </div>
    </div>
  );
}
