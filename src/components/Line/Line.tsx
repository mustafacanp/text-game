import React, { useEffect, useState } from "react";

import styles from "./Line.module.scss";

function Line({ type, command }: { type: string; command: string }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (type === "cout") {
      speak(command, 30);
    } else {
      setText(command);
    }
  }, [command, type]);

  const speak = (sentence: string, speed: number) => {
    let index = 0;
    const timer = setInterval(function () {
      const char = sentence.charAt(index);
      if (char === "<") {
        index = sentence.indexOf(">", index);
      }

      setText(sentence.substr(0, index));

      if (++index === sentence.length + 1) {
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
