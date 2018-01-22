import * as React from "react";

const styles = require("./SearchForm.less");
import { browserHistory } from 'react-router'
import SearchIcon from 'material-ui-icons/Search';



function SearchForm(props) {
  const onSubmit = (e) => {
    e.preventDefault();
    browserHistory.push('/search?q=' + input.value);
  }
  let input;
  return (
    <form onSubmit={onSubmit}>
      <div className={styles.wrapper}>
        <div className={styles.search}>
          <SearchIcon />
        </div>
        <input ref={node => input = node } id="docsearch-input" className={styles.input} />
      </div>
    </form>
  );
}

export default SearchForm;
