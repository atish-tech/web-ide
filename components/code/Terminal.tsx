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

      return () => {
        terminal.current?.dispose();
      };
    }
  }, []);

  return <div ref={terminalRef} style={{ height: "100%", width: "100%" }} />;
};

export default XTerm;
