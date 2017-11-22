
import * as React from "react";
import {Field} from "redux-form";

const styles = require("./SearchForm.less");

export const SearchField = (props) => (
  <Field
   {...props}
   className={styles.searchField}
  />
)

export const Button = (props) => (
  <button
    {...props}
    className={styles.button}
  />
);

export const Container = (props) => (
  <div
    {...props}
    className={styles.container}
  />
);
