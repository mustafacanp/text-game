import { forwardRef } from "react";
import Cursor from "../Cursor/Cursor";

import styles from "../Prompt/Prompt.module.scss";
import lineStyles from "../Line/Line.module.scss";

const Prompt = forwardRef<
  HTMLInputElement,
  { value: string; setValue: (s: string) => void }
>(({ value, setValue }, ref) => {
  return (
    <div className={`${lineStyles.container} ${styles.inputContainer}`}>
      <input
        ref={ref}
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <span className={lineStyles.text}>{value}</span>
      <Cursor promptText={value} />
    </div>
  );
});

export default Prompt;
