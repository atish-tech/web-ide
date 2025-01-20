import React from "react";

interface FileTreeProps {
  files: { url: string; path: string }[];
  onSelectFile: (file: { url: string; path: string }) => void;
}

const FileTree: React.FC<FileTreeProps> = ({ files, onSelectFile }) => {
  return (
    <div className="w-full bg-zinc-800 border-r-2 p-3">
      <ul className="list-none p-0">
        {files.map((file) => (
          <li
            key={file.path}
            onClick={() => onSelectFile(file)}
            className="cursor-pointer p-2 hover:bg-gray-200"
          >
            {file.path.split("/").pop()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileTree;
