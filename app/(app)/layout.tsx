import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { currentUser, User as ClerkUser } from "@clerk/nextjs/server";
import { User as DBUser, Project } from "@prisma/client";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user: ClerkUser | null = await currentUser();

  if (!user) {
    redirect("/");
  }

  const dbUser: DBUser | null = await prisma.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
  });

  if (!dbUser) {
    await prisma.user.create({
      data: {
        name: user.fullName || user.emailAddresses[0].emailAddress, 
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  return <>{children}</>;
}
