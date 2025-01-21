import { prisma } from "@/lib/prisma";
import { staterCode } from "@/lib/staterCode";
import { Project } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { FileType, ProjectType } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const project: Project = await prisma.project.create({
    data: {
      name: body.name,
      type: body.type,
      userId: 1,
      visibility: body.visibility,
    },
  });

  const folderPath: string = `projects/${project.id}`;

  const files: FileType[] = staterCode[project.type as ProjectType];

  for (const file of files) {
    file.path = folderPath + "/" + file.path;
    await put(file.path, file.content, {
      access: "public",
    });
  }

  return NextResponse.json({ id: project.id });
}
