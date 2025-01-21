import {
  FaFile,
  FaFileCode,
  FaFileImage,
  FaFilePdf,
  FaFileAlt,
  FaJava,
} from "react-icons/fa";
import { IconType } from "react-icons";

const fileIconMap: { [key: string]: IconType } = {
  js: FaFileCode,
  jsx: FaFileCode,
  ts: FaFileCode,
  tsx: FaFileCode,
  html: FaFileAlt,
  css: FaFileAlt,
  json: FaFileAlt,
  md: FaFileAlt,
  py: FaFileCode,
  java: FaFileCode,
  c: FaFileCode,
  cpp: FaFileCode,
  cs: FaFileCode,
  php: FaFileCode,
  rb: FaFileCode,
  go: FaFileCode,
  rs: FaFileCode,
  sh: FaFileCode,
  jpg: FaFileImage,
  jpeg: FaFileImage,
  png: FaFileImage,
  gif: FaFileImage,
  pdf: FaFilePdf,
};

export const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop();
  const Icon = fileIconMap[extension as string] || FaFile;
  return Icon;
};
