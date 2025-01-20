"use server";

import { Project } from "@prisma/client";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

export async function changeVisibility(project: Project) {
  await prisma.project.update({
    where: { id: project.id },
    data: {
      visibility: project.visibility === "public" ? "private" : "public",
    },
  });

  revalidatePath(`/dashboard`);
}

export async function deleteProject(project: Project) {
  const temp = await prisma.project.delete({
    where: { id: project.id },
  });

  revalidatePath(`/dashboard`);
}
