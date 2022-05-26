import { forwardRef } from "react";
import Cursor from "../Cursor/Cursor";

import styles from "../PromptLine/PromptLine.module.scss";
import lineStyles from "../Line/Line.module.scss";

const PromptLine = forwardRef<
  HTMLInputElement,
  {
    value: string;
    setValue: (s: string) => void;
    username: string;
    textClassName: string;
  }
>(({ value, setValue, username, textClassName }, ref) => {
  return (
    <div className={`${lineStyles.container} ${styles.inputContainer}`}>
      <span className={lineStyles.text}> {`/usr/${username}>`}</span>
      <input ref={ref} className={styles.input} value={value} onChange={(e) => setValue(e.target.value)} />
      <span className={`${lineStyles.text} ${styles.inputText} ${textClassName}`}>{value}</span>
      <Cursor promptText={value} />
    </div>
  );
});

export default PromptLine;
