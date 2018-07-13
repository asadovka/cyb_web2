import * as React from 'react';
const styles = require("./SearchForm.less");



let input;
export const SearchForm = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    if (props.onSubmit) props.onSubmit(input.value)
  }
  return (
    <form onSubmit={onSubmit} className={styles.inputContainer}>
      <input 
        {...props} 
        type='text' 
        className={styles.input} 
        ref={node => {
          input = node 
        }} 
      />
      <span className={styles.inputIcone}/>
    </form>
  );
}