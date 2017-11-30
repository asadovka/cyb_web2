import * as React from "react";

import { Link } from 'react-router';

const styles = require("./Cards.less");

export const CardList = ({ children }) => (
  <div className={styles.cardList}>
    {children}
  </div>
);

export const Card = ({ logo, name, descriptions, tokens_sold, system }) => (
  <div className={styles.card}>
    <Link to={`/crowdsales/${system}`}>
        <div className={styles.imageContainer}>
          <img width={150} src={logo}/>
        </div>
        <h3>{name}</h3>
        <p>
          {descriptions}
        </p>
        <div className={styles.dateAndTokens}>
          <div>
            21 days left
          </div>
          <div>
            {tokens_sold}
          </div>
        </div>
    </Link>
  </div>
)
