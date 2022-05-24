/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import Line from "./components/Line/Line";
import PromptLine from "./components/PromptLine/PromptLine";
import useEventListener from "./hooks/useEventListener";

import styles from "./App.module.scss";

window.isTouchDevice = () =>
  !!navigator.maxTouchPoints || "ontouchstart" in document.documentElement;

type PrintType = "cin" | "cout";

function App() {
  const [promptText, setPromptText] = useState<string>("");
  const [currentLineFromHistory, setCurrentLineFromHistory] =
    useState<number>(0);
  const [previousLines, setPreviousLines] = useState<
    Array<{ type: string; text: string }>
  >([]);
  const [previousInputs, setPreviousInputs] = useState<Array<string>>([]);

  const promptRef = useRef<HTMLInputElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    focusTerminal();
    print("Hello World!", "cout");
  }, []);

  useEffect(() => {
    focusTerminal();
  }, [promptText]);

  useEffect(() => {
    setTimeout(() => {
      if (promptRef.current) {
        focusTerminal();
      }
    }, 100);
  }, [promptRef]);

  const trim = (str: string): string => str.trimStart().trimEnd();
  const removeSpaces = (text: string): string =>
    text.replace(/\s+/g, " ").trim();

  const handleKeyDown = (e: React.KeyboardEvent): any => {
    // Handles non-printable chars
    if (e.ctrlKey || e.altKey || e.key === "Shift") {
      e.preventDefault();
      return false;
    }
    const target = e.target as HTMLInputElement;
    setPromptText(target.value);

    switch (e.keyCode) {
      case 13:
        handleEnter();
        break; // enter
      case 38:
        handleUpArrow(e);
        break; // up
      case 40:
        handleDownArrow();
        break; // down
      default:
        break;
    }
  };
  useEventListener("keydown", handleKeyDown, promptRef.current);

  const handleEnter = (): void => {
    setCurrentLineFromHistory(0);
    const input = removeSpaces(promptText);
    if (input !== "") print(input, "cin");

    updatePreviousInputs(input);
    setPromptText("");
  };

  const updatePreviousInputs = (input: string) => {
    if (input !== "") {
      setPreviousInputs([...previousInputs, input]);
    }
  };

  const print = (text = "", type: PrintType) => {
    const newLine = createNewLine(type, text);
    setPreviousLines([...previousLines, newLine]);
    setPromptText("");
    focusTerminal();
  };

  // Up and down arrows to navigate in the command history
  useEffect(() => {
    if (currentLineFromHistory) updatePromptFromHistory();
  }, [currentLineFromHistory]);

  const handleUpArrow = (e: React.KeyboardEvent): void => {
    e.preventDefault();
    if (currentLineFromHistory < previousInputs.length)
      setCurrentLineFromHistory(currentLineFromHistory + 1);
  };

  const handleDownArrow = (): void => {
    if (currentLineFromHistory > 1)
      setCurrentLineFromHistory(currentLineFromHistory - 1);
  };

  const updatePromptFromHistory = (): void => {
    setPromptText(
      previousInputs[previousInputs.length - currentLineFromHistory]
    );
  };

  const scrollBottomOnContainer = (): void => {
    if (terminalContainerRef.current)
      terminalContainerRef.current.scroll({
        top: terminalContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
  };

  const focusTerminal = (): void => {
    if (promptRef.current) {
      promptRef.current.focus();
    }
    scrollBottomOnContainer();
  };
  useEventListener("click", focusTerminal);

  const createNewLine = (
    type: PrintType,
    text: string
  ): { type: PrintType; text: string } => {
    return {
      type,
      text: trim(text),
    };
  };

  const copy = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
  };

  const focusTerminalIfTouchDevice = (e: any): void => {
    if (e.buttons === 2) {
      // Copy selection on mouse right-click
      e.preventDefault();
      if (window.getSelection() && window.getSelection()!.toString() !== "") {
        copy(window.getSelection()!.toString());
      }
    }
    if (window.isTouchDevice()) {
      focusTerminal();
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.terminal}
        onClick={focusTerminalIfTouchDevice}
        onMouseDown={focusTerminalIfTouchDevice}
      >
        <div
          ref={terminalContainerRef}
          className={styles.terminalOutputContainer}
        >
          <div className={styles.terminalOutput}>
            {previousLines.map((line, i) => (
              <Line key={`line${i}`} type={line.type} command={line.text} />
            ))}
            <PromptLine
              ref={promptRef}
              value={promptText}
              setValue={setPromptText}
              username={"afsfsa"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
