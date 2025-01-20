"use client";

import Image from "next/image";
import { Clock, Globe, Lock } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Project } from "@prisma/client";
import ProjectCard from "./ProjectCard";
import { CanvasRevealEffect } from "./ui/canvas-reveal-effect";

const colors = {
  react: [
    [71, 207, 237],
    [30, 126, 148],
  ],
  node: [
    [86, 184, 72],
    [59, 112, 52],
  ],
};

export default function DashboardProjects({
  projects,
}: {
  projects: Project[];
}) {
  const [deletingId, setDeletingId] = useState<string>("");

  useEffect(() => {
    if (deletingId) {
      setDeletingId("");
    }
  }, [projects]);

  return (
    <div className="grow p-4 flex flex-col">
      <div className="grow w-full ">
        {projects.length > 0 ? (
          <div className="w-full grid lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-4">
            {projects.map((project: Project) => {
              return (
                <Link
                  key={project.id}
                  href={`/code/${project.id}`}
                  className={`${
                    deletingId === project.id
                      ? "pointer-events-none opacity-50 cursor-events-none"
                      : "cursor-pointer"
                  } transition-all focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-ring rounded-lg`}
                >
                  <ProjectCard project={project} deletingId={deletingId}>
                    <CanvasRevealEffect
                      animationSpeed={3}
                      containerClassName="bg-black"
                      colors={colors[project.type as keyof typeof colors]}
                      dotSize={2}
                    />
                    <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-background/75" />
                  </ProjectCard>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-muted-foreground text-sm">
            You don't have any projects yet. Create one to get started!
          </div>
        )}
      </div>
    </div>
  );
}
