/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";

import Line from "../Line/Line";
import PromptLine from "../PromptLine/PromptLine";
import useUIStore from "../../stores/UIStore";
import useActionStore from "../../stores/ActionStore";

import useEventListener from "../../hooks/useEventListener";
import useStory from "../../hooks/useStory";
import useDialog from "../../hooks/useDialog";
import useAnimation from "../../hooks/useAnimation";

import actions from "../../data/actions";

import styles from "./Terminal.module.scss";

import type { Action } from "../../data/actions";

window.isTouchDevice = () => !!navigator.maxTouchPoints || "ontouchstart" in document.documentElement;

function App() {
  const [currentLineFromHistory, setCurrentLineFromHistory] = useState<number>(0);
  const [hasShakeClass, setHasShakeClass] = useState<boolean>(false);
  const [secondEnter, setSecondEnter] = useState<boolean>(false);

  const setStoryName = useStory();
  const [setDialogName, setDialogAnswer] = useDialog();
  const [setAnimationName, showAnimation, renderAnimation] = useAnimation();

  // UIStore
  const promptText = useUIStore((state) => state.promptText);
  const commandHistory = useUIStore((state) => state.commandHistory);
  const printedLines = useUIStore((state) => state.printedLines);
  const cinEnabled = useUIStore((state) => state.cinEnabled);
  const isTerminalSpeaking = useUIStore((state) => state.isTerminalSpeaking);
  const setPromptText = useUIStore((state) => state.setPromptText);
  // ActionStore
  const action = useActionStore((state) => state.action);
  const finishedAction = useActionStore((state) => state.finishedAction);
  const setAction = useActionStore((state) => state.setAction);
  const isStory = useActionStore((state) => state.isStory);
  const isAnimation = useActionStore((state) => state.isAnimation);
  const isDialog = useActionStore((state) => state.isDialog);
  const isDialogAnswer = useActionStore((state) => state.isDialogAnswer);

  const promptRef = useRef<HTMLInputElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    doAction();
  }, []);

  useEffect(() => {
    focusTerminal();
  }, [promptText]);

  useEffect(() => {
    if (promptRef.current) {
      focusTerminal();
    }
  }, [promptRef]);

  const handleKeyDown = (e: React.KeyboardEvent): any => {
    // Handles non-printable chars
    if (e.ctrlKey || e.altKey || e.key === "Shift") {
      e.preventDefault();
      return false;
    }
    const target = e.target as HTMLInputElement;
    setPromptText(target.value);

    switch (e.key) {
      case "Enter":
        handleEnter();
        break;
      case "ArrowUp":
        handleArrowUp(e);
        break;
      case "ArrowDown":
        handleArrowDown();
        break;
      case "Escape":
        handleEscape();
        break;
      default:
        break;
    }
  };
  useEventListener("keydown", handleKeyDown, promptRef.current);

  const handleEnter = async () => {
    if (isTerminalSpeaking) {
      setSecondEnter(true);
      return addShakeClass();
    }
    // Get user input or do next action from `src/data/actions`
    if (cinEnabled) {
      setCurrentLineFromHistory(0);
      if (action && isDialogAnswer()) {
        setDialogAnswer(true);
      }
    } else {
      doAction();
    }
  };

  const doAction = (): void => {
    const action: Action = actions[finishedAction];
    setAction(action);

    if (action) {
      if (isStory()) {
        setStoryName(action.name);
      } else if (isDialog()) {
        setDialogName(action.name);
      } else if (isAnimation()) {
        setAnimationName(action.name);
      }
      // else if (isFight()) {
      //   createFight(action.name);
      // }
    }
  };

  const handleEscape = () => {
    if (isTerminalSpeaking) {
      setSecondEnter(true);
    }
  };

  const addShakeClass = () => {
    setHasShakeClass(true);
    setTimeout(() => {
      setHasShakeClass(false);
      // Timeout should be the same with animation speed (0.8s, see `.shake` style on the App.module.scss)
    }, 800);
  };

  // Up and down arrows to navigate in the command history
  useEffect(() => {
    if (currentLineFromHistory) updatePromptFromHistory();
  }, [currentLineFromHistory]);

  const handleArrowUp = (e: React.KeyboardEvent): void => {
    e.preventDefault();
    if (currentLineFromHistory < commandHistory.length) setCurrentLineFromHistory(currentLineFromHistory + 1);
  };

  const handleArrowDown = (): void => {
    if (currentLineFromHistory > 1) setCurrentLineFromHistory(currentLineFromHistory - 1);
  };

  const updatePromptFromHistory = (): void => {
    setPromptText(commandHistory[commandHistory.length - currentLineFromHistory]);
  };

  const scrollBottomOnContainer = (): void => {
    if (terminalContainerRef.current)
      terminalContainerRef.current.scroll({
        top: terminalContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
  };

  const focusTerminal = (): void => {
    if (promptRef.current) {
      promptRef.current.focus();
    }
    scrollBottomOnContainer();
  };
  useEventListener("click", focusTerminal);

  const copy = (s: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(s);
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
    <div className={styles.terminal} onClick={focusTerminalIfTouchDevice} onMouseDown={focusTerminalIfTouchDevice}>
      <div className={styles.animation}>{showAnimation ? renderAnimation() : null}</div>
      <div ref={terminalContainerRef} className={styles.output}>
        {/* TODO: remove this element */}
        <span
          style={{
            backgroundColor: cinEnabled ? "green" : "red",
            height: 20,
            width: 20,
            position: "absolute",
            right: 10,
            bottom: 10,
            borderRadius: "50%"
          }}
        ></span>
        {isTerminalSpeaking && (
          <span
            style={{
              color: "white",
              backgroundColor: "purple",
              position: "absolute",
              right: 5,
              bottom: 50,
              borderRadius: 5,
              padding: 3,
              fontSize: 12
            }}
          >
            Typing...
          </span>
        )}
        {printedLines.map((line, i) => (
          <Line
            key={`line${i}`}
            type={line.type}
            command={line.text}
            textSpeed={line.textSpeed}
            scrollBottomOnContainer={scrollBottomOnContainer}
            secondEnter={secondEnter}
            setSecondEnter={setSecondEnter}
          />
        ))}
      </div>
      <PromptLine
        ref={promptRef}
        value={promptText}
        setValue={setPromptText}
        username={""}
        textClassName={hasShakeClass ? styles.shake : ""}
      />
    </div>
  );
}

export default App;
