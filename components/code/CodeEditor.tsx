"use client";
import React, { useEffect, useState } from "react";
import Editor, { OnChange } from "@monaco-editor/react";
import axios from "axios";
import FileTree from "./FileTree";
import { ProjectFileType } from "@/lib/types";
import { getLanguageFromFileExtension } from "./getLanguageFromFileExtension";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Dot, FilesIcon, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { GoDotFill } from "react-icons/go";
import XTerm from "./Terminal";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { Navbar } from "./Navbar";
import { User } from "@prisma/client";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ProjectPreview } from "./ProjectPreview";

interface CodeEditorProps {
  files: ProjectFileType[];
  user: User;
}

const CodeEditor = ({ files, user }: CodeEditorProps) => {
  const [openFiles, setOpenFiles] = useState<ProjectFileType[]>([files[0]]);
  const [activeFile, setActiveFile] = useState<ProjectFileType | null>(
    files[0]
  );
  const [fileContents, setFileContents] = useState<{ [key: string]: string }>(
    {}
  );
  const [fileModified, setFileModified] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isFileTreeVisible, setIsFileTreeVisible] = useState<boolean>(true);

  useEffect(() => {
    if (activeFile && !fileContents[activeFile.path]) {
      fetchFileContent(activeFile);
    }
  }, [activeFile]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeFile, fileContents]);

  async function fetchFileContent(file: ProjectFileType) {
    try {
      const { data } = await axios.get(file.url);

      setFileContents((prev) => ({
        ...prev,
        [file.path]: data,
      }));
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  }

  const handleEditorChange: OnChange = (value) => {
    if (activeFile) {
      setFileContents((prev) => ({ ...prev, [activeFile.path]: value || "" }));
      setFileModified((prev) => ({ ...prev, [activeFile.path]: true }));
    }
  };

  async function handleSave() {
    if (activeFile) {
      try {
        toast.success("File saved.");
        setFileModified((prev) => ({ ...prev, [activeFile.path]: false }));
      } catch (error) {
        console.error("Error saving file:", error);
        alert("Failed to save file.");
      }
    }
  }

  function handleFileSelect(file: ProjectFileType): void {
    if (!openFiles.find((f) => f.path === file.path)) {
      setOpenFiles((prev) => [...prev, file]);
    }
    setActiveFile(file);
  }

  function handleTabClose(file: ProjectFileType): void {
    setOpenFiles((prev) => prev.filter((f) => f.path !== file.path));
    if (activeFile?.path === file.path) {
      setActiveFile(openFiles.length > 1 ? openFiles[0] : null);
    }
  }

  function toggleFileTreeVisibility(): void {
    setIsFileTreeVisible(!isFileTreeVisible);
  }

  return (
    <ResizablePanelGroup
      className="flex h-screen w-screen"
      direction="horizontal"
    >
      {/* nav, file-tree, code */}
      <ResizablePanel defaultSize={65} className="w-screen flex h-screen">
        <Navbar
          toggleFileTreeVisibility={toggleFileTreeVisibility}
          user={user}
          isFileTreeVisible={isFileTreeVisible}
        />

        {/* file tree */}
        {isFileTreeVisible && (
          <div className="w-1.5/5 h-full">
            <ScrollArea className="h-screen">
              <FileTree files={files} onSelectFile={handleFileSelect} />
              <ScrollBar orientation="vertical" className="bg-zinc-700" />
            </ScrollArea>
          </div>
        )}

        {/* code editor */}
        <div className="flex flex-col h-full pt-1 w-full">
          {/* active files */}
          <div className="flex w-full">
            <div className=" pb-1 px-1 max-w-fit flex gap-2 overflow-auto tab-scroll">
              {/* <ScrollArea className="flex space-x-2 pb-1 px-1 w-full "> */}
              {openFiles.map((file) => (
                <div
                  key={file.path}
                  className={`pl-2 pr-1 py-1 cursor-pointer flex items-center hover:bg-zinc-800 justify-center gap-[2px] rounded-sm ${
                    activeFile?.path === file.path
                      ? "bg-zinc-700/55"
                      : "bg-zinc-800/55"
                  }`}
                  onClick={() => setActiveFile(file)}
                >
                  <p className="text-sm whitespace-nowrap">
                    {file.path.split("/").pop()}
                  </p>

                  {fileModified[file.path] && <GoDotFill />}

                  <button
                    onClick={() => handleTabClose(file)}
                    className=" text-red-200 hover:bg-transparent/30 p-[2px] rounded-sm"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {/* <ScrollBar orientation="vertical" />
            </ScrollArea> */}
            </div>
          </div>

          {activeFile && (
            <Editor
              height="100%"
              language={getLanguageFromFileExtension(activeFile.path)}
              value={fileContents[activeFile.path]}
              theme="vs-dark"
              onChange={handleEditorChange}
              className=" "
            />
          )}
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* terminal, project preview */}
      <ResizablePanel
        defaultSize={35}
        minSize={20}
        className="w-full flex-grow h-full"
      >
        <ResizablePanelGroup className="h-screen w-full" direction="vertical">
          <ResizablePanel defaultSize={50} minSize={20}>
            <ProjectPreview />
            {/* <XTerm /> */}
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={50} minSize={20}>
            {/* <XTerm /> */}
            <ProjectPreview />
          </ResizablePanel>
        </ResizablePanelGroup>
        {/* <ProjectPreview /> */}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default CodeEditor;
