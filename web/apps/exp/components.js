

const Loading = (props) => (
  <div>
<div className="loader-wrapper">
  <div className="loader">
    <div className="roller"></div>
    <div className="roller"></div>
  </div>
  <div className="loader loader-2">
    <div className="roller"></div>
    <div className="roller"></div>
  </div>
  <div className="loader loader-3">
    <div className="roller"></div>
    <div className="roller"></div>
  </div>
</div>
</div>
);

const RoundCheckbox = ({ label, color = '#438cef', onChange, checked }) => (
  <label className='roundCheckbox' >
    {label}
    <input type='checkbox' onChange={() => onChange(!checked)} checked={checked} />
    <span 
      className='checkmark' 
      style={{
        border: `1px solid ${color}`,
        background: checked ? color : 'none'
      }}
    />
  </label>
)


const colors = {
  'block': '#757bf8',
  'transaction': '#70cadb',
  'uncle': '#ff9b53',
  'contract': '#aac3e5',

  'ethereum': '#03cba0',
  'ethereum_classic': '#543bcc',
  'bitcoin': '#438cef'
}




const dateFormat = (value) => (new Date(value)).toLocaleString("en-US");
// moment(value).format('DD/MM/YYYY (hh:mm)');

const Value = ({ children }) => (
  <span className={'value'}>
    {children}
  </span>
);

// const Date = ({ value, format, label }) => (
//   <span className={'date'}>{moment(value).format(format)}</span>
// )

const Hash = ({ value }) => {
  //TODO: fix when change backend
  const _value = value.substr(2, value.length );

  let inx = 2;
  const items = [];
  while(inx <= _value.length - 4) {
    items.push(_value.substr(inx, 6));
    inx += 6;
  }

  return (
    <span className={'hash'}>
      {_value.substr(0, 2)}
      {items.map((code, i) => (
        <span
          key={i}
          className={'hashPart'}
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

const LinkHash = ({ value, to, marginLeft, noCopy }) => {
  const copyFunc = (e) => {
    copyTextToClipboard(value);
    e.preventDefault();
    e.target.blur();
  }
  // if (to) {
  //   return (
  //     <Link to={to} className={
  //       cx(styles.linHash, { 
  //         [styles.linHashMarginLeft] : marginLeft,
  //         [styles.noCopy] : noCopy
  //       })}>
  //       <Hash value={value} />
  //       <button 
  //         className={styles.copyButton} 
  //         title='click to copy'
  //         onClick={copyFunc}
  //       >copy</button>
  //     </Link>
  //   );    
  // } else {
      return (
        <a href={to} className='linHash'>
          <Hash value={value} />
          <button 
            className={'copyButton'} 
            title='click to copy'
            onClick={copyFunc}
          >copy</button>
        </a>
      );

  // }

}







const Item = ({ children, line='#d9d9d9' }) => (
  <div className={'item'} style={{ border: `1px solid ${line}`}}>
    {children}
  </div>
);

const ItemTitle = ({ children, bg = '#000' }) => (
  <h3 className={'itemTitle'} style={{ backgroundColor: `${bg}`}}>
    {children}
  </h3>
);




const ItemContainer = ({ children }) => (
  <div className={'itemContainer'}>
    {children}
  </div>
);

// style={{ borderRight: '1px solid #dedede'}}
const ItemContainerRow = ({ children, width, border= 'none', center = false }) => (
  <div className={'itemContainerRow'} style={{ 
    width: width,
    borderRight: border === 'right' ? '1px solid #dedede': null,
    borderLeft: border === 'left' ? '1px solid #dedede': null,
    borderTop: border === 'top' ? '1px solid #dedede': null,
    textAlign: center ? 'center' : null
  }}>
    {children}
  </div>
);

const Label = ({ children }) => (
  <span className={'label'}>
    {children}
  </span>
);

const EthereumBlock = ({ number, hash, tx_number, timestamp }) => {
 return (
    <Item line={colors.block}>
      <ItemTitle bg={colors.ethereum}>Ethereum block #{number}</ItemTitle>
      <ItemContainer>
        <ItemContainerRow center width='33%' border='right'>
          <Label>Mined on:</Label>
          <Value>{dateFormat(timestamp)}</Value>
        </ItemContainerRow>
        <ItemContainerRow width='33%' border='right'>
          <Label>Hash:</Label>
          <LinkHash value={hash} to={`/apps/eb?q=${number}`} />
        </ItemContainerRow>
        <ItemContainerRow center width='33%'>
          <Label>Transaction:</Label>
          <Value>{tx_number}</Value>
        </ItemContainerRow>
      </ItemContainer>
    </Item>
 );
}

const BitcoinBlock = ({ number, hash, tx_number, timestamp }) => {
 return (
    <Item line={colors.block}>
      <ItemTitle bg={colors.bitcoin}>Bitcoin block #{number}</ItemTitle>
      <ItemContainer>
        <ItemContainerRow center width='33%' border='right'>
          <Label>Mined on:</Label>
          <Value>{dateFormat(timestamp)}</Value>
        </ItemContainerRow>
        <ItemContainerRow width='33%' border='right'>
          <Label>Hash:</Label>
          <LinkHash value={hash} to={`/apps/bb?q=${number}`} />
        </ItemContainerRow>
        <ItemContainerRow center width='33%'>
          <Label>Transaction:</Label>
          <Value>{tx_number}</Value>
        </ItemContainerRow>
      </ItemContainer>
    </Item>
 );
}


const EthereumTx = ({ hash, value, block_time, from, to }) => {
  return (
   <Item line={colors.transaction}>
     <ItemTitle bg={colors.ethereum}>Ethereum transaction</ItemTitle>
     <ItemContainer>
       <ItemContainerRow center width='33%' border='right'>
          <Label>Finalization Time:</Label>
          <Value>{dateFormat(block_time)}</Value>
       </ItemContainerRow>
       <ItemContainerRow width='33%'>
          <Label>Hash:</Label>
          <LinkHash value={hash} to={`/apps/et?q=${hash}`} />         
       </ItemContainerRow>
       <ItemContainerRow center width='33%' border='left'>
          <Label>Value:</Label>
          <Value>{value} ETH</Value>       
       </ItemContainerRow>
       {/*<ItemContainerRow width='50%' border='top'>
         <Label>From:</Label>
         <LinkAddress address={from} to={`/ethereum/contract/${from}`}/>
       </ItemContainerRow>
       <ItemContainerRow width='50%' border='top'>
         <Label>To:</Label>
         <LinkAddress address={to} to={`/ethereum/contract/${to}`}/>
       </ItemContainerRow>*/}
     </ItemContainer>
   </Item>   
  );
}


const BitcoinTx = ({ hash, total_output, block_time, from, to }) => {
  return (
   <Item line={colors.transaction}>
     <ItemTitle bg={colors.bitcoin}>Ethereum transaction</ItemTitle>
     <ItemContainer>
       <ItemContainerRow center width='33%' border='right'>
          <Label>Finalization Time:</Label>
          <Value>{dateFormat(block_time)}</Value>
       </ItemContainerRow>
       <ItemContainerRow width='33%'>
          <Label>Hash:</Label>
          <LinkHash value={hash} to={`/apps/bt?q=${hash}`} />         
       </ItemContainerRow>
       <ItemContainerRow center width='33%' border='left'>
          <Label>Value:</Label>
          <Value>{total_output} BTC</Value>       
       </ItemContainerRow>
     </ItemContainer>
   </Item>   
  );
}

const BitcoinContract = ({ hash, confirmed_balance, first_activity_date, from, to }) => {
  return (
   <Item line={colors.contract}>
     <ItemTitle bg={colors.bitcoin}>Bitcoint contract</ItemTitle>
     <ItemContainer>
       <ItemContainerRow center width='33%' border='right'>
          <Label>Created:</Label>
          <Value>{dateFormat(first_activity_date)}</Value>
       </ItemContainerRow>
       <ItemContainerRow width='33%'>
          <Label>Hash:</Label>
          <LinkHash value={hash} to={`/apps/bc?q=${hash}`} />         
       </ItemContainerRow>
       <ItemContainerRow center width='33%' border='left'>
          <Label>Value:</Label>
          <Value>{confirmed_balance} BTC</Value>       
       </ItemContainerRow>
     </ItemContainer>
   </Item>   
  );
}


const EthereumContract = ({ hash, confirmed_balance, first_activity_date, from, to }) => {
  return (
   <Item line={colors.contract}>
     <ItemTitle bg={colors.ethereum}>Ethereum contract</ItemTitle>
     <ItemContainer>
       <ItemContainerRow center width='33%' border='right'>
          <Label>Finalization Time:</Label>
          <Value>{dateFormat(first_activity_date)}</Value>
       </ItemContainerRow>
       <ItemContainerRow width='33%'>
          <Label>Hash:</Label>
          <LinkHash value={hash} to={`/apps/ec?q=${hash}`} />         
       </ItemContainerRow>
       <ItemContainerRow center width='33%' border='left'>
          <Label>Value:</Label>
          <Value>{confirmed_balance} ETH</Value>       
       </ItemContainerRow>
     </ItemContainer>
   </Item>   
  );
}


const EthereumUncle = ({ hash, timestamp, position, from, to }) => {
  return (
   <Item line={colors.contract}>
     <ItemTitle bg={colors.ethereum}>Ethereum uncle block</ItemTitle>
     <ItemContainer>
       <ItemContainerRow center width='33%' border='right'>
          <Label>Mined on:</Label>
          <Value>{dateFormat(timestamp)}</Value>
       </ItemContainerRow>
       <ItemContainerRow width='33%'>
          <Label>Hash:</Label>
          <LinkHash value={hash} to={`/apps/eu?q=${hash}`} />         
       </ItemContainerRow>
       <ItemContainerRow center width='33%' border='left'>
          <Label>Uncle position:</Label>
          <Value>{position}</Value>       
       </ItemContainerRow>
     </ItemContainer>
   </Item>   
  );
}


