import { useEffect, useState } from "react";
import useUIStore from "../../stores/UIStore";

import styles from "./Line.module.scss";

function Line({
  type,
  command,
  secondEnter,
  setSecondEnter,
  scrollBottomOnContainer,
  textSpeed
}: {
  type: string;
  command: string;
  secondEnter: boolean;
  setSecondEnter: (secondEnter: boolean) => void;
  scrollBottomOnContainer: () => void;
  textSpeed?: number;
}) {
  const [text, setText] = useState<string>("");
  const [timer, setTimer] = useState(0);
  const [focusTimer, setFocusTimer] = useState(0);

  // UIStore
  const textSpeedStore = useUIStore((state) => state.textSpeed);
  const setIsTerminalSpeaking = useUIStore((state) => state.setIsTerminalSpeaking);

  const speed = textSpeed || textSpeedStore;

  useEffect(() => {
    if (secondEnter) {
      clearInterval(timer);
      clearInterval(focusTimer);
      setText(command);
      setSecondEnter(false);
      setIsTerminalSpeaking(false);
      setTimeout(() => {
        scrollBottomOnContainer();
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondEnter]);

  useEffect(() => {
    if (type === "cout") {
      speak(command);
    } else {
      setText(command);
      scrollBottomOnContainer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [command, type, speed]);

  const speak = (s: string) => {
    setIsTerminalSpeaking(true);
    let index = 0;
    setFocusTimer(
      window.setInterval(() => {
        scrollBottomOnContainer();
      }, 300)
    );
    setTimer(
      window.setInterval(() => {
        const char = s.charAt(index);
        if (char === "<") {
          index = s.indexOf(">", index);
        }

        setText(s.substring(0, index));

        if (++index === s.length + 1) {
          clearInterval(timer);
          clearInterval(focusTimer);
          setSecondEnter(false);
          setIsTerminalSpeaking(false);
          scrollBottomOnContainer();
        }
      }, speed)
    );
  };

  return (
    <div className={styles.container}>
      <span className={`${styles.text} ${type === "cin" ? styles.cin : ""}`}>{text}</span>
    </div>
  );
}

export default Line;
