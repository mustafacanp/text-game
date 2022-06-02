import { useEffect, useState } from "react";
import classnames from "classnames";
import parse from "html-react-parser";

import useUIStore from "../../stores/UIStore";

import styles from "./Line.module.scss";

export type Print = "cin" | "cout" | "choice";

function Line({
  type,
  command,
  secondEnter,
  setSecondEnter,
  scrollBottomOnContainer,
  textSpeed
}: {
  type: Print;
  command: string;
  secondEnter: boolean;
  setSecondEnter: (secondEnter: boolean) => void;
  scrollBottomOnContainer: () => void;
  textSpeed?: number;
}) {
  const [text, setText] = useState<string>("");
  const [intervals, setIntervals] = useState<{ [key: string]: number }>({});

  // UIStore
  const textSpeedStore = useUIStore((state) => state.textSpeed);
  const setIsTerminalSpeaking = useUIStore((state) => state.setIsTerminalSpeaking);

  const speed = textSpeed || textSpeedStore;

  useEffect(() => {
    if (secondEnter) {
      clearIntervals();
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
    const timerId = Object.keys(intervals).length;

    const timer: number = window.setInterval(() => {
      scrollBottomOnContainer();
    }, 300);

    const timer2: number = window.setInterval(() => {
      const char = s.charAt(index);
      if (char === "<") {
        index = s.indexOf(">", index);
      }
      setText(s.substring(0, index));
      if (++index === s.length + 1) {
        clearIntervals();
        setSecondEnter(false);
        setIsTerminalSpeaking(false);
        scrollBottomOnContainer();
      }
    }, speed);

    setIntervals({
      [timerId]: timer,
      [timerId + 1]: timer2
    });
  };

  const clearIntervals = () => {
    // TODO: There is a bug here
    // If text ends with speak (not with the second enter), it keeps running timers
    // That triggers scroll bottom constantly and the user is not able to scroll up to see previous commands
    // console.log(intervals);
    for (let i = 0; i < Object.keys(intervals).length; i++) {
      clearInterval(intervals[i]);
    }
  };

  return (
    <div className={styles.container}>
      <span className={classnames(styles.text, { [styles.cin]: type === "cin", [styles.choice]: type === "choice" })}>
        {parse(text)}
      </span>
    </div>
  );
}

export default Line;
