import React from 'react';


const styles = require("./grid.less");


export const SectionTitle = ({ children }) => (
  <h3 className={styles.sectionTitle}>
    {children}
  </h3>
)

export const Section = ({ children, title }) => (
  <div>
    {title && <SectionTitle>{title}</SectionTitle>}
    <div className={styles.section}>    
      {children}
    </div>
  </div>
)

export const SectionTabs = ({ children }) => (
  <div className={styles.sectionTabContainer}>
    {children}
  </div>
);

export const Papper = ({ children }) => (
  <div className={styles.papper}>
    {children}
  </div>
)

export const SectionContent = ({ children, title, grow = 1}) => (
  <div className={styles.sectionContent} style={{ flexGrow: grow }}>
    {title && <SectionTitle>{title}</SectionTitle>}
    <Papper>
    {children}
    </Papper>
  </div>
)





