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
    <div className='card'>
      <div className="card-image">
        <figure className="image is-4by3">
          <img width={150} src={logo} alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
         <div className="content">
           <p className="title is-4">{name}</p>
           <p className="subtitle is-6">{descriptions}</p>           
         </div>
      </div>
      <footer className="card-footer">
        <p className="card-footer-item">
          <span>21 days left</span>
        </p>
        <p className="card-footer-item">
          <span>{tokens_sold}</span>
        </p>
      </footer>
    </div>
    </Link>
  </div>
)
