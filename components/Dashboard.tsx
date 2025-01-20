"use client";
import { useState } from "react";
import NewProjectModal from "./NewProject";
import { Button } from "./ui/button";
import { Project } from "@prisma/client";
import { toast } from "sonner";
import { Code2, FolderDot, Plus, Users } from "lucide-react";
import DashboardProjects from "./DashboardProjects";

type Screen = "projects" | "shared" | "setting" | "search";

export function Dashboard({ projects }: { projects: Project[] }) {
  const [newProject, setNewProject] = useState<boolean>(false);

  const [screen, setScreen] = useState<Screen>("projects");

  function activeScreen(s: Screen) {
    if (screen === s) {
      return "justify-start";
    } else {
      return "justify-start font-normal text-muted-foreground";
    }
  }

  return (
    <>
      <NewProjectModal open={newProject} setOpen={setNewProject} />

      <div className="flex grow w-full">
        <div className="w-56 shrink-0 border-r border-border p-4 justify-between flex flex-col">
          <div className="flex flex-col">
            <Button
              onClick={() => {
                if (projects.length >= 8) {
                  toast.error("You reached the maximum # of sandboxes.");
                  return;
                }
                setNewProject(true);
              }}
              className="mb-4"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>

            <Button
              variant="ghost"
              onClick={() => setScreen("projects")}
              className={activeScreen("projects")}
            >
              <FolderDot className="w-4 h-4 mr-2" />
              My Projects
            </Button>

            <Button
              variant="ghost"
              onClick={() => setScreen("shared")}
              className={activeScreen("shared")}
            >
              <Users className="w-4 h-4 mr-2" />
              Shared With Me
            </Button>

            {/* <Button
              variant="ghost"
              onClick={() => setScreen("settings")}
              className={activeScreen("settings")}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button> */}
          </div>

          <div className="flex flex-col">
            <a target="_blank" href="https://github.com/ishaan1013/sandbox">
              <Button
                variant="ghost"
                className="justify-start w-full font-normal text-muted-foreground"
              >
                <Code2 className="w-4 h-4 mr-2" />
                GitHub Repository
              </Button>
            </a>

            {/* <Button
              onClick={() => setAboutModalOpen(true)}
              variant="ghost"
              className="justify-start font-normal text-muted-foreground"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              About
            </Button> */}
          </div>
        </div>

        {screen === "projects" ? (
          <>{projects ? <DashboardProjects projects={projects} /> : null}</>
        ) : null}
      </div>
    </>
  );
}
