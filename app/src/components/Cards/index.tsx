import * as React from "react";

const styles = require("./Cards.less");

export const CardList = ({ children }) => (
  <div className={styles.cardList}>
    {children}
  </div>
);

export const Card = ({ logo, name, descriptions }) => (
  <div className={styles.card}>
    <div className={styles.imageContainer}>
      <img width={150} src={logo}/>
    </div>
    <h3>{name}</h3>
    <p>
      {descriptions}
    </p>
  </div>
)
