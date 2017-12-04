import * as React from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import * as moment from 'moment'

import { Link } from 'react-router';

const styles = require("./AssetTable.less");

export const Table = ({ children }) => (
  <table className={styles.table}>
    {children}
  </table>
);

export const Logo = ({ children, to }) => (
  <Link to={to}>
    <div className={styles.logo}>
      {children}
    </div>
  </Link>
)

export const PriceInfo = ({ children }) => (
  <div className={styles.priceInfo}>
    {children}
  </div>
)


export const NoInfo = () => (
  <div className={styles.noInfo}>
    no info
  </div>
)


export const PriceChart = ({ price_history = [], tiker_interval }) => {

  let date = moment();
  const data = price_history.map(item => {
    date = date.add(tiker_interval, 'ms');
    return {name: date.format('DD.MM.YYYY'), price: item };
  });

  return (
    <LineChart width={100} height={50} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
     <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false}/>
     </LineChart>
  );
} 
