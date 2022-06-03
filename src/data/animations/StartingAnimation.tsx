/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import styles from "./StartingAnimation.module.scss";

function StartingAnimation() {
  const [bird1, setBird1] = useState<string>("/`\\");
  const [bird2, setBird2] = useState<string>("\\,/");

  useEffect(() => {
    animate();
  }, []);

  const animate = () => {
    const frames = 100;
    for (let i = 1; i <= frames; i++) {
      introBirdsFly(i, frames);
    }
  };

  function introBirdsFly(i: number, frames: number) {
    let bird1Text = "",
      bird2Text = "";
    if (i % 2 === 0) {
      bird1Text = "/`\\";
      bird2Text = "\\,/";
    } else {
      bird1Text = "\\,/";
      bird2Text = "/`\\";
    }
    setTimeout(function () {
      setBird1(bird1Text);
      setBird2(bird2Text);
      if (i === frames) {
        setBird1("");
        setBird2("");
      }
    }, i * 300);
  }

  return (
    <div className={styles.container}>
      {`
                                                 |>>>
                                                 |
                                   |>>>      _  _|_  _         |>>>
                                   |        |;| |;| |;|        |
                               _  _|_  _    \\.    .   /       _|_  _
                               |;|_|;|_|;|   \\:. ,   /    |;|_|;|_|;|
                               \\..      /    ||;   . |     \\.    .  /
                                \\.  ,  /     ||:  .  |      \\:  .  /
                                ||:   |_   _ ||_ . _ | _   _||:   |
                                ||:  .|||_|;|_|;|_|;|_|;|_|;||:.  |
                                ||:   ||.    .     .      . ||:  .|
                                ||: . || .     . .   .  ,   ||:   |       `}
      <span className={styles.bird}>{bird1}</span>
      {`
                                ||:   ||:  ,  _______   .   ||: , |            `}
      <span className={styles.bird}>{bird2}</span>
      {`
                                ||:   || .   /+++++++\\   .  ||:   |    `}
      <span className={styles.bird}>{bird2}</span>
      {`
                                ||:   ||.    |+++++++| .    ||: . |
                             __ ||: . ||: ,  |+++++++|.  . _||_   |
                    ____--\`~    --~~__|.     |+++++++|----~    ~\`---,                   ___
          __---~~---_____-~   ~----~---~--~                   ~---__|,--~_|,--~ _____-~       ~~----_____-~   ~----~~---_____-~   ~----~---__,--~ ~~--_____-~   ~--___
    __-~~/                                                                                                                                                        ~~--\\__ ~----~---__
`}
    </div>
  );
}

export default StartingAnimation;
