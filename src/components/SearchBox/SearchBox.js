import * as React from 'react';

const styles = require("./SearchBox.css");

export const Legend = ({ children }) => (
  <span className={styles.legend}>
    {children}
  </span>
);

let input;
export const SearchForm = ({ inputRef, ...props }) => {

  const onSubmit = (e) => {
    e.preventDefault();
    if (props.onSubmit) props.onSubmit(input.value, null, input)
  }

  return (
    <form onSubmit={onSubmit} className={styles.inputContainer}>
      <input
        {...props}
        type='text'
        className={styles.input}
        ref={node => {
          input = node;
          if (inputRef) inputRef(node);
        }}
      />
      <span className={styles.inputIcone} onClick={onSubmit}/>
    </form>
  );
}

export const AppPrefix = ({ children }) => (
	<div className={styles.appPrefix}>{children}</div>
);
