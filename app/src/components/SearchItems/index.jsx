import * as React from "react";
import { Link } from 'react-router';

import moment from 'moment'

const styles = require("./SearchItems.less");

import cx from 'classnames';

export const Title = ({ color, system, number }) => (
  <h3 
    className={styles.title} 
    style={{ backgroundColor: color }}
  >
    <span className={styles.titleFirst} >{system}</span>
    <span>#{number}</span>
  </h3>
);


export const dateFormat = (value) => moment(value).format('DD/MM/YYYY (hh:mm)');

export const Value = ({ children }) => (
  <span className={styles.value}>
    {children}
  </span>
);

export const Date = ({ value, format, label }) => (
  <span className={styles.date}>{moment(value).format(format)}</span>
)

export const Hash = ({ value }) => {
  //TODO: fix when change backend
  const _value = value.substr(2, value.length );

  let inx = 2;
  const items = [];
  while(inx <= _value.length - 4) {
    items.push(_value.substr(inx, 6));
    inx += 6;
  }

  return (
    <span className={styles.hash}>
      {_value.substr(0, 2)}
      {items.map((code, i) => (
        <span
          key={i}
          className={styles.hashPart}
          style={{ background: '#' + code, color: '#' + code }}
        >{code}</span>)
      )}
      {_value.substr(_value.length - 2)}
    </span>
  );
}

//https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}

export const LinkHash = ({ value, to, marginLeft, noCopy }) => {
  const copyFunc = (e) => {
    copyTextToClipboard(value);
    e.preventDefault();
    e.target.blur();
  }
  if (to) {
    return (
      <Link to={to} className={
        cx(styles.linHash, { 
          [styles.linHashMarginLeft] : marginLeft,
          [styles.noCopy] : noCopy
        })}>
        <Hash value={value} />
        <button 
          className={styles.copyButton} 
          title='click to copy'
          onClick={copyFunc}
        >copy</button>
      </Link>
    );    
  } else {
      return (
        <span className={
          cx(styles.linHash, { 
            [styles.linHashMarginLeft] : marginLeft,
            [styles.noCopy] : noCopy,
            [styles.hashText]: true
          })}>
          <Hash value={value} />
          <button 
            className={styles.copyButton} 
            title='click to copy'
            onClick={copyFunc}
          >copy</button>
        </span>
      );

  }

}

export const LinkAddress = ({ address, to }) => (
  <Link to={to} className={styles.linkAddress}>
    {address}
  </Link>
)

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

// export const Item = ({ children, color }) => (
//   <div className={styles.item} style={{ borderLeft: `4px solid ${color}`}}>
//     {children}
//   </div>
// );

export const Item = ({ children, line='#d9d9d9' }) => (
  <div className={styles.item} style={{ border: `1px solid ${line}`}}>
    {children}
  </div>
);

export const ItemTitle = ({ children, bg = '#000' }) => (
  <h3 className={styles.itemTitle} style={{ backgroundColor: `${bg}`}}>
    {children}
  </h3>
);

export const colors = {
  'block': '#757bf8',
  'transaction': '#70cadb',
  'uncle': '#ff9b53',
  'contract': '#aac3e5',

  'ethereum': '#03cba0',
  'ethereum_classic': '#543bcc'
}


export const ItemContainer = ({ children }) => (
  <div className={styles.itemContainer}>
    {children}
  </div>
);

// style={{ borderRight: '1px solid #dedede'}}
export const ItemContainerRow = ({ children, width, border= 'none', center = false }) => (
  <div className={styles.itemContainerRow} style={{ 
    width: width,
    borderRight: border === 'right' ? '1px solid #dedede': null,
    borderLeft: border === 'left' ? '1px solid #dedede': null,
    borderTop: border === 'top' ? '1px solid #dedede': null,
    textAlign: center ? 'center' : null
  }}>
    {children}
  </div>
);

export const Label = ({ children }) => (
  <span className={styles.label}>
    {children}
  </span>
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

