import { SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

type Props = {
  showIcon?: boolean;
};

export const LogOutButton = ({ showIcon = false }: Props) => {
  return (
    <SignOutButton>
      <small className="flex gap-x-3 cursor-pointer items-center">
        {showIcon && <LogOut className="size-4" />} Sair
      </small>
    </SignOutButton>
  );
};
