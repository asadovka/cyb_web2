import React from 'react';


const styles = require("./grid.less");


export const SectionTitle = ({ children }) => (
  <h3 className={styles.sectionTitle}>
    {children}
  </h3>
)

export const Section = ({ children }) => (
  <div className={styles.section}>
    {children}
  </div>
)

export const SectionContent = ({ children }) => (
  <div className={styles.sectionContent}>
    {children}
  </div>
)


export const Papper = ({ children }) => (
  <div className={styles.papper}>
    {children}
  </div>
)


