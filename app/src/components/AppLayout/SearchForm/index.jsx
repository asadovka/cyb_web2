import * as React from 'react';

const styles = require("./SearchForm.less");


let input;
export const SearchForm = ( { defaultValue, ...props }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(input.value);
  }
  return (
    <form onSubmit={onSubmit} action='/search' className={styles.searchForm}>
      <input 
        name='q' 
        className={styles.searchFormInput} 
        placeholder='Adds' 
        defaultValue={defaultValue}
        ref={node => {
          input = node 
        }} 
      />
    </form>
  );
}
