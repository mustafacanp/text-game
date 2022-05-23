import React, { useRef, useState, useEffect } from "react";
import Line from "./components/Line/Line";
import { FSEntry } from "./enums";
import Prompt from "./components/Prompt/Prompt";
import useEventListener from "./hooks/useEventListener";

import styles from "./App.module.scss";

window.isTouchDevice = () =>
  navigator.maxTouchPoints || "ontouchstart" in document.documentElement;

function App() {
  const [promptText, setPromptText] = useState("");
  const [currentLineFromHistory, setCurrentLineFromHistory] = useState(0);
  const [previousLines, setPreviousLines] = useState([]);
  const [previousInputs, setPreviousInputs] = useState([]);

  const promptRef = useRef();
  const terminalContainerRef = useRef();

  useEffect(() => {
    focusTerminal();
    cout("Hello World!");
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

  useEffect(() => {
    if (currentLineFromHistory) updatePromptFromHistory();
  }, [currentLineFromHistory]);

  const createNewLine = (type, text) => {
    return {
      type,
      text: trim(text),
    };
  };

  const cin = (text = "") => {
    const newLine = createNewLine("cin", text);
    setPreviousLines([...previousLines, newLine]);
    setPromptText("");
    focusTerminal();
  };

  const cout = (text = "") => {
    const newLine = createNewLine("cout", text);
    setPreviousLines([...previousLines, newLine]);
    setPromptText("");
    focusTerminal();
  };

  const updatePreviousInputs = (input) => {
    if (input !== "") {
      setPreviousInputs([...previousInputs, input]);
    }
  };

  const trim = (str) => str.trimStart().trimEnd();
  const removeSpaces = (text) => text.replace(/\s+/g, " ").trim();

  const isDir = (obj) =>
    !!(obj && FSEntry.parse(obj.type) === FSEntry.DIRECTORY);
  const isFile = (obj) => !!(obj && FSEntry.parse(obj.type) === FSEntry.FILE);

  const handleKeyDown = (e) => {
    // Handles non-printable chars
    if (e.ctrlKey || e.altKey || e.key === "Shift") {
      e.preventDefault();
      e.returnValue = false;
      return false;
    }

    setPromptText(e.target.value);

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

  const handleEnter = () => {
    setCurrentLineFromHistory(0);

    const input = removeSpaces(promptText);
    if (input !== "") cin(input);

    updatePreviousInputs(input);
    setPromptText("");
  };

  const scrollBottomOnContainer = () => {
    terminalContainerRef.current.scroll({
      top: terminalContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleUpArrow = (e) => {
    e.preventDefault();
    if (currentLineFromHistory < previousInputs.length)
      setCurrentLineFromHistory(currentLineFromHistory + 1);
  };

  const handleDownArrow = () => {
    if (currentLineFromHistory > 1)
      setCurrentLineFromHistory(currentLineFromHistory - 1);
  };

  const updatePromptFromHistory = () => {
    setPromptText(
      previousInputs[previousInputs.length - currentLineFromHistory]
    );
  };

  const focusTerminal = () => {
    promptRef.current.focus();
    scrollBottomOnContainer();
  };
  useEventListener("click", focusTerminal);

  const copy = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
  };

  const focusTerminalIfTouchDevice = (e) => {
    if (e.buttons === 2) {
      // Copy selection on mouse right-click
      e.preventDefault();
      if (window.getSelection().toString() !== "") {
        copy(window.getSelection().toString());
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
        onMouseDown={(e) => focusTerminalIfTouchDevice(e)}
      >
        <div
          ref={terminalContainerRef}
          className={styles.terminalOutputContainer}
        >
          <div className={styles.terminalOutput}>
            {previousLines.map((command, i) => (
              <Line key={`line${i}`} command={command} />
            ))}
            <Prompt
              ref={promptRef}
              username={"settings.userName"}
              computerName={"state.settings.computerName"}
              value={promptText}
              setValue={setPromptText}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
