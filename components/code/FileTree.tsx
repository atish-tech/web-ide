import React, { useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { getFileIcon } from "./fileIcons";

interface FileTreeProps {
  files: { url: string; path: string }[];
  onSelectFile: (file: { url: string; path: string }) => void;
}

const FileTree: React.FC<FileTreeProps> = ({ files, onSelectFile }) => {
  const fileTree = buildFileTree(files);

  const renderFileTree = (nodes: FileNode[]) => {
    return nodes.map((node) => (
      <FileTreeNode key={node.path} node={node} onSelectFile={onSelectFile} />
    ));
  };

  return (
    <div className="w-full h-full bg-zinc-800 border-r-2 p-3">
      <ul className="list-none p-0">{renderFileTree(fileTree)}</ul>
    </div>
  );
};

interface FileTreeNodeProps {
  node: FileNode;
  onSelectFile: (file: { url: string; path: string }) => void;
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({ node, onSelectFile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="cursor-pointer p-2 hover:bg-transparent/10">
      {node.children && node.children.length > 0 ? (
        <div onClick={handleToggle} className="flex items-center">
          {isOpen ? <FaFolderOpen /> : <FaFolder />} {node.name}
        </div>
      ) : (
        <div onClick={() => onSelectFile(node)} className="flex items-center">
          {React.createElement(getFileIcon(node.name))} {node.name}
        </div>
      )}
      {isOpen && node.children && (
        <ul className="list-none pl-4">
          {node.children.map((childNode) => (
            <FileTreeNode
              key={childNode.path}
              node={childNode}
              onSelectFile={onSelectFile}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default FileTree;

export interface FileNode {
  name: string;
  path: string;
  url: string;
  children?: FileNode[];
}

export const buildFileTree = (
  files: { url: string; path: string }[]
): FileNode[] => {
  const root: FileNode[] = [];

  files.forEach((file) => {
    const parts = file.path.split("/").slice(2); // Ignore the first two levels
    let currentLevel = root;

    parts.forEach((part, index) => {
      const existingNode = currentLevel.find((node) => node.name === part);

      if (existingNode) {
        currentLevel = existingNode.children || [];
      } else {
        const newNode: FileNode = {
          name: part,
          path: parts.slice(0, index + 3).join("/"), // Adjust the path to include the ignored levels
          url: file.url,
          children: [],
        };

        currentLevel.push(newNode);
        currentLevel = newNode.children!;
      }
    });
  });

  return root;
};
