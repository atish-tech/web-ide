export const getLanguageFromFileExtension = (filePath: string): string => {
  const extension = filePath.split(".").pop();
  switch (extension) {
    case "js":
      return "javascript";
    case "jsx":
      return "javascript";
    case "ts":
      return "typescript";
    case "tsx":
      return "typescript";
    case "html":
      return "html";
    case "css":
      return "css";
    case "json":
      return "javascript";
    case "md":
      return "markdown";
    case "py":
      return "python";
    case "java":
      return "java";
    case "c":
      return "c";
    case "cpp":
      return "cpp";
    case "cs":
      return "csharp";
    case "php":
      return "php";
    case "rb":
      return "ruby";
    case "go":
      return "go";
    case "rs":
      return "rust";
    case "sh":
      return "shell";
    default:
      return "plaintext";
  }
};
