
function getQueryStringValue (key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}  

var getBlock = function(q) {
  return axios.get(`http://api.cybersearch.io/ethereum/contract/${q}`)
  .then(response => response.data)
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contract: null };
  }
  
  componentDidMount() {
    getBlock(getQueryStringValue('q'))
      .then(response => {
        this.setState({  contract: response })
      });
  }

  render() {
    const { contract } = this.state;

    return (
      <div>
        <h1>eth contract</h1>
        {contract && <div>{JSON.stringify(contract)}</div>}
      </div>
    );
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);
