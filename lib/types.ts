export interface FileType {
  path: string;
  content: string;
}

export interface StaterCodeType {
  react: FileType[];
  node: FileType[];
}

export type ProjectType = "react" | "node";

export interface ProjectFileType {
  url: string;
  path: string;
}
