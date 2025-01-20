import { prisma } from "@/lib/prisma";
import { currentUser, User as ClerkUser } from "@clerk/nextjs/server";
import { Project, User } from "@prisma/client";
import { redirect } from "next/navigation";
import Editor2 from "@/components/code/CodeEditor";
import { head, list, ListBlobResult } from "@vercel/blob";
import CodeEditor from "@/components/code/CodeEditor";
import { ProjectFileType } from "@/lib/types";

export default async function Code({
  params,
}: {
  params: { projectId: string };
}) {
  const user: ClerkUser | null = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { projectId }: { projectId: string } = await params;

  const dbUser: User | null = await prisma.user.findFirst({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
  });

  if (!dbUser) {
    redirect("/sign-in");
  }

  const project: Project | null = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: dbUser.id,
    },
  });

  if (!project) {
    redirect("/dashboard");
  }

  const projectData: ListBlobResult = await list({
    prefix: `projects/${project.id}/`,
  });

  const files: ProjectFileType[] = projectData.blobs.map((blob) => ({
    url: blob.url,
    path: blob.pathname,
  }));

  return (
    <>
      <CodeEditor files={files} />
    </>
  );
}
