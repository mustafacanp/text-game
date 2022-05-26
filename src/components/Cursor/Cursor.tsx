/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import useEventListener from "../../hooks/useEventListener";

import styles from "./Cursor.module.scss";

function Cursor({ promptText }: { promptText: string }) {
  const [cursorLetter, setCursorLetter] = useState("");
  const [cursorFromTheRight, setCursorFromTheRight] = useState(0);
  const [cursorStyle, setCursorStyle] = useState({});

  useEffect(() => {
    moveCursor();
  }, [cursorFromTheRight]);

  useEffect(() => {
    if (!promptText || promptText.length === 0 || cursorFromTheRight === 0) {
      resetState();
    }
    moveCursor();
  }, [promptText, cursorFromTheRight]);

  const resetState = () => {
    setCursorLetter("");
    setCursorFromTheRight(0);
    setCursorStyle({});
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handles non-printable chars.
    switch (e.keyCode) {
      case 37:
        handleLeftArrow();
        break;
      case 39:
        handleRightArrow();
        break;
      case 46:
        handleRightArrow();
        break; // del
      default:
        break;
    }
  };
  useEventListener("keydown", handleKeyDown);

  const moveCursor = () => {
    if (cursorFromTheRight <= promptText.length) {
      setCursorStyle({
        marginLeft: -7.7 * cursorFromTheRight + "px"
      });
      setCursorLetter(promptText[promptText.length - cursorFromTheRight]);
    } else {
      setCursorStyle({});
      setCursorLetter(promptText[promptText.length]);
    }
  };

  const handleLeftArrow = () => {
    if (cursorFromTheRight < promptText.length) setCursorFromTheRight(cursorFromTheRight + 1);
  };

  const handleRightArrow = () => {
    if (cursorFromTheRight > 0) setCursorFromTheRight(cursorFromTheRight - 1);
  };

  return (
    <span style={cursorStyle} className={styles.promptCursor}>
      {cursorLetter}
    </span>
  );
}

export default Cursor;
