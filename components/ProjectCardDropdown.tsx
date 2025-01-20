"use client";

import { Ellipsis, Globe, Lock, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Project } from "@prisma/client";
import { changeVisibility, deleteProject } from "@/lib/projectAction";
import { toast } from "sonner";

export default function ProjectCardDropdown({ project }: { project: Project }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="h-6 w-6 flex items-center justify-center transition-colors bg-transparent hover:bg-muted-foreground/25 rounded-sm outline-foreground"
      >
        <Ellipsis className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem
          onClick={async (e) => {
            e.stopPropagation();

            await changeVisibility(project);

            project.visibility =
              project.visibility === "public" ? "private" : "public";
          }}
          className="cursor-pointer"
        >
          {project.visibility === "public" ? (
            <>
              <Lock className="mr-2 h-4 w-4" />
              <span>Make Private</span>
            </>
          ) : (
            <>
              <Globe className="mr-2 h-4 w-4" />
              <span>Make Public</span>
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async (e) => {
            e.stopPropagation();

            await deleteProject(project);

            toast.success("Project deleted successfully");
          }}
          className="!text-destructive cursor-pointer"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete Project</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
