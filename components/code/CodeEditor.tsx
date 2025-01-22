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

const CodeEditor = ({ files }: { files: ProjectFileType[] }) => {
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
    <div className="flex h-screen">
      {/* file tree */}
      {isFileTreeVisible && (
        <div className="w-1/6">
          <FileTree files={files} onSelectFile={handleFileSelect} />
        </div>
      )}

      <div
        className={`flex flex-col ${
          isFileTreeVisible ? "w-4/5" : "w-full"
        } p-4`}
      >
        <div className="flex space-x-2  mb-2">
          {/* hide or unhide file */}
          <Button
            size="icon"
            variant="secondary"
            onClick={toggleFileTreeVisibility}
            className="text-gray-500"
          >
            {isFileTreeVisible ? <FaChevronLeft /> : <FaChevronRight />}
          </Button>

          {/* active files */}
          {openFiles.map((file) => (
            <div
              key={file.path}
              className={`px-2 cursor-pointer flex items-center justify-center gap-[2px] rounded-sm ${
                activeFile?.path === file.path ? "bg-zinc-800" : "bg-zinc-900"
              }`}
              onClick={() => setActiveFile(file)}
            >
              <p className="text-sm">{file.path.split("/").pop()}</p>

              {fileModified[file.path] && <GoDotFill />}

              <button
                onClick={() => handleTabClose(file)}
                className=" text-red-200 hover:bg-transparent/30 p-[2px] rounded-sm"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {activeFile && (
          <Editor
            height="100%"
            language={getLanguageFromFileExtension(activeFile.path)}
            value={fileContents[activeFile.path]}
            theme="vs-dark"
            onChange={handleEditorChange}
            className="border flex-grow"
          />
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
