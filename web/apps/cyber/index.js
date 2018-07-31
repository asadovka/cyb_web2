
function getQueryStringValue (key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}  

// var query = getQueryStringValue("q");


var getIndex = function() {
  return axios
      .get(`http://cyberd.network/state`)
      .then(response => response.data)
}

var _search = function(q) {
  return axios.post(`http://cyberd.network/txs`, { "type": "search", "keyword": q })
  .then(() => getIndex())
  .then(data => {
        return Object.keys(data[q].links);        
      })
}

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

const NotFound = ({ q }) => (
  <div>
    <div className='not-found-content'>
      <h2>Seems that you are first one who are searching for <span>"{q}"</span></h2>
      <h4>Search tips:</h4>
      <ul className='tips'>
        <li>Doble check your spelling</li>
        <li>Try less specific words</li>
        <li>Use apps for narrowing your results</li>
      </ul>
      <div className='apps_container'>
        <a className='app' href='/apps/tokens/'>Tokens</a>
        <a className='app' href='/apps/chainger/'>Chaingear</a>
        <a className='app' href={`/apps/exp/?q=${q}`}>ETH Explorer</a>
        <a className='app' href={`/apps/exp/?q=${q}`}>BTC Explorer</a>
      </div>
      <p>or <a href='/'>report a bug</a></p>
    </div>
    <img src='img/buterin.svg' />
  </div>
);

const SearchResults = ({ items }) => (
  <div>
    <h2 className='search-item--title'>Search result:</h2>
    <div>
    {items.map(item => (
      <div onClick={() => this.nav(item)} className='search-item'>
        <a href={'/ipns/?q=' + item}>
        {item}
        </a>
      </div>
    ))}
    </div>
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], loading: true, q: '' };
  }
  componentDidMount() {
    this.setState({ loading: true })
    const q = getQueryStringValue('q');
    _search(q)
      .then(items => this.setState({ items, loading: false, q }));
  }

  nav = (url) => {
    // window.top.navigateBrowser(url);
    // alert(url)
  }

//`http://ipfs.cyb.ai/ipns/QmNSj3MXbP65VW8onJXULpZWXTGEypAW4AcAFrqzvYpA84/`

  render() {
    const { items, loading, q } = this.state;
    if (loading) {
      return (
        <Loading />
      );
    }

    return (
      <div className='container'>
        {(items.length === 0) ? (
            <NotFound q={q}/>
          ) : (
            <SearchResults items={items} />
        )}
      </div>
    );
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);
