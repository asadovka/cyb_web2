import * as React from "react";
import { Link } from 'react-router';

import * as moment from 'moment'

const styles = require("./SearchItems.less");

const Title = ({ children }) => (
  <h3 className={styles.title}>{children}</h3>
);

const Number = ({ children }) => (
  <span className={styles.number}>{children}</span>
)

const Date = ({ value, format }) => (
  <span className={styles.date}>{moment(value).format(format)}</span>
)

const Hash = ({ value }) => {
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

const DetailsLink = (props) => (
  <Link {...props} className={styles.link} />
);

const Height = ({ children }) => (
  <span className={styles.height}>{children}</span>
)

const Total = ({ children }) => (
  <span className={styles.total}>{children}</span>
);

const Row = ({ children }) => (
  <div className={styles.row}>
    {children}
  </div>
);

export const BitcoinBlock = (props) => (
  <div>
    <Row>
      <Title>Bitcoin</Title>
      <Number>#{props.tx_number}</Number>
      <Date value={props.time} format='YYYY-MM-DD hh:mm' />
    </Row>
    <Row>
      <Hash value={props.hash} />
      <Height>Height:&nbsp;{props.height}</Height>
    </Row>
    <Row>
      <Total>Total outputs value:&nbsp;{props.total_outputs_value}</Total>
    </Row>
    <Row>
      <DetailsLink to={`/bitcoin/block/${props.height}`}>
        {`seacrh.cyber.fund/bitcoin/block/${props.height}`}
      </DetailsLink>
    </Row>
  </div>
)


export function Plain(data) {
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}

export function BitcoinTx(props) {
  return (
  <div>
    <Row>
      <Title>Transaction</Title>
      <Number>#{props.block_number}</Number>
      <Date value={props.block_time} format='YYYY-MM-DD hh:mm' />
    </Row>
    <Row>
      <Hash value={props.block_hash} />
      <Height>Fee:&nbsp;{props.fee}</Height>
    </Row>
    <Row>
      <Total>Total outputs value:&nbsp;{props.total_output}</Total>
    </Row>
    <Row>
      <DetailsLink to={`/bitcoin/tx/${props.txid}`}>
        {`seacrh.cyber.fund/bitcoin/tx/${props.txid}`}
      </DetailsLink>
    </Row>
  </div>
  );
}

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

export function EthereumBlock(data) {
 return (
  <div>
    <Row>
      <Title>Ethereum</Title>
      <Number>#{data.tx_number}</Number>
      <Date value={data.timestamp} format='YYYY-MM-DD hh:mm' />
    </Row>
    <Row>
      <Hash value={data.hash} />
      <Height>Size:&nbsp;{data.size}</Height>
    </Row>
    <Row>
      <DetailsLink to={`/ethereum/block/${data.number}`}>
        {`seacrh.cyber.fund/ethereum/block/${data.number}`}
      </DetailsLink>
    </Row>
  </div>
 );
}

export function EthereumTx(data) {
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

