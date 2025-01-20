"use client";
import React, { useEffect, useState } from "react";
import Editor, { OnChange } from "@monaco-editor/react";
import axios from "axios";
import FileTree from "./FileTree";
import { ProjectFileType } from "@/lib/types";

const CodeEditor = ({ files }: { files: ProjectFileType[] }) => {
  const [selectedFile, setSelectedFile] = useState<ProjectFileType | null>(
    null
  );
  const [fileContent, setFileContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedFile) {
      const fetchFileContent = async () => {
        try {
          const response = await axios.get(selectedFile.url);
          setFileContent(response.data);
        } catch (error) {
          console.error("Error fetching file content:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchFileContent();
    }
  }, [selectedFile]);

  const handleEditorChange: OnChange = (value) => {
    setFileContent(value || "");
  };

  // const handleSave = async () => {
  //   try {
  //     await axios.put("/api/save-file", {
  //       filePath: selectedFile.path,
  //       content: fileContent,
  //     });
  //     alert("File saved successfully!");
  //   } catch (error) {
  //     console.error("Error saving file:", error);
  //     alert("Failed to save file.");
  //   }
  // };

  return (
    <div className="flex h-screen">
      <div className="w-1/5 bg-gray-100 border-r border-gray-300 p-4">
        <FileTree files={files} onSelectFile={setSelectedFile} />
      </div>
      <div className="w-4/5 p-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Editor
            height="90vh"
            defaultLanguage="javascript"
            value={fileContent}
            onChange={handleEditorChange}
            className="border border-gray-300"
          />
        )}
        <button
          // onClick={handleSave}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
