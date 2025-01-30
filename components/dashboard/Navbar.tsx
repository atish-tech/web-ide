import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.svg";
import UserButton from "../auth/UserButton";
import { User } from "@prisma/client";
import Search from "./Search";

export default function Navbar({ userData }: { userData: User }) {
  return (
    <div className="h-16 px-4 w-full flex items-center justify-between border-b border-border">
      <div className="flex items-center space-x-4">
        <Link
          href="/"
          className="ring-offset-2 ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none rounded-sm"
        >
          <Image src={Logo} alt="Logo" width={36} height={36} />
        </Link>
        <div className="text-sm font-medium flex  items-center">Web IDE</div>
      </div>

      <div className="flex items-center space-x-4">
        <Search />

        <UserButton userData={userData} />
      </div>
    </div>
  );
}
