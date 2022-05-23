import React, { useEffect, useState } from "react";

import styles from "./Line.module.scss";

function Line({ command }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (command.type === "cout") {
      speak(command.text, 30);
    } else {
      setText(command.text);
    }
  }, [command]);

  const speak = (sentence, speed) => {
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
      <span
        className={`${styles.text} ${command.type === "cin" ? styles.cin : ""}`}
      >
        {text}
      </span>
    </div>
  );
}

export default Line;
