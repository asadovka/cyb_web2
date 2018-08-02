
function getQueryStringValue (key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}  

var _search = function(q) {
  return axios.get(`http://api.cybersearch.io/search?query=${q}`)
  .then(response => response.data)
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], loading: true };
  }
  componentDidMount() {
    _search(getQueryStringValue('q'))
      .then(response => {
        this.setState({ items: response.items, loading: false })
      });
  }
  generateLink(item) {
    if (item.chain === 'ethereum' && item.entity === 'block') {
      return (
        <a href={`/eb/?q=${item.data.number}`} target="iframe">{item.data.number}</a>
      );
    }

    if (item.chain === 'bitcoin' && item.entity === 'block') {
      return (
        <a href={`/bb/?q=${item.data.number}`} target="iframe">{item.data.number}</a>
      );
    }    
    return null
  }

  selectAllChain = (e) => {}

  isAllChainSelected() {
    return true;
  }

  selectAllTypes = (e) => {}

  isAllTypesSelected() {
    return true;
  }

  changeChain = () => {}
  changeTypes = () => {}

  render() {

    const chains = 'ethereum,bitcoin';
    const types = 'contract_summary,block,uncle,tx';

    const { items, loading } = this.state;
    if (loading) return (<Loading />);
    return (
      <div className='app'>
        <div className='app__menu'>
          <h2 className='menu-title'>Show results for:</h2>

          <RoundCheckbox 
            onChange={this.selectAllChain}
            checked={this.isAllChainSelected(chains)} 
            label='Blockchain'  
          />
          <ul className='list'>
          <li>
            <RoundCheckbox 
              onChange={() => this.changeChain('ethereum')} 
              checked={!!chains.split(',').find(x => x === 'ethereum')} 
              label='Ethereum' color={colors.ethereum} />
          </li>
          <li>
            <RoundCheckbox 
              onChange={() => this.changeChain('bitcoin')} 
              checked={!!chains.split(',').find(x => x === 'bitcoin')} 
              label='Bitcoin' 
              color={colors.bitcoin} />
          </li>
        </ul>

          <RoundCheckbox 
          onChange={this.selectAllTypes}
          checked={this.isAllTypesSelected(types)} 
          label='Object'  
        />        
        <ul className='list'>
          <li>
            <RoundCheckbox  
              onChange={() => this.changeTypes('contract_summary')} 
              checked={!!types.split(',').find(x => x === 'contract_summary')}  
              label='Contract' color={colors.contract} />
          </li>
          <li>
            <RoundCheckbox  
              onChange={() => this.changeTypes('block')} 
              checked={!!types.split(',').find(x => x === 'block')} 
              label='Block' color={colors.block} />
          </li>
          <li>
            <RoundCheckbox  
              onChange={() => this.changeTypes('uncle')} 
              checked={!!types.split(',').find(x => x === 'uncle')} 
              label='Uncle block' 
              color={colors.uncle} />
          </li>
          <li>
            <RoundCheckbox  
              onChange={() => this.changeTypes('tx')} 
              checked={!!types.split(',').find(x => x === 'tx')}
              label='Transaction' color={colors.transaction} />
          </li>
        </ul>

        </div>
        <div className='app__content'>
          <div className='result-container'>
        {items.map((item, index) => {
          const link = this.generateLink(item);

          if (item.chain === 'ethereum' && item.entity === 'block')
          return (
            <EthereumBlock
              {...item.data}
            />
          );

          if (item.chain === 'bitcoin' && item.entity === 'block')
          return (
            <BitcoinBlock
              {...item.data}
            />
          );

          if (item.chain === 'ethereum' && item.entity === 'tx')
          return (
            <EthereumTx
              {...item.data}
            />
          );

          if (item.chain === 'bitcoin' && item.entity === 'tx')
          return (
            <BitcoinTx
              {...item.data}
            />
          );

          if (item.chain === 'bitcoin' && item.entity === 'contract_summary')
          return (
            <BitcoinContract
              {...item.data}
            />
          );

          if (item.chain === 'ethereum' && item.entity === 'contract_summary')
          return (
            <EthereumContract
              {...item.data}
            />
          );
        
          if (item.chain === 'ethereum' && item.entity === 'uncle')
          return (
            <EthereumUncle
              {...item.data}
            />
          );
        
        //

          return null;
      })}
          </div>
        </div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);
