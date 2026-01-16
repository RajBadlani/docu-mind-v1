"use client";
import { User } from "@/generated/prisma/client";
import { UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { signOutAction } from "@/actions/authActions";

interface SignOutButtonProps {
  user: User;
}

const SignOutButton = ({ user }: SignOutButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserIcon className="cursor-pointer" width={28} height={28} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {" "}
          <span className="font-semibold">Name</span> : {user.name}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="font-semibold">Email</span> : {user.email}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="font-semibold">Account Verified</span> :{" "}
          {user.emailVerified ? "Verified" : "Not Verified"}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="font-semibold">Subscription</span> : {user.plan}
        </DropdownMenuItem>
        <DropdownMenuItem>
          {" "}
          <Button
            onClick={async () => await signOutAction()}
            className=" w-full cursor-pointer bg-blue-600 hover:bg-blue-700"
          >
            Sign Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SignOutButton;
