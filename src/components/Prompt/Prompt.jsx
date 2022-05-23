import React from "react";
import Cursor from "../Cursor/Cursor";
import PropTypes from "prop-types";

import styles from "../Prompt/Prompt.module.scss";
import lineStyles from "../Line/Line.module.scss";

const Prompt = React.forwardRef(({ value, setValue }, ref) => {
  return (
    <div className={`${lineStyles.container} ${styles.inputContainer}`}>
      <input
        className={styles.input}
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <span className={lineStyles.text}>{value}</span>
      <Cursor promptText={value} />
    </div>
  );
});

Prompt.propTypes = {
  username: PropTypes.string.isRequired,
  computerName: PropTypes.string.isRequired,
};

export default Prompt;
