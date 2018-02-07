import * as React from "react";
import { Link } from 'react-router';

import moment from 'moment'

const styles = require("./SearchItems.less");

export const Title = ({ color, system, number }) => (
  <h3 
    className={styles.title} 
    style={{ backgroundColor: color }}
  >
    <span className={styles.titleFirst} >{system}</span>
    <span>#{number}</span>
  </h3>
);


export const Date = ({ value, format, label }) => (
  <span className={styles.date}>{label + ' ' + moment(value).format(format)}</span>
)

export const Hash = ({ value }) => {
  let inx = 2;
  const items = [];
  while(inx <= value.length - 4) {
    items.push(value.substr(inx, 6));
    inx += 6;
  }

  return (
    <span className={styles.hash}>
      Hash:&nbsp;
      {value.substr(0, 2)}
      {items.map((code, i) => (
        <span
          key={i}
          className={styles.hashPart}
          style={{ background: '#' + code, color: '#' + code }}
        >{code}</span>)
      )}
      {value.substr(value.length - 2)}
    </span>
  );
}

export const DetailsLink = (props) => (
  <Link {...props} className={styles.link} />
);

export const Height = ({ children }) => (
  <span className={styles.height}>{children}</span>
)

export const Total = ({ children }) => (
  <span className={styles.total}>{children}</span>
);

export const Row = ({ children }) => (
  <div className={styles.row}>
    {children}
  </div>
);


export const Container = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
);

export const Item = ({ children, color }) => (
  <div className={styles.item} style={{ borderLeft: `4px solid ${color}`}}>
    {children}
  </div>
);



export function Plain(data) {
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}


// export function BitcoinCashTx(props) {
//   return (
//   <div>
//     <Row>
//       <Title>Bitcoin Cash</Title>
//       <Number>#{props.block_number}</Number>
//       <Date value={props.block_time} format='YYYY-MM-DD hh:mm' />
//     </Row>
//     <Row>
//       <Hash value={props.block_hash} />
//       <Height>Fee:&nbsp;{props.fee}</Height>
//     </Row>
//     <Row>
//       <Total>Total outputs value:&nbsp;{props.total_output}</Total>
//     </Row>
//     <Row>
//       <DetailsLink to={`/bitcoin_cash/tx/${props.hash}`}>
//         {`seacrh.cyber.fund/bitcoin_cash/tx/${props.hash}`}
//       </DetailsLink>
//     </Row>
//   </div>
//   );
// }

export function BitcoinAddress(data) {
  return (
    <div>
      <ul>
        <li>{`Balance: ${data.balance}` + " BTC"}</li>
        <li>{`Address: ${data.id}`}</li>
        <li>{`No. Transactions: ${data.tx_number}`}</li>
        <li>{`Total Received: ${data.total_received}` + " BTC"}</li>
      </ul>
    </div>
  );
}






export function EthereumClassicTx(data) {
  return (
    <div>
      <ul>
        <li>{`Hash: ${data.hash}`}</li>
        <li>{`Block hash: ${data.block_hash}`}</li>
        <li>{`Block number: ${data.block_number}`}</li>
        <li>{`Block time: ${data.timestamp}`}</li>
        <li>{`Value: ${data.value} ETH`}</li>
        <li>{`Fee: ${data.fee} ETH`}</li>
      </ul>

      <Link to={`/ethereum/tx/${data.hash}`}>
        View transaction
      </Link>
    </div>
  );
}

