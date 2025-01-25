import { User } from "@prisma/client";
import { Files, Search, Settings } from "lucide-react";
import UserButton from "../auth/UserButton";

interface NavbarProps {
  toggleFileTreeVisibility: () => void;
  user: User;
  isFileTreeVisible: boolean;
}

export function Navbar({
  toggleFileTreeVisibility,
  user,
  isFileTreeVisible,
}: NavbarProps) {
  return (
    <div className="flex flex-col gap-3 items-center justify-center h-full py-2 bg-zinc-900">
      <div
        className={`p-2 ${
          isFileTreeVisible ? "border-blue-800 border-l-2" : "border-none"
        }`}
      >
        <Files
          onClick={toggleFileTreeVisibility}
          className="w-8 h-8 cursor-pointer "
        />
      </div>

      <Search className="w-8 h-8 cursor-pointer" />

      <Settings className="w-8 h-8 cursor-pointer" />

      <div className="mt-auto">
        <UserButton userData={user} />
      </div>
    </div>
  );
}
