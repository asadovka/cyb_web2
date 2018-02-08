import * as React from 'react';

const styles = require("./SearchForm.less");

import { browserHistory } from 'react-router'
import withRouter from "react-router/es/withRouter";

let input;
export const SearchForm = withRouter(({ location: { query : { q } } }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    browserHistory.push('/search?q=' + input.value);
  }
  return (
    <form onSubmit={onSubmit} action='/search' className={styles.searchForm}>
      <input 
        name='q' 
        className={styles.searchFormInput} 
        placeholder='Adds' 
        defaultValue={q}
        ref={node => {
          input = node 
        }} 
      />
    </form>
  );
})
