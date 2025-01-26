import React, { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "@xterm/addon-fit";
import "xterm/css/xterm.css";

const XTerm: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminal.current = new Terminal();
      fitAddon.current = new FitAddon();
      terminal.current.loadAddon(fitAddon.current);
      terminal.current.open(terminalRef.current);
      fitAddon.current.fit();

      // Example: Write some text to the terminal
      terminal.current.writeln("Welcome to xterm.js");

      // Handle terminal resize
      window.addEventListener("resize", () => {
        fitAddon.current?.fit();
      });

      // Handle terminal input
      terminal.current.onData((data) => {
        handleTerminalInput(data);
      });

      return () => {
        terminal.current?.dispose();
      };
    }
  }, []);

  function handleTerminalInput(data: string): void {
    if (data === "\r") {
      // Enter key
      terminal.current?.writeln("");
    } else if (data === "\u0003") {
      // Ctrl+C
      terminal.current?.writeln("^C");
    } else if (data === "\u007F") {
      // Backspace key
      terminal.current?.write("\b \b");
    } else {
      terminal.current?.write(data);
    }
  }

  return <div ref={terminalRef} style={{ height: "100%", width: "100%" }} />;
};

export default XTerm;
