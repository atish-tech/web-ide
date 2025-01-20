import { Dashboard } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { currentUser, User as ClerkUser } from "@clerk/nextjs/server";
import { User as DBUser, Project } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function () {
  const user: ClerkUser | null = await currentUser();

  if (!user) {
    redirect("/");
  }

  let dbUser: DBUser | null = await prisma.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        name: user.fullName as string,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  const project: Project[] = await prisma.project.findMany({
    where: {
      userId: dbUser.id,
    },
  });

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden overscroll-none">
      <Dashboard projects={project} />
    </div>
  );
}
