
import * as React from "react";

const styles = require("./SectionTitle.less");


export const SectionTitle = ({ children }) => (
  <h3 className={styles.sectionTitle}>
    {children}
  </h3>
)


export const SectionsContainer = ({ children }) => (
  <div className={styles.sectionsContainer}>
    {children}
  </div>
)
