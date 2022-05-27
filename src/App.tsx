/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import Line from "./components/Line/Line";
import PromptLine from "./components/PromptLine/PromptLine";
import useEventListener from "./hooks/useEventListener";
import useUIStore from "./stores/UIStore";
import useActionStore from "./stores/ActionStore";
import useStoryStore from "./stores/StoryStore";

import actions from "./data/actions.json";

import styles from "./App.module.scss";

window.isTouchDevice = () => !!navigator.maxTouchPoints || "ontouchstart" in document.documentElement;

type PrintType = "cin" | "cout";

function App() {
  const [promptText, setPromptText] = useState<string>("");
  const [currentLineFromHistory, setCurrentLineFromHistory] = useState<number>(0);
  const [previousLines, setPreviousLines] = useState<Array<{ type: string; text: string }>>([]);
  const [commandHistory, setCommandHistory] = useState<Array<string>>([]);
  const [hasShakeClass, setHasShakeClass] = useState<boolean>(false);
  const [secondEnter, setSecondEnter] = useState<boolean>(false);

  // UIStore
  const cinEnabled = useUIStore((state) => state.cinEnabled);
  const isTerminalSpeaking = useUIStore((state) => state.isTerminalSpeaking);

  // ActionStore
  const action = useActionStore((state) => state.action);
  const actionType = useActionStore((state) => state.actionType);
  const finishedAction = useActionStore((state) => state.finishedAction);
  const setAction = useActionStore((state) => state.setAction);
  const setActionType = useActionStore((state) => state.setActionType);
  const increaseFinishedAction = useActionStore((state) => state.increaseFinishedAction);

  // StoryStore
  const stories = useStoryStore((state) => state.stories);
  const increaseStoryCount = useStoryStore((state) => state.increaseStoryCount);
  const setStoryShown = useStoryStore((state) => state.setStoryShown);

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

  const trim = (str: string): string => str.trimStart().trimEnd();
  const removeSpaces = (s: string): string => s.replace(/\s+/g, " ").trim();

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
    // Get user input or do next action from `src/data/actions.json`
    if (cinEnabled) {
      setCurrentLineFromHistory(0);
      const input = removeSpaces(promptText);
      if (input !== "") print(input, "cin");
    } else {
      doAction();
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
      // timeout should be the same with animation speed (0.8s, see `.shake` style on the App.module.scss)
    }, 800);
  };

  const addCommandToHistory = (input: string) => {
    if (input !== "") {
      setCommandHistory((prevState) => [...prevState, input]);
    }
  };

  const print = (s = "", type: PrintType = "cout") => {
    // TODO: set add to quee inserted prints
    setPreviousLines((prevState) => [
      ...prevState,
      {
        type,
        text: trim(s)
      }
    ]);

    if (type === "cin") {
      addCommandToHistory(s);
      setPromptText("");
    }
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

  // Story actions
  const showStory = async (storyName: string) => {
    const story = stories.find((s) => s.name === storyName);
    if (story) {
      const index = stories.indexOf(story);
      print(`${story.text}\n. . .`);
      setStoryShown(index, true);
      increaseStoryCount();
      increaseFinishedAction();
      setAction(storyName);
      setActionType("story");
    } else {
      print("ERROR! Story missing.");
    }
  };

  function doAction() {
    const nextAction = actions[finishedAction];
    // console.log(finishedAction);
    // console.log(nextAction);

    switch (nextAction.type) {
      case "story":
        if (nextAction) showStory(nextAction.name);
        break;
      case "dialogue":
        break;
      case "dialogueAnswer":
        break;
      case "fight":
        break;

      default:
        break;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.terminal} onClick={focusTerminalIfTouchDevice} onMouseDown={focusTerminalIfTouchDevice}>
        <div ref={terminalContainerRef} className={styles.terminalOutputContainer}>
          {/* TODO: remove this element */}
          <span
            style={{
              backgroundColor: isTerminalSpeaking ? "red" : "green",
              height: 20,
              width: 20,
              position: "absolute",
              right: 5,
              top: 5,
              borderRadius: "50%"
            }}
          ></span>
          <div className={styles.terminalOutput}>
            {previousLines.map((line, i) => (
              <Line
                key={`line${i}`}
                type={line.type}
                command={line.text}
                scrollBottomOnContainer={scrollBottomOnContainer}
                secondEnter={secondEnter}
                setSecondEnter={setSecondEnter}
              />
            ))}
            <PromptLine
              ref={promptRef}
              value={promptText}
              setValue={setPromptText}
              username={""}
              textClassName={hasShakeClass ? styles.shake : ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
