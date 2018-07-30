
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }
  componentDidMount() {
    _search(getQueryStringValue('q'))
      .then(items => this.setState({ items }));
  }

  nav = (url) => {
    // window.top.navigateBrowser(url);
    // alert(url)
  }

//`http://ipfs.cyb.ai/ipns/QmNSj3MXbP65VW8onJXULpZWXTGEypAW4AcAFrqzvYpA84/`

  render() {
    const { items } = this.state;
    return (
      <div>
      <div>
        {items.map(item => (
          <div onClick={() => this.nav(item)}>
            <a href={'/ipns/?q=' + item}>
            {item}
            </a>
          </div>
        ))}
      </div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);
