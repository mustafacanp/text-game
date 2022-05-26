import { useEffect, useState } from "react";
import useUIStore from "../../stores/UIStore";

import styles from "./Line.module.scss";

function Line({ type, command }: { type: string; command: string }) {
  const [text, setText] = useState("");
  const textSpeed = useUIStore((state) => state.textSpeed);

  useEffect(() => {
    if (type === "cout") {
      speak(command, textSpeed);
    } else {
      setText(command);
    }
  }, [command, type, textSpeed]);

  const speak = (s: string, speed: number) => {
    let index = 0;
    const timer = setInterval(function () {
      const char = s.charAt(index);
      if (char === "<") {
        index = s.indexOf(">", index);
      }

      setText(s.substring(0, index));

      if (++index === s.length + 1) {
        clearInterval(timer);
      }
    }, speed);
  };

  return (
    <div className={styles.container}>
      <span className={`${styles.text} ${type === "cin" ? styles.cin : ""}`}>
        {text}
      </span>
    </div>
  );
}

export default Line;
