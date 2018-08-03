

const Container = ({ children }) => (
  <div className='container'>
    {children}
  </div>
);

const Title = ({ children, inline }) => (
  <h2 className={'titile ' + (inline ? 'titileInline' : '')}>
    {children}
  </h2>
);


const Badge = ({ children }) => (
  <span className={'badge'} >
    {children}
  </span>
);




const SectionTabs = ({ children }) => (
  <div className={'sectionTabContainer'}>
    {children}
  </div>
);

const Papper = ({ children }) => (
  <div className={'papper'}>
    {children}
  </div>
)


const SectionTitle = ({ children }) => (
  <h3 className={'sectionTitle'}>
    {children}
  </h3>
)

const Section = ({ children, title }) => (
  <div>
    {title && <SectionTitle>{title}</SectionTitle>}
    <div className={'section'}>    
      {children}
    </div>
  </div>
)


const SectionContent = ({ children, title, grow = 1}) => (
  <div className={'sectionContent'} style={{ flexGrow: grow }}>
    {title && <SectionTitle>{title}</SectionTitle>}
    <Papper>
    {children}
    </Papper>
  </div>
)




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


const Content = ({ children }) => (
  <div className='content'>
    {children}
  </div>
);

const VerticalLabel = ({ children }) => (
  <div className='verticalLabel'>
    {children}
  </div>
);



const Details = ({ children, noShadow = false }) => (
  <div className={'detailsContainer'}>
    <table className={'details'}>
      <tbody>
        {children}
      </tbody>
    </table>
  </div>
);

const DetailsRow = ({ children }) => (
  <tr>
    {children}
  </tr>
);


const Label = ({ children }) => (
  <td className={'label'}>
    {children}:
  </td>
)

const Value = ({ children }) => (
  <td className={'value'}>
    {children}
  </td>
);
