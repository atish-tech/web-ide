import { Landing } from "@/components/Landing";
import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user: User | null = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <>
      <Landing />
    </>
  );
}
