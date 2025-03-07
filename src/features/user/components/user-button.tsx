"use client";

import { getUser } from "@/features/user/api/get-user";
import { Skeleton } from "../../../components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { User } from "lucide-react";

type Props = {
  showName?: boolean;
  showEmail?: boolean;
};

export function UserButton({ showName = false, showEmail = false }: Props) {
  const { data, isLoading } = getUser();
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <div className="w-full flex items-center gap-x-3">
        <Skeleton className="size-10 rounded-full" />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-x-3 w-full")}>
      <div className="flex items-center">
        {data?.data?.imageUrl === "/user.png" ? (
          theme === "dark" ? (
            <User color="#FFF" />
          ) : (
            <User color="#000" />
          )
        ) : (
          <Image src={data?.data?.imageUrl!} alt="" width={36} height={36} />
        )}
      </div>

      <div className="flex flex-col">
        {data?.data?.firstName === "" ? (
          <Link
            className="hover:underline underline-offset-4 text-sm"
            href="/dashboard/profile"
          >
            Meu perfil
          </Link>
        ) : (
          <p className="capitalize">
            {data?.data?.firstName
              ? data?.data?.firstName
              : data?.data?.lastName}
          </p>
        )}

        {showEmail && (
          <small className="text-muted-foreground">{data?.data?.email}</small>
        )}
      </div>
    </div>
  );
}
